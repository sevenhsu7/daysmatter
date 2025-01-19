<template> 
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{ nowDate() }}</h1>
  <!-- 添加切换按钮 -->
  <div class="toggle-container">
    <button 
      :class="{ active: showYear }" 
      @click="showYear = true"
    >
      年度进度
    </button>
    <button 
      :class="{ active: !showYear }" 
      @click="showYear = false"
    >
      季度进度
    </button>
  </div>

  <!-- 使用条件渲染 -->
  <YearProgress v-if="showYear" />
  <QuarterProgress v-else />
  
</template>

<script setup>
import YearProgress from './components/YearProgress.vue'
import QuarterProgress from './components/QuarterProgress.vue'
import { ref } from 'vue'

const now = ref(new Date())
const showYear = ref(true)  // 控制显示哪个进度

const nowDate = ()=>{
    const year = now.value.getFullYear()
    const month = now.value.getMonth()+1
    const day = now.value.getDate()
    return `${year}年${month}月${day}日`
}
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
</style>
