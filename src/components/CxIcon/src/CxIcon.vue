<script setup lang="ts">
// ============================================================
// CxIcon - 通用图标组件
// ============================================================
// 支持：
//   1. MDI 图标库（mdi:home, mdi:account-outline, ...）
//   2. 任意已安装的 @iconify-json/* 图标集
//   3. SVG 字符串（<svg>...</svg>）
//   4. 图片 URL（http/https/data:image）
//
// 动态按需加载：首次使用某图标集时自动 import 对应 JSON 数据
// 已加载图标集缓存在内存，后续直接离线渲染

import { computed, useAttrs, type CSSProperties } from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue/dist/offline'
import { useIconLoad } from './useIconLoad'
import type { CxIconProps } from './types'

defineOptions({ name: 'CxIcon', inheritAttrs: false })

const props = withDefaults(defineProps<CxIconProps>(), {
  width: '1em',
  height: '1em',
  color: 'currentColor',
  horizontalFlip: false,
  verticalFlip: false,
  rotate: 0,
  // loadingIcon 不再用于 Iconify 加载占位，已改为内联 SVG spinner
  // 保留 prop 以向后兼容
})

const emit = defineEmits<{
  (e: 'load', name: string): void
  (e: 'error', name: string, err: unknown): void
}>()

// 获取透传属性（inheritAttrs: false 时需手动处理）
const rawAttrs = useAttrs()
// 排除 class，避免与模板中的 class 冲突
const $attrs = computed(() => {
  const { class: _, ...rest } = rawAttrs as Record<string, any>
  return rest
})

// ---- SVG 字符串检测 ----
const svgReg = /^\s*<svg[\s>]/
const imgReg = /^(https?:\/\/|\/\/|data:image\/)/

const isSvgString = computed(() => typeof props.icon === 'string' && svgReg.test(props.icon))
const isImgUrl = computed(() => typeof props.icon === 'string' && imgReg.test(props.icon))
const isIconifyIcon = computed(
  () => !isSvgString.value && !isImgUrl.value && !!props.icon,
)

// ---- 动态加载（仅对 Iconify 图标生效）----
const iconRef = computed(() => props.icon)
const { ready, loading } = useIconLoad({
  icon: iconRef,
  onLoad: (name) => emit('load', name),
  onError: (name, err) => emit('error', name, err),
})

// 旋转/翻转 style
const computedStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = { ...props.style }
  if (props.rotate) {
    style.transform = `rotate(${props.rotate}deg)`
  }
  if (props.horizontalFlip || props.verticalFlip) {
    const scaleX = props.horizontalFlip ? -1 : 1
    const scaleY = props.verticalFlip ? -1 : 1
    const existing = style.transform || ''
    style.transform = `${existing} scale(${scaleX}, ${scaleY})`.trim()
  }
  return style
})

// Iconify 组件 props（含 $attrs 合并，避免模板中两个 v-bind 冲突）
const iconifyProps = computed(() => ({
  ...$attrs.value,
  icon: props.icon,
  width: props.width,
  height: props.height,
  color: props.color,
  horizontalFlip: props.horizontalFlip,
  verticalFlip: props.verticalFlip,
  style: computedStyle.value,
}))

// loading 旋转样式
const spinnerStyle = computed<CSSProperties>(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  ...computedStyle.value,
}))

// SVG raw 渲染
const svgContainerStyle = computed<CSSProperties>(() => ({
  display: 'inline-flex',
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  color: props.color,
  ...computedStyle.value,
}))

// 图标不存在占位
const notFoundStyle = computed<CSSProperties>(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  color: 'var(--el-text-color-placeholder, #999)',
  fontSize: '0.8em',
  ...computedStyle.value,
}))
</script>

<template>
  <!-- SVG 字符串直接 v-html 渲染 -->
  <span
    v-if="isSvgString"
    class="cx-icon cx-icon--svg"
    :style="svgContainerStyle"
    v-html="icon"
  />

  <!-- 图片 URL -->
  <img
    v-else-if="isImgUrl"
    class="cx-icon cx-icon--img"
    :src="icon"
    :style="{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      objectFit: 'contain',
      ...computedStyle,
    }"
  />

  <!-- Iconify 图标：已就绪 -->
  <IconifyIcon
    v-else-if="isIconifyIcon && ready"
    v-bind="iconifyProps"
    class="cx-icon cx-icon--iconify"
  />

  <!-- Iconify 图标：加载中 -->
  <span v-else-if="isIconifyIcon && loading" :style="spinnerStyle" class="cx-icon cx-icon--loading">
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" style="animation: cx-icon-spin 1s linear infinite">
      <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/>
    </svg>
  </span>

  <!-- Iconify 图标：加载失败/不存在 -->
  <span v-else :style="notFoundStyle" class="cx-icon cx-icon--fallback">
    <slot name="fallback">
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    </slot>
  </span>
</template>

<style scoped>
.cx-icon {
  display: inline-flex;
  vertical-align: middle;
  flex-shrink: 0;
}

.cx-icon--svg :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.cx-icon--img {
  vertical-align: middle;
}

@keyframes cx-icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
