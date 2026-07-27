<template>
  <span class="cx-tooltip">
    <span v-if="label" class="cx-tooltip__label">{{ label }}</span>
    <el-tooltip
      :content="content"
      :placement="placement"
      :effect="effect"
    >
      <span class="cx-tooltip__icon-wrap">
        <CxIcon :name="icon" :size="iconSize" class="cx-tooltip__icon" />
      </span>
    </el-tooltip>
  </span>
</template>

<script setup lang="ts">
import CxIcon from '../../CxIcon/src/CxIcon.vue'
import type { CxTooltipProps } from './types'

defineOptions({ name: 'CxTooltip' })

withDefaults(defineProps<CxTooltipProps>(), {
  content: '',
  label: '',
  placement: 'top',
  icon: 'question-line',
  iconSize: 14,
  effect: 'dark',
})
</script>

<style scoped lang="scss">
.cx-tooltip {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &__label {
    font-size: 14px;
    color: #606266;
  }

  &__icon-wrap {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  &__icon {
    color: #909399;

    &:hover {
      color: #409eff;
    }
  }
}
</style>
