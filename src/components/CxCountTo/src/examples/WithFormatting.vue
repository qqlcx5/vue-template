<template>
  <div class="cx-count-to-example-format">
    <h3 class="cx-count-to-example-format__title">格式化：千分位 / 前缀 / 后缀 / 小数</h3>
    <p class="cx-count-to-example-format__desc">
      综合演示 prefix、suffix、separator、decimal、decimals 等格式化参数。
    </p>

    <div class="cx-count-to-example-format__list">
      <!-- 千分位分隔 + 前缀 -->
      <div class="cx-count-to-example-format__item">
        <span class="cx-count-to-example-format__item-label">金额（前缀 + 千分位 + 2 位小数）</span>
        <CxCountTo
          prefix="$"
          :end-val="1288888.56"
          :decimals="2"
          separator=","
          :font-size="'28px'"
        />
      </div>

      <!-- 百分比后缀 -->
      <div class="cx-count-to-example-format__item">
        <span class="cx-count-to-example-format__item-label">百分比（后缀）</span>
        <CxCountTo
          :end-val="99"
          suffix="%"
          :font-size="'28px'"
          :color="'#16a34a'"
        />
      </div>

      <!-- 自定义小数点符号 -->
      <div class="cx-count-to-example-format__item">
        <span class="cx-count-to-example-format__item-label">自定义小数点符号</span>
        <CxCountTo
          :end-val="314.159"
          :decimals="3"
          decimal="·"
          :font-size="'28px'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CxCountTo from '../CxCountTo.vue'

defineOptions({
  name: 'CxCountToWithFormatting'
})
</script>

<style scoped lang="scss">
.cx-count-to-example-format {
  max-width: 600px;
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

  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  &__item-label {
    font-size: 13px;
    color: #6b7280;
  }
}
</style>
