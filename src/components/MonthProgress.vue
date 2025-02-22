<template>
  <div class="month-progress">
    <h2>月度进度</h2>
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progressPercentage_month + '%' }">
        {{ progressPercentage_month.toFixed(1) }}%
      </div>
    </div>
    <p>今天是 {{ currentMonth }}月的第 {{ dayOfMonth }} 天</p>
  </div>

  <div class="month-heatmap">
    <h2>月度热力图</h2>
    <div class="heatmap-container">
      <div class="heatmap-cell" 
           v-for="day in daysOfMonth" 
           :key="day" 
           :class="{ 'day-passed': day <= dayOfMonth }"
           @mouseover="tooltipDay = day" 
           @mouseleave="tooltipDay = null">
        <div v-if="tooltipDay === day" class="tooltip">第 {{ day }} 天</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const now = ref(new Date())
const dayOfMonth = ref(0)      // 当前月份的第几天
const daysOfMonth = ref(0)     // 当前月份的总天数
const progressPercentage_month = ref(0)  // 月度进度百分比
const tooltipDay = ref(null)   // 提示框显示的天数
const currentMonth = ref(0)    // 当前月份

// 计算月进度
const calculateProgressOfMonth = () => {
  currentMonth.value = now.value.getMonth() + 1  // getMonth() 返回 0-11，所以要加1
  dayOfMonth.value = now.value.getDate()
  daysOfMonth.value = new Date(
    now.value.getFullYear(),
    now.value.getMonth() + 1,
    0
  ).getDate()
  progressPercentage_month.value = (dayOfMonth.value / daysOfMonth.value) * 100
}

onMounted(() => {
  calculateProgressOfMonth()
})
</script>

<style scoped>
.month-progress {
  margin: 20px;
  padding: 20px;
}

.progress-container {
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 0px 0;
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

.month-heatmap {
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