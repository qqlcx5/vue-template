<template>
  <div :ref="wrapRefKey" class="cx-seamless-scroll">
    <!-- 左切换按钮 -->
    <div
      v-if="navigation"
      class="cx-seamless-scroll__switch cx-seamless-scroll__switch--left"
      :class="leftSwitchClass"
      :style="leftSwitchStyle"
      @click="leftSwitchClick"
    >
      <slot name="left-switch" />
    </div>

    <!-- 右切换按钮 -->
    <div
      v-if="navigation"
      class="cx-seamless-scroll__switch cx-seamless-scroll__switch--right"
      :class="rightSwitchClass"
      :style="rightSwitchStyle"
      @click="rightSwitchClick"
    >
      <slot name="right-switch" />
    </div>

    <!-- 滚动内容区 -->
    <div
      :ref="realBoxKey"
      class="cx-seamless-scroll__content"
      :style="contentStyle"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @touchstart.passive="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div :ref="slotListKey" class="cx-seamless-scroll__list" :style="floatStyle">
        <slot />
      </div>
      <div class="cx-seamless-scroll__list" :style="floatStyle" v-html="copyHtml" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  unref,
  computed,
  nextTick,
  useTemplateRef,
  type CSSProperties
} from 'vue'
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core'
import type { CxSeamlessScrollProps, CxSeamlessScrollEmits, SeamlessScrollOption } from './types'

// ============================================================
// Options
// ============================================================

defineOptions({
  name: 'CxSeamlessScroll'
})

// ============================================================
// Props & Emits
// ============================================================

const props = withDefaults(defineProps<CxSeamlessScrollProps>(), {
  data: () => [],
  classOption: () => ({})
})

const emit = defineEmits<CxSeamlessScrollEmits>()

// ============================================================
// 工具函数
// ============================================================

/** 深浅合并拷贝 */
function copyObj<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  const result = { ...target }
  for (const source of sources) {
    if (!source) continue
    for (const key of Object.keys(source)) {
      const val = source[key]
      if (val !== undefined) {
        result[key as keyof T] = val
      }
    }
  }
  return result
}

// ============================================================
// 默认配置
// ============================================================

const defaultOption: SeamlessScrollOption = {
  step: 1,
  limitMoveNum: 5,
  hoverStop: true,
  direction: 'top',
  openTouch: true,
  singleHeight: 0,
  singleWidth: 0,
  waitTime: 1000,
  switchOffset: 30,
  autoPlay: true,
  navigation: false,
  switchSingleStep: 134,
  switchDelay: 400,
  switchDisabledClass: 'disabled',
  isSingleRemUnit: false
}

// 组件实例唯一 key
const instanceKey = Math.random().toString(36).slice(2, 8)
const wrapRefKey = `wrap_${instanceKey}`
const slotListKey = `slotList_${instanceKey}`
const realBoxKey = `realBox_${instanceKey}`

// ============================================================
// 响应式状态
// ============================================================

const xPos = ref(0)
const yPos = ref(0)
const delay = ref(0)
const height = ref(0)
const width = ref(0)
const realBoxWidth = ref(0)
const realBoxHeight = ref(0)
const copyHtml = ref('')
let singleWaitTime: ReturnType<typeof setTimeout> | null = null
let reqFrame: number | null = null
let startPos: { x: number; y: number } | null = null
let startPosY: number | null = null
let startPosX: number | null = null
let isHover = false
let ease = 'ease-in'

const wrap = useTemplateRef<HTMLElement>(wrapRefKey)
const slotList = useTemplateRef<HTMLElement>(slotListKey)
const realBox = useTemplateRef<HTMLElement>(realBoxKey)

// ============================================================
// 计算属性
// ============================================================

const options = computed(() => copyObj({ ...defaultOption }, props.classOption || {} as any))

const isHorizontal = computed(() => {
  const dir = options.value.direction
  return dir !== 'bottom' && dir !== 'top'
})

const leftSwitchState = computed(() => xPos.value < 0)

const rightSwitchState = computed(() => {
  return Math.abs(xPos.value) < realBoxWidth.value - width.value
})

const leftSwitchClass = computed(() => {
  return leftSwitchState.value ? '' : options.value.switchDisabledClass
})

const rightSwitchClass = computed(() => {
  return rightSwitchState.value ? '' : options.value.switchDisabledClass
})

