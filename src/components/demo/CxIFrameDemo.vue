<template>
  <div class="demo-page">
    <el-card header="CxIFrame 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-iframe-demo__section">
        <CxIFrame src="https://example.com" height="400px" />
      </div>

      <!-- 场景2：允许全屏 -->
      <h3>场景2：允许全屏</h3>
      <div class="cx-iframe-demo__section">
        <CxIFrame src="https://example.com" height="400px" allow-fullscreen />
      </div>

      <!-- 场景3：loading 插槽 -->
      <h3>场景3：loading 插槽</h3>
      <div class="cx-iframe-demo__section">
        <CxIFrame src="https://example.com" height="400px">
          <template #default>
            <span class="cx-iframe-demo__loading">加载中...</span>
          </template>
        </CxIFrame>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CxIFrame } from '@/components/CxIFrame'

defineOptions({
  name: 'CxIFrameDemo'
})
</script>

<style scoped lang="scss">
.cx-iframe-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}
</style>
