<template>
  <div class="cx-empty" @click="emit('click')">
    <div class="cx-empty__image">
      <slot name="image">
        <svg :style="{ width: `${imageSize}px`, height: `${imageSize}px` }" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
            <ellipse cx="32" cy="33" rx="32" ry="7" fill="#f5f5f5" />
            <g fill-rule="nonzero" stroke="#d9d9d9">
              <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
              <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" />
            </g>
          </g>
        </svg>
      </slot>
    </div>
    <div class="cx-empty__text">
      <slot name="description">{{ description }}</slot>
    </div>
    <div v-if="$slots.default" class="cx-empty__actions">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CxEmptyProps, CxEmptyEmits } from './types'

defineOptions({ name: 'CxEmpty' })

withDefaults(defineProps<CxEmptyProps>(), {
  description: '暂无数据',
  imageSize: 120,
})

const emit = defineEmits<CxEmptyEmits>()
</script>

<style scoped lang="scss">
.cx-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;

  &__image {
    margin-bottom: 16px;
    opacity: 0.6;
  }

  &__text {
    margin: 0;
    font-size: 14px;
    color: #909399;
    line-height: 1.5;
  }

  &__actions {
    margin-top: 16px;
  }
}
</style>
