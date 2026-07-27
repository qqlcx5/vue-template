<template>
  <div class="cx-tooltip-example-manual">
    <h3>手动触发（带 CxIcon）</h3>
    <CxTooltip content="这是自定义提示内容" placement="right" :auto-overflow="false">
      <el-button text>鼠标悬浮查看提示</el-button>
    </CxTooltip>
  </div>
</template>

<script setup lang="ts">
import CxTooltip from '../CxTooltip.vue'

defineOptions({ name: 'CxTooltipExampleManual' })
</script>
