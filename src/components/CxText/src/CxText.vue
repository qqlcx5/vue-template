<template>
  <el-tooltip
    :disabled="!tooltipEnabled"
    :content="slots.content ? undefined : tooltipText"
    v-bind="mergedTooltipProps"
    :show-after="300"
  >
    <template v-if="slots.content" #content>
      <slot name="content" />
    </template>
    <el-text
      ref="textRef"
      :truncated="!lineClamp"
      :line-clamp="lineClamp ? Number(lineClamp) : undefined"
      class="cx-text"
      v-bind="$attrs"
      @mouseover="handleHover"
    >
      <slot />
    </el-text>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import { ElText, ElTooltip } from 'element-plus'
import type { CXTextProps } from './types'

// ============================================================
// Options & Props
// ============================================================

defineOptions({
  name: 'CxText',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CXTextProps>(), {
  lineClamp: undefined,
  tooltipProps: () => ({})
})

const slots = useSlots()

// ============================================================
// 响应式状态
// ============================================================

const textRef = ref<InstanceType<typeof ElText> | null>(null)
const tooltipEnabled = ref(false)
const tooltipText = ref('')

// ============================================================
// 计算属性
// ============================================================

const mergedTooltipProps = computed(() => ({
  placement: 'top' as const,
  ...props.tooltipProps
}))

// ============================================================
// 方法
// ============================================================

function isTextEllipsis(el: HTMLElement): boolean {
  if (!props.lineClamp) {
    return el.scrollWidth > el.clientWidth
  } else {
    return el.scrollHeight > el.clientHeight
  }
}

function handleHover(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement
  const overflow = isTextEllipsis(target)
  tooltipEnabled.value = overflow
  if (overflow && !slots.content) {
    tooltipText.value = target.textContent || ''
  }
}
</script>

<style scoped lang="scss">
// ============================================================
// CXText - 文本省略/展开
// ============================================================

.cx-text {
  max-width: 100%;
  display: inline-block;
}
</style>
