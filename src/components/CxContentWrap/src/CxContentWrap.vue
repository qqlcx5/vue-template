<template>
  <div class="cx-content-wrap">
    <div v-if="title || $slots.header" class="cx-content-wrap__header">
      <div class="cx-content-wrap__header-left">
        <span class="cx-content-wrap__title">{{ title }}</span>
        <el-tooltip v-if="message" :content="message" placement="top">
          <CxIcon name="question-line" :size="14" class="cx-content-wrap__help" />
        </el-tooltip>
      </div>
      <div class="cx-content-wrap__header-right">
        <slot name="header" />
      </div>
    </div>
    <div class="cx-content-wrap__body" :class="contentClass" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import CxIcon from '../../CxIcon/src/CxIcon.vue'
import type { CxContentWrapProps } from './types'

defineOptions({ name: 'CxContentWrap' })

withDefaults(defineProps<CxContentWrapProps>(), {
  title: '',
  message: '',
  contentClass: '',
  contentStyle: () => ({}),
})
</script>

<style scoped lang="scss">
.cx-content-wrap {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #ebeef5;
  }

  &__header-left {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  }

  &__help {
    color: #909399;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }

  &__body {
    padding: 20px;
  }
}
</style>