const leftSwitchStyle = computed((): CSSProperties => ({
  position: 'absolute',
  margin: `${height.value / 2}px 0 0 -${options.value.switchOffset}px`,
  transform: 'translate(-100%, -50%)'
}))

const rightSwitchStyle = computed((): CSSProperties => ({
  position: 'absolute',
  margin: `${height.value / 2}px 0 0 ${width.value + (options.value.switchOffset || 0)}px`,
  transform: 'translateY(-50%)'
}))

const floatStyle = computed((): CSSProperties => {
  return isHorizontal.value
    ? { float: 'left', overflow: 'hidden' }
    : { overflow: 'hidden' }
})

const contentStyle = computed(() => ({
  transform: `translate(${xPos.value}px,${yPos.value}px)`,
  transition: `all ${ease} ${delay.value}ms`,
  overflow: 'hidden'
}))

const navigation = computed(() => options.value.navigation)

const autoPlay = computed(() => {
  if (navigation.value) return false
  return options.value.autoPlay
})

const scrollSwitch = computed(() => {
  return (props.data || []).length >= (options.value.limitMoveNum || 5)
})

const hoverStopSwitch = computed(() => {
  return options.value.hoverStop && autoPlay.value && scrollSwitch.value
})

const canTouchScroll = computed(() => options.value.openTouch)

const baseFontSize = computed(() => {
  return options.value.isSingleRemUnit
    ? parseInt(window.getComputedStyle(document.documentElement).fontSize)
    : 1
})

const realSingleStopWidth = computed(() => (options.value.singleWidth || 0) * baseFontSize.value)

const realSingleStopHeight = computed(() => (options.value.singleHeight || 0) * baseFontSize.value)

const step = computed(() => {
  const s = options.value.step || 1
  if (isHorizontal.value) {
    const singleStep = realSingleStopWidth.value
    if (singleStep > 0 && singleStep % s > 0) {
      console.warn('CxSeamlessScroll: step 需是单步大小的约数')
    }
  } else {
    const singleStep = realSingleStopHeight.value
    if (singleStep > 0 && singleStep % s > 0) {
      console.warn('CxSeamlessScroll: step 需是单步大小的约数')
    }
  }
  return s
})

// ============================================================
// 动画控制
// ============================================================

function scrollCancle() {
  if (reqFrame !== null) {
    cancelAnimationFrame(reqFrame)
    reqFrame = null
  }
}

function scrollMove() {
  if (isHover) return

  reqFrame = requestAnimationFrame(() => {
    const h = realBoxHeight.value / 2
    const w = realBoxWidth.value / 2
    const { direction, waitTime } = options.value

    if (direction === 'top') {
      if (Math.abs(yPos.value) >= h) {
        emit('scrollEnd')
        yPos.value = 0
      }
      yPos.value -= step.value
    } else if (direction === 'bottom') {
      if (yPos.value >= 0) {
        emit('scrollEnd')
        yPos.value = h * -1
      }
      yPos.value += step.value
    } else if (direction === 'left') {
      if (Math.abs(xPos.value) >= w) {
        emit('scrollEnd')
        xPos.value = 0
      }
      xPos.value -= step.value
    } else if (direction === 'right') {
      if (xPos.value >= 0) {
        emit('scrollEnd')
        xPos.value = w * -1
      }
      xPos.value += step.value
    }

    if (singleWaitTime) clearTimeout(singleWaitTime)

    if (realSingleStopHeight.value) {
      if (Math.abs(yPos.value) % realSingleStopHeight.value < step.value) {
        singleWaitTime = setTimeout(() => scrollMove(), waitTime)
      } else {
        scrollMove()
      }
    } else if (realSingleStopWidth.value) {
      if (Math.abs(xPos.value) % realSingleStopWidth.value < step.value) {
        singleWaitTime = setTimeout(() => scrollMove(), waitTime)
      } else {
        scrollMove()
      }
    } else {
      scrollMove()
    }
  })
}

