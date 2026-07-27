<template>
  <div class="demo-page">
    <el-card header="CxHighlight 示例" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        关键词高亮组件，支持单/多关键词、自定义颜色和标签。
      </el-alert>

      <!-- 场景1：基础用法（单关键词） -->
      <h3>场景1：基础用法（单个关键词）</h3>
      <div class="cx-highlight-demo__section">
        <CxHighlight text="欢迎使用高亮组件，关键词高亮功能非常实用" :keys="['高亮']" />
      </div>

      <!-- 场景2：多关键词 -->
      <h3>场景2：多关键词高亮</h3>
      <div class="cx-highlight-demo__section">
        <CxHighlight text="欢迎使用高亮组件，关键词高亮功能非常实用" :keys="['高亮', '组件']" />
      </div>

      <!-- 场景3：自定义颜色 -->
      <h3>场景3：自定义颜色（#f56c6c）</h3>
      <div class="cx-highlight-demo__section">
        <CxHighlight text="这段文字中错误将会以红色标注出来" :keys="['错误', '红色']" color="#f56c6c" />
      </div>

      <!-- 场景4：自定义标签 -->
      <h3>场景4：自定义标签（tag="span"）</h3>
      <div class="cx-highlight-demo__section">
        <CxHighlight text="使用 span 标签包裹高亮关键词" :keys="['span']" tag="span" />
      </div>

      <!-- 场景5：keyword-click 事件 -->
      <h3>场景5：keyword-click 事件</h3>
      <div class="cx-highlight-demo__section">
        <el-alert type="warning" :closable="false" show-icon style="margin-bottom: 12px">
          点击高亮关键词，控制台会打印关键词信息
        </el-alert>
        <CxHighlight
          text="点击搜索关键词或组件查看事件回调"
          :keys="['搜索', '关键词', '组件']"
          @keyword-click="handleKeywordClick"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CxHighlight } from '@/components/CxHighlight'

defineOptions({
  name: 'CxHighlightDemo'
})

function handleKeywordClick(keyword: string) {
  console.log(`[CxHighlight] 关键词点击：${keyword}`)
}
</script>

<style scoped lang="scss">
.cx-highlight-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
