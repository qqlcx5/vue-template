<template>
  <div
    class="cx-split-pane"
    :class="[`cx-split-pane--${split}`, { 'cx-split-pane--dragging': isDragging }]"
    :style="containerStyle"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  >
    <!-- 左侧 / 上方面板 -->
    <div
      class="cx-split-pane__pane cx-split-pane__pane--first"
      :style="firstPaneStyle"
    >
      <slot name="left" />
    </div>

    <!-- 分割条 -->
    <div
      v-if="!disabled"
      class="cx-split-pane__resizer"
      :class="[`cx-split-pane__resizer--${split}`]"
      :style="resizerStyle"
      @mousedown.prevent="onMouseDown"
      @click="onResizerClick"
    />

    <!-- 右侧 / 下方面板 -->
    <div
      class="cx-split-pane__pane cx-split-pane__pane--second"
      :style="secondPaneStyle"
    >
      <slot name="right" />
    </div>

    <!-- 拖拽遮罩层 -->
    <div
      v-show="isDragging"
      class="cx-split-pane__mask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CXSplitPaneProps, CXSplitPaneEmits } from './types'

// ============================================================
// Options & Props
// ============================================================

defineOptions({
  name: 'CxSplitPane',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CXSplitPaneProps>(), {
  split: 'vertical',
  defaultPercent: 50,
  minPercent: 10,
  disabled: false
})

const emit = defineEmits<CXSplitPaneEmits>()

// ============================================================
// 响应式状态
// ============================================================

const isDragging = ref(false)
const hasMoved = ref(false)
const percent = ref(props.defaultPercent)

// ============================================================
// 计算属性
// ============================================================

const containerStyle = computed(() => {
  if (!isDragging.value) return {}
  return {
    cursor: props.split === 'vertical' ? 'col-resize' : 'row-resize',
    userSelect: 'none'
  }
})

const firstPaneStyle = computed(() => {
  const prop = props.split === 'vertical' ? 'width' : 'height'
  return { [prop]: `${percent.value}%` }
})

const secondPaneStyle = computed(() => {
  const prop = props.split === 'vertical' ? 'width' : 'height'
  return { [prop]: `${100 - percent.value}%` }
})

const resizerStyle = computed(() => {
  const prop = props.split === 'vertical' ? 'left' : 'top'
  return { [prop]: `${percent.value}%` }
})

// ============================================================
// 事件处理
// ============================================================

function onMouseDown() {
  if (props.disabled) return
  isDragging.value = true
  hasMoved.value = false
}

function onMouseUp() {
  if (!isDragging.value) return
  isDragging.value = false
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return

  // 鼠标按键已释放（在组件外释放的情况）
  if (e.buttons === 0 || e.which === 0) {
    isDragging.value = false
    return
  }

  const target = e.currentTarget as HTMLElement
  if (!target) return

  let offset = 0
  let current: HTMLElement | null = target

  if (props.split === 'vertical') {
    while (current) {
      offset += current.offsetLeft
      current = current.offsetParent as HTMLElement | null
    }
    const newPercent = Math.floor(((e.pageX - offset) / target.offsetWidth) * 10000) / 100
    clampPercent(newPercent)
  } else {
    while (current) {
      offset += current.offsetTop
      current = current.offsetParent as HTMLElement | null
    }
    const newPercent = Math.floor(((e.pageY - offset) / target.offsetHeight) * 10000) / 100
    clampPercent(newPercent)
  }

  hasMoved.value = true
}

function clampPercent(newPercent: number) {
  if (newPercent > props.minPercent && newPercent < 100 - props.minPercent) {
    percent.value = newPercent
    emit('resize', percent.value)
  }
}

function onResizerClick() {
  if (!hasMoved.value) {
    // 双击重置为 50%
    percent.value = 50
    emit('resize', percent.value)
  }
}

// ============================================================
// 暴露
// ============================================================

defineExpose({
  reset: () => {
    percent.value = props.defaultPercent
    emit('resize', percent.value)
  },
  setPercent: (val: number) => {
    clampPercent(val)
  },
  percent
})
</script>

<style scoped lang="scss">
// ============================================================
// CXSplitPane - 分割面板
// ============================================================

.cx-split-pane {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  // 垂直分割（左右）
  &--vertical {
    .cx-split-pane__pane--first {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      overflow: auto;
      padding-right: 3px;
    }

    .cx-split-pane__pane--second {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      overflow: auto;
      padding-left: 3px;
    }
  }

  // 水平分割（上下）
  &--horizontal {
    .cx-split-pane__pane--first {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      overflow: auto;
      padding-bottom: 3px;
    }

    .cx-split-pane__pane--second {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: auto;
      padding-top: 3px;
    }
  }

  // 面板
  &__pane {
    box-sizing: border-box;
  }

  // 分割条
  &__resizer {
    box-sizing: border-box;
    position: absolute;
    z-index: 10;
    background: #e5e6eb;
    opacity: 0.8;
    transition: opacity 0.15s;
    background-clip: padding-box;

    &:hover {
      opacity: 1;
      background: #c0c4cc;
    }

    &--vertical {
      width: 6px;
      height: 100%;
      cursor: col-resize;

      &::before {
        content: '⋮';
        font-size: 14px;
        color: #909399;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1;
      }
    }

    &--horizontal {
      height: 6px;
      width: 100%;
      cursor: row-resize;

      &::before {
        content: '⋯';
        font-size: 14px;
        color: #909399;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1;
        letter-spacing: 2px;
      }
    }
  }

  // 拖拽遮罩
  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    cursor: inherit;
    background: transparent;
  }
}
</style>
