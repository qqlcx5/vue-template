<template>
  <div class="cx-highlight-example-basic">
    <h3>关键词高亮</h3>
    <el-input v-model="keyword" placeholder="输入要搜索的关键词" style="margin-bottom: 16px; width: 300px" />
    <div class="cx-highlight-example-basic__results">
      <div v-for="(item, idx) in results" :key="idx" class="cx-highlight-example-basic__item">
        <CxHighlight :text="item" :keywords="keyword" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxHighlight from '../CxHighlight.vue'

defineOptions({ name: 'CxHighlightExampleBasic' })

const keyword = ref('Vue')

const results = [
  'Vue 是一款渐进式 JavaScript 框架',
  'Vue 3 带来了 Composition API',
  'TypeScript 和 Vue 配合使用体验很好',
]
</script>

<style scoped lang="scss">
.cx-highlight-example-basic {
  &__results {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__item {
    padding: 8px 12px;
    background: #f5f7fa;
    border-radius: 4px;
  }
}
</style>
