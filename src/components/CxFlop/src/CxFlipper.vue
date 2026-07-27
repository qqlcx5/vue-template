<template>
  <div :class="['cx-flipper', flipType, { go: isFlipping }]">
    <div :class="['cx-flipper__digital', 'cx-flipper__digital--front', textClass(frontTextFromData)]" />
    <div :class="['cx-flipper__digital', 'cx-flipper__digital--back', textClass(backTextFromData)]" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'CxFlipper'
})

const props = withDefaults(
  defineProps<{
    frontText?: number
    backText?: number
    duration?: number
  }>(),
  {
    frontText: 0,
    backText: 1,
    duration: 600
  }
)

const isFlipping = ref(false)
const flipType = ref('down')
const frontTextFromData = ref(props.frontText)
const backTextFromData = ref(props.backText)

function textClass(num: number): string {
  return `cx-flipper__number${num}`
}

function flip(type: string, front: number, back: number) {
  if (isFlipping.value) return
  frontTextFromData.value = front
  backTextFromData.value = back
  flipType.value = type
  isFlipping.value = true

  setTimeout(() => {
    isFlipping.value = false
    frontTextFromData.value = back
  }, props.duration)
}

function flipDown(front: number, back: number) {
  flip('down', front, back)
}

function flipUp(front: number, back: number) {
  flip('up', front, back)
}

function setFront(text: number) {
  frontTextFromData.value = text
}

function setBack(text: number) {
  backTextFromData.value = text
}

defineExpose({
  flipDown,
  flipUp,
  setFront,
  setBack
})
</script>

<style scoped lang="scss">
.cx-flipper {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 100px;
  line-height: 100px;
  border: solid 1px #000;
  border-radius: 10px;
  background: #fff;
  font-size: 66px;
  color: #fff;
  box-shadow: 0 0 6px rgb(0 0 0 / 50%);
  text-align: center;
  font-family: 'Helvetica Neue';
}

.cx-flipper__digital {
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    background: #000;
    overflow: hidden;
    box-sizing: border-box;
  }

  &::before {
    top: 0;
    bottom: 50%;
    border-radius: 10px 10px 0 0;
    border-bottom: solid 1px #666;
  }

  &::after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    line-height: 0;
  }
}

/* 向下翻 */
.cx-flipper.down {
  .cx-flipper__digital--front::before {
    z-index: 3;
  }
  .cx-flipper__digital--back::after {
    z-index: 2;
    transform-origin: 50% 0%;
    transform: perspective(160px) rotateX(180deg);
  }
  .cx-flipper__digital--front::after,
  .cx-flipper__digital--back::before {
    z-index: 1;
  }
  &.go .cx-flipper__digital--front::before {
    transform-origin: 50% 100%;
    animation: cx-flip-front-down 0.6s ease-in-out both;
    box-shadow: 0 -2px 6px rgb(255 255 255 / 30%);
    backface-visibility: hidden;
  }
  &.go .cx-flipper__digital--back::after {
    animation: cx-flip-back-down 0.6s ease-in-out both;
  }
}

/* 向上翻 */
.cx-flipper.up {
  .cx-flipper__digital--front::after {
    z-index: 3;
  }
  .cx-flipper__digital--back::before {
    z-index: 2;
    transform-origin: 50% 100%;
    transform: perspective(160px) rotateX(-180deg);
  }
  .cx-flipper__digital--front::before,
  .cx-flipper__digital--back::after {
    z-index: 1;
  }
  &.go .cx-flipper__digital--front::after {
    transform-origin: 50% 0;
    animation: cx-flip-front-up 0.6s ease-in-out both;
    box-shadow: 0 2px 6px rgb(255 255 255 / 30%);
    backface-visibility: hidden;
  }
  &.go .cx-flipper__digital--back::before {
    animation: cx-flip-back-up 0.6s ease-in-out both;
  }
}

@keyframes cx-flip-front-down {
  0% { transform: perspective(160px) rotateX(0deg); }
  100% { transform: perspective(160px) rotateX(-180deg); }
}
@keyframes cx-flip-back-down {
  0% { transform: perspective(160px) rotateX(180deg); }
  100% { transform: perspective(160px) rotateX(0deg); }
}
@keyframes cx-flip-front-up {
  0% { transform: perspective(160px) rotateX(0deg); }
  100% { transform: perspective(160px) rotateX(180deg); }
}
@keyframes cx-flip-back-up {
  0% { transform: perspective(160px) rotateX(-180deg); }
  100% { transform: perspective(160px) rotateX(0deg); }
}

/* 数字内容 */
@for $i from 0 through 9 {
  .cx-flipper__number#{$i}::before,
  .cx-flipper__number#{$i}::after {
    content: '#{$i}';
  }
}
</style>
