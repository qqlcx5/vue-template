<template>
  <div class="cx-count-to-example-color">
    <h3 class="cx-count-to-example-color__title">颜色与字体大小</h3>
    <p class="cx-count-to-example-color__desc">
      通过 color 和 fontSize prop 自定义数字动画的视觉样式。
    </p>

    <div class="cx-count-to-example-color__grid">
      <!-- 大号蓝色 -->
      <div class="cx-count-to-example-color__item">
        <CxCountTo
          :end-val="1280"
          :font-size="'48px'"
          color="#3b82f6"
        />
        <span class="cx-count-to-example-color__item-label">48px / 蓝色</span>
      </div>

      <!-- 中号红色 -->
      <div class="cx-count-to-example-color__item">
        <CxCountTo
          :end-val="56800"
          :font-size="'36px'"
          color="#ef4444"
          separator=","
        />
        <span class="cx-count-to-example-color__item-label">36px / 红色 / 千分位</span>
      </div>

      <!-- 小号绿色 -->
      <div class="cx-count-to-example-color__item cx-count-to-example-color__item--small">
        <CxCountTo
          :end-val="999"
          :font-size="'24px'"
          color="#22c55e"
        />
        <span class="cx-count-to-example-color__item-label">24px / 绿色</span>
      </div>

      <!-- 渐变特效组合 -->
      <div class="cx-count-to-example-color__item">
        <CxCountTo
          :end-val="100000"
          :font-size="'40px'"
          color="#a855f7"
          prefix="¥"
          suffix="元"
          separator=","
          :duration="2000"
        />
        <span class="cx-count-to-example-color__item-label">紫色 / ¥前缀 / 元后缀</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CxCountTo from '../CxCountTo.vue'

defineOptions({
  name: 'CxCountToColorAndFont'
})
</script>

<style scoped lang="scss">
.cx-count-to-example-color {
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
    gap: 20px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    background: #f9fafb;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    min-height: 120px;
    justify-content: center;
  }

  &__item-label {
    font-size: 12px;
    color: #9ca3af;
    text-align: center;
    margin-top: 4px;
  }
}
</style>
