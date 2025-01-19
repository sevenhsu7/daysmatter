<template>
  <div class="year-progress">
    <h2>年度进度</h2>
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progressPercentage_year + '%' }">
        {{ progressPercentage_year.toFixed(1) }}%
      </div>
    </div>
    <p>今天是今年的第 {{ dayOfYear }} 天</p>
  </div>

  <div class="year-heatmap">
    <h2>年度热力图</h2>
    <div class="heatmap-container">
      <div 
        class="heatmap-cell" 
        v-for="day in daysOfYear" 
        :key="day"
        :class="{ 'day-passed': day <= dayOfYear }"
        @mouseover="tooltipDay = day"
        @mouseleave="tooltipDay = null"
      >
        <div v-if="tooltipDay === day" class="tooltip">第 {{ day }} 天</div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
// 定义响应式的 now
const now = ref(new Date())
const dayOfYear = ref(0) // 定义响应式的 dayOfYear，今年的第几天
const daysOfYear = ref(0) // 定义响应式的 daysOfYear，今年的天数
const dayOfMonth = ref(0) // 定义响应式的 dayOfMonth，当前月份的第几天  
const daysOfMonth = ref(0) // 定义响应式的 daysOfMonth，当前月份的天数
const dayOfWeek = ref(0) // 定义响应式的 dayOfWeek，当前星期的第几天
const daysOfWeek = ref(0) // 定义响应式的 daysOfWeek，当前星期的天数
const progressPercentage_year = ref(0) // 定义响应式的 progressPercentage_year，今年的进度
const progressPercentage_month = ref(0) // 定义响应式的 progressPercentage_month，当前月份的进度
const progressPercentage_week = ref(0) // 定义响应式的 progressPercentage_week，当前星期的进度
const tooltipDay = ref(null) // 定义响应式的 tooltipDay，当前鼠标悬浮的天数


// 计算年进度
const calculateProgressOfYear = () => {
  const start = new Date(now.value.getFullYear(), 0, 0)
  const diff = now.value - start
  const oneDay = 1000 * 60 * 60 * 24
  dayOfYear.value = Math.floor(diff / oneDay)
  daysOfYear.value = now.value.getFullYear() % 4 === 0 ? 366 : 365
  progressPercentage_year.value = (dayOfYear.value / daysOfYear.value) * 100
}



onMounted(() => {
  calculateProgressOfYear()
})

</script>  

<style scoped>
.year-progress {
  margin: 20px;
  padding: 20px;
}

.progress-container {
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 10px 0;
}

.progress-bar {
  height: 30px;
  background-color: #42b983;
  border-radius: 10px;
  color: rgb(255, 254, 254);
  text-align: center;
  line-height: 30px;
  transition: width 0.3s ease;
}

.year-heatmap {
  margin: 20px;
  padding: 20px;
}

.heatmap-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
  gap: 4px;
  max-width: 800px;
  margin: 0 auto;
}

.heatmap-cell {
  aspect-ratio: 1;
  background-color: #eee;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.day-passed {
  background-color: #42b983;
}

.tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
}
</style> 
