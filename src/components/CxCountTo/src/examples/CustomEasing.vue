<template>
  <div class="cx-count-to-example-easing">
    <h3 class="cx-count-to-example-easing__title">自定义缓动函数</h3>
    <p class="cx-count-to-example-easing__desc">
      通过 easingFn prop 传入自定义缓动函数，实现不同的动画曲线效果。
    </p>

    <div class="cx-count-to-example-easing__grid">
      <!-- 默认缓动：easeOutExpo -->
      <div class="cx-count-to-example-easing__card">
        <span class="cx-count-to-example-easing__card-label">默认（easeOutExpo）</span>
        <CxCountTo :end-val="9999" :font-size="'26px'" />
      </div>

      <!-- 线性缓动 -->
      <div class="cx-count-to-example-easing__card">
        <span class="cx-count-to-example-easing__card-label">线性（匀速）</span>
        <CxCountTo
          :end-val="9999"
          :font-size="'26px'"
          :easing-fn="(t, b, c, d) => (c * t) / d + b"
          use-easing
        />
      </div>

      <!-- easeOutBounce -->
      <div class="cx-count-to-example-easing__card">
        <span class="cx-count-to-example-easing__card-label">easeOutBounce</span>
        <CxCountTo
          :end-val="9999"
          :font-size="'26px'"
          :easing-fn="easeOutBounce"
          use-easing
        />
      </div>

      <!-- 不使用缓动 -->
      <div class="cx-count-to-example-easing__card">
        <span class="cx-count-to-example-easing__card-label">不使用缓动（匀速线性）</span>
        <CxCountTo
          :end-val="9999"
          :font-size="'26px'"
          :use-easing="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CxCountTo from '../CxCountTo.vue'
import type { EasingFn } from '../types'

defineOptions({
  name: 'CxCountToCustomEasing'
})

/**
 * easeOutBounce 缓动函数
 */
function easeOutBounce(t: number, b: number, c: number, d: number): number {
  const tp = t / d
  if (tp < 1 / 2.75) {
    return c * (7.5625 * tp * tp) + b
  }
  if (tp < 2 / 2.75) {
    const t1 = tp - 1.5 / 2.75
    return c * (7.5625 * t1 * t1 + 0.75) + b
  }
  if (tp < 2.5 / 2.75) {
    const t2 = tp - 2.25 / 2.75
    return c * (7.5625 * t2 * t2 + 0.9375) + b
  }
  const t3 = tp - 2.625 / 2.75
  return c * (7.5625 * t3 * t3 + 0.984375) + b
}
</script>

<style scoped lang="scss">
.cx-count-to-example-easing {
  max-width: 700px;
  padding: 16px;

  &__title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
  }

  &__desc {
    margin: 0 0 16px;
    font-size: 13px;
    color: #909399;
    line-height: 1.6;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  &__card-label {
    font-size: 12px;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}
</style>
