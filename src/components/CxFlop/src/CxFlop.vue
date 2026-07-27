<template>
  <div class="cx-flop">
    <CxFlipper ref="flipperHour1" />
    <CxFlipper ref="flipperHour2" />
    <em>:</em>
    <CxFlipper ref="flipperMinute1" />
    <CxFlipper ref="flipperMinute2" />
    <em>:</em>
    <CxFlipper ref="flipperSecond1" />
    <CxFlipper ref="flipperSecond2" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import CxFlipper from './CxFlipper.vue'

defineOptions({
  name: 'CxFlop'
})

const timer = ref<ReturnType<typeof setInterval> | null>(null)

const flipperHour1 = ref<InstanceType<typeof CxFlipper> | null>(null)
const flipperHour2 = ref<InstanceType<typeof CxFlipper> | null>(null)
const flipperMinute1 = ref<InstanceType<typeof CxFlipper> | null>(null)
const flipperMinute2 = ref<InstanceType<typeof CxFlipper> | null>(null)
const flipperSecond1 = ref<InstanceType<typeof CxFlipper> | null>(null)
const flipperSecond2 = ref<InstanceType<typeof CxFlipper> | null>(null)

function getFlipObjs() {
  return [
    flipperHour1.value,
    flipperHour2.value,
    flipperMinute1.value,
    flipperMinute2.value,
    flipperSecond1.value,
    flipperSecond2.value
  ]
}

function init() {
  const nowTimeStr = dayjs().format('HHmmss')
  const flipObjs = getFlipObjs()
  for (let i = 0; i < flipObjs.length; i++) {
    flipObjs[i]?.setFront(Number(nowTimeStr[i]))
  }
}

function run() {
  timer.value = setInterval(() => {
    const nowTimeStr = dayjs().subtract(1, 'second').format('HHmmss')
    const nextTimeStr = dayjs().format('HHmmss')
    const flipObjs = getFlipObjs()
    for (let i = 0; i < flipObjs.length; i++) {
      if (nowTimeStr[i] === nextTimeStr[i]) continue
      flipObjs[i]?.flipDown(Number(nowTimeStr[i]), Number(nextTimeStr[i]))
    }
  }, 1000)
}

onMounted(() => {
  init()
  run()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>

<style scoped lang="scss">
.cx-flop {
  .cx-flipper {
    margin: 0 3px;
  }

  em {
    display: inline-block;
    font-size: 66px;
    font-style: normal;
    line-height: 102px;
    vertical-align: top;
  }
}
</style>
