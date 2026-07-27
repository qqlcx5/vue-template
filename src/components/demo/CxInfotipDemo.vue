<template>
  <div class="demo-page">
    <el-card header="CxInfotip 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-infotip-demo__section">
        这是一段文字 <CxInfotip content="这是提示信息" />
      </div>

      <!-- 场景2：自定义位置 -->
      <h3>场景2：自定义位置（底部弹出）</h3>
      <div class="cx-infotip-demo__section">
        这是一段文字 <CxInfotip content="底部弹出的提示" placement="bottom" />
      </div>

      <!-- 场景3：隐藏图标 -->
      <h3>场景3：隐藏图标，文字触发</h3>
      <div class="cx-infotip-demo__section">
        <CxInfotip :show-icon="false" content="点击文字查看提示">
          <template #default>
            <el-tag type="info">悬停/点击查看</el-tag>
          </template>
        </CxInfotip>
      </div>

      <!-- 场景4：自定义图标 -->
      <h3>场景4：自定义图标</h3>
      <div class="cx-infotip-demo__section">
        自定义图标 <CxInfotip content="自定义图标提示" icon="mdi:information" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CxInfotip } from '@/components/CxInfotip'

defineOptions({
  name: 'CxInfotipDemo'
})
</script>

<style scoped lang="scss">
.cx-infotip-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
