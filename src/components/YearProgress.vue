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
      <div class="heatmap-cell" v-for="day in daysOfYear" :key="day" :class="{ 'day-passed': day <= dayOfYear }"
        @mouseover="tooltipDay = day" @mouseleave="tooltipDay = null">
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
  calculateProgressOfYear() // 在组件挂载后执行这个函数
})

</script>  

<style scoped>
/* 年度进度条容器样式 */
.year-progress {
  margin: 20px;    /* 外边距 20px */
  padding: 20px;   /* 内边距 20px */
}

/* 进度条容器样式 */
.progress-container {
  width: 100%;                  /* 宽度占满父容器 */
  background-color: #f0f0f0;    /* 背景色：浅灰色 */
  border-radius: 10px;          /* 圆角 10px */
  margin: 0px 0;              /* 上下外边距 10px，左右 0 */
}

/* 进度条样式 */
.progress-bar {
  height: 30px;                /* 高度 30px */
  background-color: #42b983;   /* 背景色：绿色 */
  border-radius: 10px;         /* 圆角 10px */
  color: rgb(255, 254, 254);   /* 文字颜色：白色 */
  text-align: center;          /* 文字居中 */
  line-height: 30px;           /* 行高等于高度，使文字垂直居中 */
  transition: width 0.3s ease; /* 宽度变化时的过渡动画 */
}

/* 热力图容器样式 */
.year-heatmap {
  margin: 20px;
  padding: 20px;
}

/* 热力图网格容器样式 */
.heatmap-container {
  display: grid;                                    /* 使用网格布局 */
  grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));  /* 自动填充列，每列最小20px */
  gap: 4px;                                        /* 网格间距 4px */
  max-width: 800px;                                /* 最大宽度 800px */
  margin: 0 auto;                                  /* 水平居中 */
}

/* 热力图单元格样式 */
.heatmap-cell {
  aspect-ratio: 1;                    /* 保持正方形比例 */
  background-color: #eee;             /* 背景色：浅灰色 */
  border-radius: 2px;                 /* 圆角 2px */
  position: relative;                 /* 相对定位，用于tooltip定位 */
  cursor: pointer;                    /* 鼠标指针变为手型 */
  transition: background-color 0.3s ease;  /* 背景色变化时的过渡动画 */
}

/* 已过去日期的样式 */
.day-passed {
  background-color: #42b983;          /* 已过去的日期显示绿色 */
}

/* 提示框样式 */
.tooltip {
  position: absolute;                  /* 绝对定位 */
  top: -30px;                         /* 向上偏移 30px */
  left: 50%;                          /* 水平居中 */
  transform: translateX(-50%);         /* X轴偏移-50%实现真正的水平居中 */
  background-color: rgba(0, 0, 0, 0.8); /* 半透明黑色背景 */
  color: white;                        /* 文字颜色：白色 */
  padding: 4px 8px;                    /* 内边距：上下4px，左右8px */
  border-radius: 4px;                  /* 圆角 4px */
  font-size: 12px;                     /* 字体大小 12px */
  white-space: nowrap;                 /* 文字不换行 */
  z-index: 1000;                       /* 确保提示框在其他元素上方 */
}
</style> 
