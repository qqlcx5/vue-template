<template>
  <div
    class="cx-segmented"
    :class="{
      'cx-segmented--block': block,
      'cx-segmented--large': size === 'large',
      'cx-segmented--small': size === 'small'
    }"
  >
    <div ref="groupRef" class="cx-segmented__group">
      <div
        class="cx-segmented__selected"
        :class="{ 'cx-segmented__selected--init': initStatus }"
        :style="selectedStyle"
      />
      <label
        v-for="(option, index) in options"
        :key="index"
        :ref="(el: any) => setLabelRef(index, el)"
        class="cx-segmented__item"
        :class="{ 'cx-segmented__item--disabled': disabled || option.disabled }"
        :style="getItemHoverStyle(index)"
        @mouseenter="onItemMouseEnter(index, option)"
        @mouseleave="onItemMouseLeave(index)"
        @click="onItemClick(index, option, $event)"
      >
        <input type="radio" name="cx-segmented" />
        <div class="cx-segmented__item-label">
          <component
            :is="option.icon"
            v-if="option.icon"
            class="cx-segmented__item-icon"
            :class="{ 'cx-segmented__item-icon--margin': option.label }"
          />
          <span v-if="option.label">{{ option.label }}</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import type { CXSegmentedProps, CXSegmentedEmits, SegmentedOption } from './types'

// ============================================================
// Options & Props
// ============================================================

defineOptions({
  name: 'CxSegmented',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CXSegmentedProps>(), {
  options: () => [],
  modelValue: 0,
  block: false,
  size: 'default',
  disabled: false,
  resize: false
})

const emit = defineEmits<CXSegmentedEmits>()

// ============================================================
// 响应式状态
// ============================================================

const groupRef = ref<HTMLElement | null>(null)
const labelRefs = ref<Record<number, HTMLElement | null>>({})
const initStatus = ref(false)
const selectedWidth = ref(0)
const selectedTranslateX = ref(0)
const curMouseIndex = ref(-1)
const curIndex = ref<number>(
  typeof props.modelValue === 'number' ? props.modelValue : 0
)

let resizeObserver: ResizeObserver | null = null

// ============================================================
// 计算属性
// ============================================================

const selectedStyle = computed(() => ({
  width: `${selectedWidth.value}px`,
  transform: `translateX(${selectedTranslateX.value}px)`,
  display: initStatus.value ? 'block' : 'none'
}))

// ============================================================
// 方法
// ============================================================

function setLabelRef(index: number, el: any) {
  if (el) {
    labelRefs.value[index] = el
  }
}

function getItemHoverStyle(index: number) {
  if (curMouseIndex.value === index && !props.disabled) {
    return { background: 'rgba(0, 0, 0, 0.04)' }
  }
  return {}
}

function onItemMouseEnter(index: number, option: SegmentedOption) {
  if (props.disabled) return
  curMouseIndex.value = index
}

function onItemMouseLeave(_index: number) {
  curMouseIndex.value = -1
}

function onItemClick(index: number, option: SegmentedOption, event: Event) {
  if (props.disabled || option.disabled) return
  event.preventDefault()

  if (typeof props.modelValue === 'number') {
    emit('update:modelValue', index)
  } else {
    curIndex.value = index
  }
  emit('change', { index, option })
}

function syncSelectedIndicator(index: number) {
  nextTick(() => {
    const labelEl = labelRefs.value[index]
    if (!labelEl) return
    selectedWidth.value = labelEl.clientWidth
    selectedTranslateX.value = labelEl.offsetLeft
    initStatus.value = true
  })
}

function setupResizeObserver() {
  if (!props.block && !props.resize) return
  if (!groupRef.value) return

  resizeObserver = new ResizeObserver(() => {
    nextTick(() => {
      syncSelectedIndicator(curIndex.value)
    })
  })
  resizeObserver.observe(groupRef.value)
}

function cleanupResizeObserver() {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
}

// ============================================================
// Watch & Lifecycle
// ============================================================

watch(
  () => curIndex.value,
  (index) => {
    syncSelectedIndicator(index)
  },
  { immediate: true }
)

watch(
  () => props.modelValue,
  (val) => {
    if (typeof val === 'number') {
      curIndex.value = val
    }
  }
)

watch(
  () => props.size,
  () => {
    syncSelectedIndicator(curIndex.value)
  }
)

onMounted(() => {
  setupResizeObserver()
})

onBeforeUnmount(() => {
  cleanupResizeObserver()
})

// ============================================================
// 暴露
// ============================================================

defineExpose({
  curIndex
})
</script>

<style scoped lang="scss">
// ============================================================
// CXSegmented - 分段控制器
// ============================================================

$segmented-track-padding: 2px;
$segmented-line-width: 1px;
$padding-horizontal: 12px;
$padding-horizontal-sm: 8px;

.cx-segmented {
  box-sizing: border-box;
  display: inline-block;
  padding: $segmented-track-padding;
  font-size: var(--el-font-size-base, 14px);
  color: rgba(0, 0, 0, 0.65);
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 6px;
  user-select: none;

  // Block 模式
  &--block {
    display: flex;

    .cx-segmented__item {
      flex: 1;
      min-width: 0;
    }

    .cx-segmented__item-label span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  // Small
  &--small {
    border-radius: 4px;

    .cx-segmented__item {
      border-radius: var(--el-border-radius-small, 3px);
    }

    .cx-segmented__item-label {
      min-height: calc(var(--el-component-size-small, 24px) - $segmented-track-padding * 2);
      line-height: calc(var(--el-component-size-small, 24px) - $segmented-track-padding * 2);
      padding: 0 calc($padding-horizontal-sm - $segmented-line-width);
    }
  }

  // Large
  &--large {
    border-radius: 8px;

    .cx-segmented__item {
      border-radius: calc(var(--el-border-radius-base, 4px) + var(--el-border-radius-small, 3px));
    }

    .cx-segmented__item-label {
      min-height: calc(var(--el-component-size-large, 40px) - $segmented-track-padding * 2);
      line-height: calc(var(--el-component-size-large, 40px) - $segmented-track-padding * 2);
      padding: 0 calc($padding-horizontal - $segmented-line-width);
      font-size: var(--el-font-size-medium, 16px);
    }
  }

  // 分割组容器
  &__group {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-items: flex-start;
    width: 100%;
  }

  // 选中指示器（滑动背景块）
  &__selected {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: none;
    width: 0;
    height: 100%;
    padding: 4px 0;
    background-color: #fff;
    border-radius: 4px;
    box-shadow:
      0 2px 8px -2px rgba(0, 0, 0, 0.05),
      0 1px 4px -1px rgba(0, 0, 0, 0.07),
      0 0 1px rgba(0, 0, 0, 0.07);
    transition:
      transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1),
      width 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    will-change: transform, width;

    &--init {
      display: block;
    }
  }

  // 单个选项
  &__item {
    position: relative;
    text-align: center;
    cursor: pointer;
    border-radius: var(--el-border-radius-base, 4px);
    transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);

    // 隐藏原生 radio
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
    }

    // 禁用态
    &--disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }

  // 选项标签内容区
  &__item-label {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(var(--el-component-size, 32px) - $segmented-track-padding * 2);
    line-height: calc(var(--el-component-size, 32px) - $segmented-track-padding * 2);
    padding: 0 calc($padding-horizontal - $segmented-line-width);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  // 图标
  &__item-icon {
    display: flex;
    align-items: center;

    :deep(svg) {
      width: 16px;
      height: 16px;
    }

    &--margin {
      margin-right: 6px;
    }
  }
}
</style>
