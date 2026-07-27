<template>
  <span
    class="cx-count-to"
    :style="{ color, fontSize }"
  >
    {{ displayValue }}
  </span>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import type { CxCountToProps, CxCountToEmits, EasingFn } from './types'

// ============================================================
// Options
// ============================================================

defineOptions({
  name: 'CxCountTo'
})

// ============================================================
// Props & Emits
// ============================================================

const props = withDefaults(defineProps<CxCountToProps>(), {
  startVal: 0,
  endVal: 2020,
  duration: 1300,
  autoplay: true,
  decimals: 0,
  color: '',
  fontSize: '16px',
  decimal: '.',
  separator: ',',
  prefix: '',
  suffix: '',
  useEasing: true,
  easingFn: (t: number, b: number, c: number, d: number) =>
    (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
})

const emit = defineEmits<CxCountToEmits>()

// ============================================================
// 状态
// ============================================================

const displayValue = ref('')
let localStartVal = 0
let printVal: number | null = null
let paused = false
let localDuration: number | null = null
let startTime: number | null = null
let remaining: number | null = null
let rAF: number | null = null

// ============================================================
// 工具函数
// ============================================================

function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !isNaN(val)
}

function formatNumber(num: number | string): string {
  const { decimals, decimal, separator, suffix, prefix } = props
  let n = Number(num).toFixed(decimals)
  const x = n.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (separator && !isNumber(separator as unknown as number)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return prefix + x1 + x2 + suffix
}

const isCountDown = computed(() => props.startVal > props.endVal)

// ============================================================
// 动画
// ============================================================

function count(timestamp: number) {
  const { useEasing, easingFn, endVal } = props

  if (!startTime) startTime = timestamp
  const progress = timestamp - startTime
  remaining = localDuration! - progress

  if (useEasing) {
    const fn = easingFn as EasingFn
    if (isCountDown.value) {
      printVal = localStartVal - fn(progress, 0, localStartVal - endVal, localDuration!)
    } else {
      printVal = fn(progress, localStartVal, endVal - localStartVal, localDuration!)
    }
  } else {
    if (isCountDown.value) {
      printVal = localStartVal - (localStartVal - endVal) * (progress / localDuration!)
    } else {
      printVal = localStartVal + (endVal - localStartVal) * (progress / localDuration!)
    }
  }

  if (isCountDown.value) {
    printVal = (printVal as number) < endVal ? endVal : printVal
  } else {
    printVal = (printVal as number) > endVal ? endVal : printVal
  }

  displayValue.value = formatNumber(printVal as number)

  if (progress < localDuration!) {
    rAF = requestAnimationFrame(count)
  } else {
    emit('callback')
  }
}

function start() {
  const { startVal, duration } = props
  localStartVal = startVal
  startTime = null
  localDuration = duration
  paused = false
  rAF = requestAnimationFrame(count)
}

function pause() {
  if (rAF !== null) {
    cancelAnimationFrame(rAF)
    rAF = null
  }
}

function resume() {
  startTime = null
  localDuration = remaining as number
  localStartVal = printVal as number
  rAF = requestAnimationFrame(count)
}

function pauseResume() {
  if (paused) {
    resume()
    paused = false
  } else {
    pause()
    paused = true
  }
}

function reset() {
  startTime = null
  if (rAF !== null) {
    cancelAnimationFrame(rAF)
    rAF = null
  }
  displayValue.value = formatNumber(props.startVal)
}

// ============================================================
// Watch & Lifecycle
// ============================================================

watch([() => props.startVal, () => props.endVal], () => {
  if (props.autoplay) {
    start()
  }
})

onMounted(() => {
  if (props.autoplay) {
    start()
  }
  emit('mounted')
})

onUnmounted(() => {
  if (rAF !== null) {
    cancelAnimationFrame(rAF)
  }
})

// ============================================================
// 暴露
// ============================================================

defineExpose({ start, pause, resume, pauseResume, reset })
</script>

<style scoped lang="scss">
.cx-count-to {
  display: inline-block;
}
</style>
