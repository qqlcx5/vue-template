<script setup lang="ts">
import { computed, defineAsyncComponent, ref, shallowRef, type Component } from 'vue'

// 通过 import.meta.glob 收集所有 Demo 组件（懒加载模式）
const demoModules = import.meta.glob('@/components/demo/Cx*Demo.vue')

interface DemoItem {
  /** 组件名，如 CxButton */
  name: string
  /** Demo 文件路径 */
  path: string
}

// 从文件路径解析组件名（CxButtonDemo.vue -> CxButton），并按字母序排列
const demoList: DemoItem[] = Object.keys(demoModules)
  .map((path) => {
    const fileName = path.split('/').pop() ?? ''
    return {
      name: fileName.replace(/Demo\.vue$/, ''),
      path,
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

const keyword = ref('')
const filteredList = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return demoList
  return demoList.filter((item) => item.name.toLowerCase().includes(kw))
})

const activeName = ref('')
const activeComponent = shallowRef<Component | null>(null)

const handleSelect = (item: DemoItem) => {
  activeName.value = item.name
  activeComponent.value = defineAsyncComponent(
    demoModules[item.path] as () => Promise<{ default: Component }>,
  )
}

// 默认选中第一个组件
if (demoList.length > 0) {
  handleSelect(demoList[0])
}
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <!-- 顶部标题 -->
    <header class="flex items-center gap-3 px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <span class="i-tabler-components text-2xl text-primary"></span>
      <h1 class="text-xl font-bold text-gray-900">Cx 组件库展示</h1>
      <el-tag type="info" size="small">共 {{ demoList.length }} 个组件</el-tag>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧组件列表导航 -->
      <aside class="w-56 flex flex-col bg-white border-r border-gray-200">
        <div class="p-3 border-b border-gray-100">
          <el-input
            v-model="keyword"
            placeholder="搜索组件"
            clearable
            size="small"
          >
            <template #prefix>
              <span class="i-tabler-search"></span>
            </template>
          </el-input>
        </div>
        <ul class="flex-1 overflow-y-auto py-2">
          <li
            v-for="item in filteredList"
            :key="item.name"
            class="px-4 py-2 text-sm cursor-pointer transition-colors hover:bg-gray-100"
            :class="
              activeName === item.name
                ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-500'
                : 'text-gray-700'
            "
            @click="handleSelect(item)"
          >
            {{ item.name }}
          </li>
          <li v-if="filteredList.length === 0" class="px-4 py-2 text-sm text-gray-400">
            无匹配组件
          </li>
        </ul>
      </aside>

      <!-- 右侧展示区 -->
      <main class="flex-1 overflow-y-auto p-6">
        <el-card v-if="activeComponent" :key="activeName">
          <template #header>
            <div class="flex items-center gap-2">
              <span class="i-tabler-box text-xl text-primary"></span>
              <span class="text-lg font-semibold">{{ activeName }}</span>
            </div>
          </template>
          <Suspense>
            <component :is="activeComponent" />
            <template #fallback>
              <div class="py-12 text-center text-gray-400">组件加载中...</div>
            </template>
          </Suspense>
        </el-card>
        <el-empty v-else description="请选择左侧组件查看示例" />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
