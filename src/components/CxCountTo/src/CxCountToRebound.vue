<template>
  <div
    class="cx-count-to-rebound"
    :style="{
      '--i': i,
      '--delay': delay,
      '--blur': `${blur}px`,
      '--width': '20px',
      '--height': '36px',
      '--color': '#333'
    }"
  >
    <ul ref="ulRef" class="cx-count-to-rebound__list">
      <li class="cx-count-to-rebound__item">0</li>
      <li class="cx-count-to-rebound__item">1</li>
      <li class="cx-count-to-rebound__item">2</li>
      <li class="cx-count-to-rebound__item">3</li>
      <li class="cx-count-to-rebound__item">4</li>
      <li class="cx-count-to-rebound__item">5</li>
      <li class="cx-count-to-rebound__item">6</li>
      <li class="cx-count-to-rebound__item">7</li>
      <li class="cx-count-to-rebound__item">8</li>
      <li class="cx-count-to-rebound__item">9</li>
      <li class="cx-count-to-rebound__item">0</li>
    </ul>

    <svg width="0" height="0" class="cx-count-to-rebound__filter">
      <filter id="cx-count-to-blur">
        <feGaussianBlur in="SourceGraphic" :stdDeviation="`0 ${blur}`" />
      </filter>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import type { CxCountToReboundProps } from './types'

// ============================================================
// Options
// ============================================================

defineOptions({
  name: 'CxCountToRebound'
})

// ============================================================
// Props
// ============================================================

const props = withDefaults(defineProps<CxCountToReboundProps>(), {
  delay: 1,
  blur: 2,
  i: 0
})

// ============================================================
// 状态
// ============================================================

const ulRef = ref<HTMLElement | null>(null)
const timer = ref<ReturnType<typeof setTimeout> | null>(null)

// ============================================================
// 生命周期（Safari 兼容）
// ============================================================

onBeforeMount(() => {
  const ua = navigator.userAgent.toLowerCase()
  const testUA = (regexp: RegExp) => regexp.test(ua)
  const isSafari = testUA(/safari/g) && !testUA(/chrome/g)

  if (isSafari && ulRef.value) {
    timer.value = setTimeout(() => {
      if (ulRef.value) {
        ulRef.value.setAttribute(
          'style',
          'animation: none; transform: translateY(calc(var(--i) * -9.09%))'
        )
      }
    }, props.delay * 1000)
  }
})

onBeforeUnmount(() => {
  if (timer.value) {
    clearTimeout(timer.value)
  }
})
</script>

<style scoped lang="scss">
.cx-count-to-rebound {
  --width: v-bind('"20px"');
  --height: v-bind('"36px"');
  --color: v-bind('"#333"');

  width: var(--width);
  height: var(--height);
  color: var(--color);
  font-size: var(--height);
  line-height: var(--height);
  text-align: center;
  overflow: hidden;
  animation: cx-enhance-bounce-in-down 1s calc(var(--delay) * 1s) forwards;

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    animation:
      cx-move 0.3s linear infinite,
      cx-bounce-in-down 1s calc(var(--delay) * 1s) forwards;
  }

  &__item {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__filter {
    position: absolute;
  }
}

@keyframes cx-move {
  from {
    transform: translateY(-90%);
    filter: url('#cx-count-to-blur');
  }

  to {
    transform: translateY(1%);
    filter: url('#cx-count-to-blur');
  }
}

@keyframes cx-bounce-in-down {
  from {
    transform: translateY(calc(var(--i) * -9.09% - 7%));
    filter: none;
  }

  25% {
    transform: translateY(calc(var(--i) * -9.09% + 3%));
  }

  50% {
    transform: translateY(calc(var(--i) * -9.09% - 1%));
  }

  70% {
    transform: translateY(calc(var(--i) * -9.09% + 0.6%));
  }

  85% {
    transform: translateY(calc(var(--i) * -9.09% - 0.3%));
  }

  to {
    transform: translateY(calc(var(--i) * -9.09%));
  }
}

@keyframes cx-enhance-bounce-in-down {
  25% {
    transform: translateY(8%);
  }

  50% {
    transform: translateY(-4%);
  }

  70% {
    transform: translateY(2%);
  }

  85% {
    transform: translateY(-1%);
  }

  to {
    transform: translateY(0);
  }
}
</style>
