<template>
  <div class="demo-page">
    <el-card header="CxError 示例" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        错误状态页面组件，支持 404 / 403 / 500 三种错误类型。
      </el-alert>

      <!-- 场景1：404 -->
      <h3>场景1：404 页面不存在</h3>
      <div class="cx-error-demo__section">
        <CxError type="404" @error-click="handleErrorClick" />
      </div>

      <!-- 场景2：403 -->
      <h3>场景2：403 无权限访问</h3>
      <div class="cx-error-demo__section">
        <CxError type="403" @error-click="handleErrorClick" />
      </div>

      <!-- 场景3：500 -->
      <h3>场景3：500 服务器错误</h3>
      <div class="cx-error-demo__section">
        <CxError type="500" @error-click="handleErrorClick" />
      </div>

      <!-- 场景4：点击事件 -->
      <h3>场景4：点击错误区域触发事件</h3>
      <div class="cx-error-demo__section">
        <el-alert type="warning" :closable="false" show-icon style="margin-bottom: 12px">
          点击下方 404 错误区域，控制台会打印日志
        </el-alert>
        <CxError type="404" @error-click="handleErrorClick" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CxError } from '@/components/CxError'

defineOptions({
  name: 'CxErrorDemo'
})

function handleErrorClick(type: string) {
  console.log(`[CxError] 点击错误类型：${type}`)
}
</script>

<style scoped lang="scss">
.cx-error-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
