<template>
  <div class="cx-count-to-example-countdown">
    <h3 class="cx-count-to-example-countdown__title">倒计时：startVal &gt; endVal</h3>
    <p class="cx-count-to-example-countdown__desc">
      起始值大于结束值时，自动以倒计时模式运行。
    </p>

    <div class="cx-count-to-example-countdown__list">
      <div class="cx-count-to-example-countdown__item">
        <span class="cx-count-to-example-countdown__item-label">从 100 倒计时到 0</span>
        <CxCountTo
          :start-val="100"
          :end-val="0"
          :duration="3000"
          :font-size="'32px'"
          :color="'#dc2626'"
        />
      </div>
      <div class="cx-count-to-example-countdown__item">
        <span class="cx-count-to-example-countdown__item-label">从 50 倒数到 10</span>
        <CxCountTo
          :start-val="50"
          :end-val="10"
          :duration="2000"
          :font-size="'32px'"
          :color="'#2563eb'"
        />
      </div>
      <div class="cx-count-to-example-countdown__item">
        <span class="cx-count-to-example-countdown__item-label">秒杀倒计时：9999 → 0</span>
        <CxCountTo
          :start-val="9999"
          :end-val="0"
          :duration="5000"
          :font-size="'28px'"
          :color="'#ea580c'"
          suffix=" 件"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CxCountTo from '../CxCountTo.vue'

defineOptions({
  name: 'CxCountToCountDown'
})
</script>

<style scoped lang="scss">
.cx-count-to-example-countdown {
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
    background: #fef2f2;
    border-radius: 8px;
    border: 1px solid #fecaca;
  }

  &__item-label {
    font-size: 13px;
    color: #991b1b;
  }
}
</style>
