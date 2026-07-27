<template>
  <div class="demo-page">
    <el-card header="CxConfigGlobal 示例" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxConfigGlobal 用于全局配置子组件的 size / zIndex / locale，影响范围内所有 Cx 组件。
      </el-alert>

      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-config-global-demo__section">
        <CxConfigGlobal
          :size="currentSize"
          @ready="handleReady"
        />
        <p class="cx-config-global-demo__value">
          ready 事件已触发（查看控制台），当前全局 size：{{ currentSize }}
        </p>
      </div>

      <!-- 场景2：切换 size 观察影响 -->
      <h3>场景2：切换全局 size</h3>
      <div class="cx-config-global-demo__section">
        <CxConfigGlobal :size="currentSize" />
        <el-radio-group v-model="currentSize" style="margin-bottom: 16px">
          <el-radio-button label="large" />
          <el-radio-button label="default" />
          <el-radio-button label="small" />
        </el-radio-group>
        <p class="cx-config-global-demo__tip">
          切换 size 后，下方演示组件会受全局配置影响：
        </p>
        <div style="display: flex; gap: 12px; margin-top: 8px">
          <CxButton type="primary">按钮 A</CxButton>
          <CxButton type="success">按钮 B</CxButton>
        </div>
      </div>

      <!-- 场景3：zIndex 设置 -->
      <h3>场景3：zIndex 设置</h3>
      <div class="cx-config-global-demo__section">
        <CxConfigGlobal :z-index="2000" />
        <p class="cx-config-global-demo__tip">
          当前全局 zIndex 已设为 2000，弹窗等浮层将使用该值作为基准 z-index。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxConfigGlobal } from '@/components/CxConfigGlobal'
import { CxButton } from '@/components/CxButton'

defineOptions({
  name: 'CxConfigGlobalDemo'
})

const currentSize = ref<'large' | 'default' | 'small'>('default')

function handleReady() {
  console.log('[CxConfigGlobal] ready — 全局配置已就绪')
}
</script>

<style scoped lang="scss">
.cx-config-global-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }

  &__value {
    margin: 12px 0 0;
    font-size: 14px;
    color: var(--el-color-primary);
  }

  &__tip {
    margin: 8px 0 0;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}
</style>
