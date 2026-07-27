<template>
  <div class="demo-page">
    <el-card header="CxTooltip 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法（content 文字 + 默认触发）</h3>
      <div class="cx-tooltip-demo__section">
        <CxTooltip content="这是一段提示文字">
          <el-button>悬停查看</el-button>
        </CxTooltip>
      </div>

      <!-- 场景2：文字提示 + 位置 -->
      <h3>场景2：label 文字提示 + 右侧弹出</h3>
      <div class="cx-tooltip-demo__section">
        <CxTooltip label="帮助" placement="right">
          <el-button type="primary">帮助按钮</el-button>
        </CxTooltip>
      </div>

      <!-- 场景3：自定义图标 -->
      <h3>场景3：自定义图标 + 大小</h3>
      <div class="cx-tooltip-demo__section">
        <CxTooltip content="自定义图标提示" icon="mdi:help-circle" :icon-size="20">
          <el-button type="success">自定义图标按钮</el-button>
        </CxTooltip>
      </div>

      <!-- 场景4：不同弹出位置 -->
      <h3>场景4：不同弹出位置</h3>
      <div class="cx-tooltip-demo__section">
        <div class="cx-tooltip-demo__placement-row">
          <CxTooltip content="顶部提示" placement="top">
            <el-button>上</el-button>
          </CxTooltip>
          <CxTooltip content="底部提示" placement="bottom">
            <el-button>下</el-button>
          </CxTooltip>
          <CxTooltip content="左侧提示" placement="left">
            <el-button>左</el-button>
          </CxTooltip>
          <CxTooltip content="右侧提示" placement="right">
            <el-button>右</el-button>
          </CxTooltip>
        </div>
      </div>

      <!-- 场景5：暗色效果 -->
      <h3>场景5：暗色效果</h3>
      <div class="cx-tooltip-demo__section">
        <CxTooltip content="暗色主题提示" effect="dark">
          <el-button type="warning">暗色提示</el-button>
        </CxTooltip>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CxTooltip } from '@/components/CxTooltip'

defineOptions({
  name: 'CxTooltipDemo'
})
</script>

<style scoped lang="scss">
.cx-tooltip-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }

  &__placement-row {
    display: flex;
    gap: 12px;
  }
}
</style>
