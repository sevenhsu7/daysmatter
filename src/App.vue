<template> 
  <img alt="Vue logo" src="./assets/logo.png" class="img">
  <h1>{{ nowDate() }}</h1>
  <!-- 添加切换按钮 -->
  <div class="toggle-container">
    <button 
      :class="{ active: currentView === 'year' }" 
      @click="currentView = 'year'"
    >
      年度进度
    </button>
    <button 
      :class="{ active: currentView === 'quarter' }" 
      @click="currentView = 'quarter'"
    >
      季度进度
    </button>
    <button 
      :class="{ active: currentView === 'month' }" 
      @click="currentView = 'month'"
    >
      月度进度
    </button>
  </div>

  <!-- 使用条件渲染 -->
  <YearProgress v-if="currentView === 'year'" />
  <QuarterProgress v-if="currentView === 'quarter'" />
  <MonthProgress v-if="currentView === 'month'" />
  
</template>

<script setup>
import YearProgress from './components/YearProgress.vue'
import QuarterProgress from './components/QuarterProgress.vue'
import { ref, onMounted } from 'vue'
import MonthProgress from './components/MonthProgress.vue'

const now = ref(new Date())
const currentView = ref('year')  // 默认显示年度进度

const nowDate = ()=>{
    const year = now.value.getFullYear()
    const month = now.value.getMonth()+1
    const day = now.value.getDate()
    return `${year}年${month}月${day}日`
}

const switchView = (view) => {
  currentView.value = view
}

// 添加 mounted 钩子
onMounted(() => {
  // 添加调试日志
  console.log('Mounting and setting viewport...')
  
  // 检查是否已存在 viewport meta
  const existingMeta = document.querySelector('meta[name="viewport"]')
  
  if (existingMeta) {
    // 如果存在，直接修改内容
    existingMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
  } else {
    // 如果不存在，创建新的
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    document.head.appendChild(meta)
  }
})

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.img {
  width: 15%;  /* 相对于父容器的宽度 */
  max-width: 100px;  /* 限制最大尺寸 */
  height: auto;
}
/* 添加切换按钮的样式 */
.toggle-container {
  margin: 20px 0;
}

button {
  padding: 8px 16px;
  margin: 0 8px;
  border: 1px solid #42b983;
  border-radius: 4px;
  background: white;
  color: #42b983;
  cursor: pointer;
  transition: all 0.3s ease;
}

button.active {
  background: #42b983;
  color: white;
}

button:hover {
  opacity: 0.8;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: all 0.3s ease;
}

button.active {
  background-color: #42b983;
  color: white;
}

button:hover {
  opacity: 0.8;
}
</style>