function scrollInitMove() {
  nextTick(() => {
    const wrapEl = wrap.value
    const slotListEl = slotList.value
    const realBoxEl = realBox.value
    if (!wrapEl || !slotListEl || !realBoxEl) return

    copyHtml.value = ''

    if (isHorizontal.value) {
      height.value = wrapEl.offsetHeight
      width.value = wrapEl.offsetWidth
      let slotListWidth = slotListEl.offsetWidth
      if (autoPlay.value) {
        slotListWidth = slotListWidth * 2 + 1
      }
      realBoxEl.style.width = slotListWidth + 'px'
      realBoxWidth.value = slotListWidth
    }

    if (autoPlay.value) {
      ease = 'ease-in'
      delay.value = 0
    } else {
      ease = 'linear'
      delay.value = options.value.switchDelay || 400
      return
    }

    if (scrollSwitch.value) {
      copyHtml.value = slotListEl.innerHTML
      setTimeout(() => {
        if (realBoxEl) {
          realBoxHeight.value = realBoxEl.offsetHeight
        }
        scrollMove()
      }, 0)
    } else {
      scrollCancle()
      yPos.value = 0
      xPos.value = 0
    }
  })
}

function scrollStartMove() {
  isHover = false
  scrollMove()
}

function scrollStopMove() {
  isHover = true
  if (singleWaitTime) clearTimeout(singleWaitTime)
  scrollCancle()
}

// ============================================================
// 切换按钮
// ============================================================

function leftSwitchClick() {
  if (!leftSwitchState.value) return
  if (Math.abs(xPos.value) < (options.value.switchSingleStep || 134)) {
    xPos.value = 0
    return
  }
  xPos.value += options.value.switchSingleStep || 134
}

function rightSwitchClick() {
  if (!rightSwitchState.value) return
  if (realBoxWidth.value - width.value + xPos.value < (options.value.switchSingleStep || 134)) {
    xPos.value = width.value - realBoxWidth.value
    return
  }
  xPos.value -= options.value.switchSingleStep || 134
}

// ============================================================
// 鼠标事件
// ============================================================

function onMouseEnter() {
  if (hoverStopSwitch.value) scrollStopMove()
}

function onMouseLeave() {
  if (hoverStopSwitch.value) scrollStartMove()
}

// ============================================================
// 触摸事件
// ============================================================

function onTouchStart(e: TouchEvent) {
  if (!canTouchScroll.value) return

  const touch = e.targetTouches[0]
  startPos = { x: touch.pageX, y: touch.pageY }
  startPosY = yPos.value
  startPosX = xPos.value

  const { singleHeight, singleWidth } = options.value
  if (singleHeight && singleWidth && singleHeight > 0 && singleWidth > 0) {
    setTimeout(() => scrollCancle(), (options.value.waitTime || 1000) + 20)
  } else {
    scrollCancle()
  }
}

function onTouchMove(e: TouchEvent) {
  if (!canTouchScroll.value || e.targetTouches.length > 1 || (e.scale && e.scale !== 1)) return
  if (!startPos || startPosX === null || startPosY === null) return

  const touch = e.targetTouches[0]
  const direction = options.value.direction
  const endPos = { x: touch.pageX - startPos.x, y: touch.pageY - startPos.y }

  e.preventDefault()

  const dir = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0

  if ((dir === 1 && direction === 'bottom') || (dir === 1 && direction === 'top')) {
    yPos.value = startPosY + endPos.y
  } else if ((dir === 0 && direction === 'left') || (dir === 0 && direction === 'right')) {
    xPos.value = startPosX + endPos.x
  }
}

function onTouchEnd() {
  if (!canTouchScroll.value) return

  delay.value = 50
  const direction = options.value.direction

  if (direction === 'top') {
    if (yPos.value > 0) yPos.value = 0
  } else if (direction === 'bottom') {
    const h = (realBoxHeight.value / 2) * -1
    if (yPos.value < h) yPos.value = h
  } else if (direction === 'left') {
    if (xPos.value > 0) xPos.value = 0
  } else if (direction === 'right') {
    const w = realBoxWidth.value * -1
    if (xPos.value < w) xPos.value = w
  }

  setTimeout(() => {
    delay.value = 0
    scrollMove()
  }, delay.value)
}

// ============================================================
// 暴露
// ============================================================

function reset() {
  xPos.value = 0
  yPos.value = 0
  scrollCancle()
  scrollInitMove()
}

defineExpose({ reset })

// ============================================================
// 生命周期
// ============================================================

tryOnMounted(() => {
  scrollInitMove()
})

tryOnUnmounted(() => {
  scrollCancle()
  if (singleWaitTime) clearTimeout(singleWaitTime)
})
</script>

<style scoped lang="scss">
.cx-seamless-scroll {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  &__switch {
    z-index: 10;
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__content {
    width: 100%;
  }

  &__list {
    overflow: hidden;
  }
}
</style>
