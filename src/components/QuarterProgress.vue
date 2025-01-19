<template>

    <div class="quarter-progress">
        <h2>季度进度</h2>
        <div class="progress-container">
            <div class="progress-bar" :style="{ width: progressPercentage_quarter + '%' }">
                {{ progressPercentage_quarter.toFixed(1) }}%
            </div>
        </div>
        <p>今天是第 {{ quarter }} 季度的第 {{ dayOfQuarter }} 天</p>
    </div>

    <div class="quarter-heatmap">
        <h2>季度热力图</h2>
        <div class="quarter-heatmap-container">
            <div class="quarter-heatmap-cell" v-for="day in daysOfQuarter" :key="day"
                :class="{ 'quarter-heatmap-cell-passed': day <= dayOfQuarter }" 
                @mouseover="tooltipDay = day"
                @mouseleave="tooltipDay = null">
                <div v-if="tooltipDay === day" class="quarter-heatmap-tooltip">第 {{ day }} 天</div>
            </div>
        </div>
    </div>

</template>


<script setup>
import { ref, onMounted } from 'vue'
// 定义响应式的 now
const now = ref(new Date())
const quarter = ref(0) // 定义响应式的 quarter，当前季度
const dayOfQuarter = ref(0) // 定义响应式的 dayOfQuarter，当前季度的第几天 
const daysOfQuarter = ref(0) // 定义响应式的 daysOfQuarter，当前季度的天数
const progressPercentage_quarter = ref(0) // 定义响应式的 progressPercentage_quarter，当前季度的进度
const tooltipDay = ref(null) // 定义响应式的 tooltipDay，当前鼠标悬浮的天数


// 计算季度进度
const calculateProgressOfQuarter = () => {
    function getQuarter() {
        const month = now.value.getMonth() + 1
        return Math.floor((month - 1) / 3) + 1
    }
    quarter.value = getQuarter()
    // 计算当前季度，并赋值给quarter，要注意的是，季度是从1开始，月份是从0开始
    // 因为我们定义了响应式的quarter，所以这里需要使用 .value 赋值

    function getQuarterLength() {
        const quarterStart = new Date(now.value.getFullYear(), (quarter.value - 1) * 3, 0)
        const quarterEnd = new Date(now.value.getFullYear(), quarter.value * 3, 0)
        const diff = quarterEnd - quarterStart
        const oneDay = 1000 * 60 * 60 * 24
        return Math.floor(diff / oneDay)
    }

    daysOfQuarter.value = getQuarterLength()

    const start = new Date(now.value.getFullYear(), (quarter.value - 1) * 3, 0)
    const diff = now.value - start
    const oneDay = 1000 * 60 * 60 * 24
    dayOfQuarter.value = Math.floor(diff / oneDay)
    progressPercentage_quarter.value = (dayOfQuarter.value / daysOfQuarter.value) * 100

}

onMounted(() => {
    calculateProgressOfQuarter()
})

</script>

<style scoped>
.quarter-progress {
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

.quarter-heatmap {
    margin: 20px;
    padding: 20px;
}

.quarter-heatmap-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
    gap: 4px;
    max-width: 800px;
    margin: 0 auto;
}

.quarter-heatmap-cell {
    aspect-ratio: 1;
    background-color: #eee;
    border-radius: 2px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.quarter-heatmap-cell-passed {
    background-color: #42b983;
}

.quarter-heatmap-tooltip {
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
