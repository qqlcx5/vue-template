<template>
  <div class="cx-error" role="alert" :aria-label="`错误 ${type}`" @click="handleErrorClick">
    <div class="cx-error__image">
      <!-- 自定义图片 -->
      <img v-if="image" :src="image" :alt="`错误 ${type}`" class="cx-error__img" />
      <!-- 404 SVG -->
      <svg v-else-if="type === '404'" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="cx-error__svg">
        <text x="200" y="100" text-anchor="middle" font-size="80" font-weight="bold" fill="#e6e8eb">404</text>
        <text x="200" y="140" text-anchor="middle" font-size="16" fill="#909399">抱歉，您访问的页面不存在</text>
      </svg>
      <!-- 403 SVG -->
      <svg v-else-if="type === '403'" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="cx-error__svg">
        <text x="200" y="100" text-anchor="middle" font-size="80" font-weight="bold" fill="#e6a23c">403</text>
        <text x="200" y="140" text-anchor="middle" font-size="16" fill="#909399">抱歉，您无权访问此页面</text>
      </svg>
      <!-- 500 SVG -->
      <svg v-else viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="cx-error__svg">
        <text x="200" y="100" text-anchor="middle" font-size="80" font-weight="bold" fill="#f56c6c">500</text>
        <text x="200" y="140" text-anchor="middle" font-size="16" fill="#909399">抱歉，服务器出错了</text>
      </svg>
    </div>
    <div v-if="title" class="cx-error__title">{{ title }}</div>
    <div v-if="message" class="cx-error__message">{{ message }}</div>
    <div v-if="$slots.default" class="cx-error__actions">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CxErrorProps, CxErrorEmits } from './types'

defineOptions({ name: 'CxError' })

const props = withDefaults(defineProps<CxErrorProps>(), {
  type: '404',
})

const emit = defineEmits<CxErrorEmits>()

function handleErrorClick() {
  emit('error-click', props.type)
}
</script>

<style scoped lang="scss">
.cx-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 0;

  &__image {
    margin-bottom: 24px;
  }

  &__img {
    max-width: 300px;
    max-height: 150px;
    object-fit: contain;
  }

  &__svg {
    width: 300px;
    height: 150px;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: var(--el-text-color-primary, #303133);
    margin-bottom: 8px;
  }

  &__message {
    font-size: 14px;
    color: var(--el-text-color-secondary, #909399);
    margin-bottom: 24px;
  }

  &__actions {
    display: flex;
    gap: 12px;
    cursor: pointer;
  }
}
</style>
