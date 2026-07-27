<template>
  <div class="cx-tooltip-example-basic">
    <h3>溢出自动显示 Tooltip</h3>
    <p class="cx-tooltip-example-basic__desc">hover 下方文本查看效果</p>
    <div class="cx-tooltip-example-basic__row">
      <CxTooltip content="这是一段很长很长很长很长很长很长很长很长很长很长的文本">
        <span class="cx-tooltip-example-basic__text">这是一段很长很长很长很长...</span>
      </CxTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import CxTooltip from '../CxTooltip.vue'

defineOptions({ name: 'CxTooltipExampleBasic' })
</script>

<style scoped lang="scss">
.cx-tooltip-example-basic {
  &__desc {
    color: #909399;
    font-size: 13px;
    margin-bottom: 12px;
  }

  &__row {
    max-width: 280px;
  }

  &__text {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
