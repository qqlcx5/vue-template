<script setup lang="ts">
import { ref } from 'vue'
import { cloneDeep } from 'lodash-es'

const count = ref(0)

const handleClick = () => {
  const data = { name: 'Vue 3', version: '3.5' }
  const cloned = cloneDeep(data)
  console.log('Cloned data:', cloned)
  count.value++
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          <span class="i-tabler-brand-vue text-primary inline-block mr-2"></span>
          Vue 3 集成示例
        </h1>
        <p class="text-gray-600 text-lg">
          UnoCSS + Element Plus + Iconify + Lodash-ES + Sass
        </p>
      </div>

      <!-- UnoCSS 示例 -->
      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center gap-2">
            <span class="i-tabler-palette text-xl text-primary"></span>
            <span class="text-lg font-semibold">UnoCSS 原子类</span>
          </div>
        </template>
        <div class="grid grid-cols-3 gap-4">
          <div class="p-4 bg-blue-500 text-white rounded-lg text-center">
            蓝色盒子
          </div>
          <div class="p-4 bg-green-500 text-white rounded-lg text-center">
            绿色盒子
          </div>
          <div class="p-4 bg-purple-500 text-white rounded-lg text-center">
            紫色盒子
          </div>
        </div>
      </el-card>

      <!-- Element Plus 示例 -->
      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center gap-2">
            <span class="i-tabler-component text-xl text-success"></span>
            <span class="text-lg font-semibold">Element Plus 组件</span>
          </div>
        </template>
        <div class="flex gap-4 flex-wrap">
          <el-button type="primary" @click="handleClick">
            <span class="i-tabler-plus mr-1"></span>
            点击次数: {{ count }}
          </el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </div>
      </el-card>

      <!-- 图标示例 -->
      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center gap-2">
            <span class="i-tabler-icons text-xl text-warning"></span>
            <span class="text-lg font-semibold">Tabler 图标</span>
          </div>
        </template>
        <div class="flex gap-6 text-3xl">
          <span class="i-tabler-home text-primary hover:scale-125 transition-transform cursor-pointer"></span>
          <span class="i-tabler-user text-success hover:scale-125 transition-transform cursor-pointer"></span>
          <span class="i-tabler-settings text-warning hover:scale-125 transition-transform cursor-pointer"></span>
          <span class="i-tabler-heart text-danger hover:scale-125 transition-transform cursor-pointer"></span>
          <span class="i-tabler-star text-info hover:scale-125 transition-transform cursor-pointer"></span>
        </div>
      </el-card>

      <!-- Lodash-ES 示例 -->
      <el-card>
        <template #header>
          <div class="flex items-center gap-2">
            <span class="i-tabler-code text-xl text-info"></span>
            <span class="text-lg font-semibold">Lodash-ES 工具库</span>
          </div>
        </template>
        <el-alert
          title="点击上方按钮测试 lodash-es cloneDeep"
          type="info"
          :closable="false"
          show-icon
        >
          <template #default>
            <p>打开浏览器控制台查看克隆的数据对象</p>
          </template>
        </el-alert>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Sass/SCSS 样式示例
.text-primary {
  color: #409eff;
}

.text-success {
  color: #67c23a;
}

.text-warning {
  color: #e6a23c;
}

.text-danger {
  color: #f56c6c;
}

.text-info {
  color: #909399;
}

// 使用 Sass 的嵌套和变量功能
$transition-duration: 0.3s;

.hover\:scale-125 {
  transition: transform $transition-duration ease;

  &:hover {
    transform: scale(1.25);
  }
}
</style>
