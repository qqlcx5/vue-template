<template>
  <div ref="rootRef" class="cx-sticky-root">
    <!-- 占位元素：当 sticky 内容变为 fixed 后，保持原始布局空间 -->
    <div
      v-if="isSticky"
      :style="{ width: '100%', height: placeholderHeight + 'px' }"
      class="cx-sticky__placeholder"
    />
    <div
      ref="stickyRef"
      :class="['cx-sticky', { 'cx-sticky--active': isSticky }]"
      :style="stickyStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'
import type { CxStickyProps, CxStickyEmits } from './types'

defineOptions({ name: 'CxSticky' })

const props = withDefaults(defineProps<CxStickyProps>(), {
  top: 0,
  bottom: 0,
  container: '',
  zIndex: 10,
})

const emit = defineEmits<CxStickyEmits>()

const stickyRef = ref<HTMLElement>()
const rootRef = ref<HTMLElement>()
const isSticky = ref(false)
const placeholderHeight = ref(0)
const stickyWidth = ref('auto')

// 响应式滚动容器引用：默认 window，onMounted 后可能替换为自定义容�?const scrollContainerRef = ref<HTMLElement | Window>(window)

const isBottom = computed(() => props.bottom > 0)

function getContainerMetrics(scrollContainer: HTMLElement | Window) {
  if (scrollContainer === window) {
    return { containerTop: 0, containerHeight: window.innerHeight }
  }
  const cRect = (scrollContainer as HTMLElement).getBoundingClientRect()
  return { containerTop: cRect.top, containerHeight: cRect.height }
}

function updatePosition() {
  if (!stickyRef.value || !rootRef.value) return

  const rect = stickyRef.value.getBoundingClientRect()
  const scrollContainer = scrollContainerRef.value
  const { containerTop, containerHeight } = getContainerMetrics(scrollContainer)

  if (isBottom.value) {
    const shouldSticky = rect.bottom > containerHeight - props.bottom
    if (shouldSticky !== isSticky.value) {
      if (shouldSticky) {
        placeholderHeight.value = rect.height
        stickyWidth.value = `${stickyRef.value.offsetWidth}px`
      } else {
        placeholderHeight.value = 0
        stickyWidth.value = 'auto'
      }
      isSticky.value = shouldSticky
      emit('change', isSticky.value)
    }
  } else {
    const shouldSticky = rect.top <= containerTop + props.top
    if (shouldSticky !== isSticky.value) {
      if (shouldSticky) {
        placeholderHeight.value = rect.height
        stickyWidth.value = `${stickyRef.value.offsetWidth}px`
      } else {
        placeholderHeight.value = 0
        stickyWidth.value = 'auto'
      }
      isSticky.value = shouldSticky
      emit('change', isSticky.value)
    }
  }
}

const stickyStyle = computed(() => {
  if (!isSticky.value) return {}

  const baseStyle = {
    position: 'fixed' as const,
    zIndex: props.zIndex,
    width: stickyWidth.value,
  }

  if (isBottom.value) {
    return { ...baseStyle, bottom: `${props.bottom}px` }
  }
  return { ...baseStyle, top: `${props.top}px` }
})

// 响应式绑�?scroll 事件到正确的容器
useEventListener(scrollContainerRef, 'scroll', updatePosition, { passive: true })
useEventListener(window, 'resize', updatePosition)

onMounted(() => {
  // 查找自定义滚动容器并替换 scrollContainerRef
  if (props.container) {
    const el = document.querySelector(props.container)
    if (el) {
      scrollContainerRef.value = el as HTMLElement
    }
  }
  updatePosition()
})
</script>

<style scoped lang="scss">
.cx-sticky-root {
  /* 根容器不做额外样式干�?*/
}

.cx-sticky {
  /* 正常流中的默认样�?*/

  &--active {
    /* 吸顶激活状�?*/
  }

  &__placeholder {
    /* 不可见占位，维持布局空间 */
    visibility: hidden;
  }
}
</style>
