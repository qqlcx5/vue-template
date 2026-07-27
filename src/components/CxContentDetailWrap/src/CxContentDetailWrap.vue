<template>
  <div class="cx-content-detail-wrap">
    <div class="cx-content-detail-wrap__header">
      <div class="cx-content-detail-wrap__header-left">
        <el-button
          v-if="showBack"
          :icon="'ArrowLeft'"
          text
          class="cx-content-detail-wrap__back-btn"
          @click="emit('back')"
        >
          {{ backText }}
        </el-button>
        <span class="cx-content-detail-wrap__title">{{ title }}</span>
      </div>
      <div class="cx-content-detail-wrap__header-right">
        <slot name="header-right" />
      </div>
    </div>
    <el-card shadow="never" :body-style="{ padding: '20px' }" :class="contentClass">
      <slot />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { CxContentDetailWrapProps, CxContentDetailWrapEmits } from './types'

defineOptions({ name: 'CxContentDetailWrap' })

withDefaults(defineProps<CxContentDetailWrapProps>(), {
  title: '',
  showBack: true,
  backText: '返回',
  contentClass: '',
})

const emit = defineEmits<CxContentDetailWrapEmits>()
</script>

<style scoped lang="scss">
.cx-content-detail-wrap {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__back-btn {
    font-size: 14px;
    color: #606266;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  }

  &__header-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
