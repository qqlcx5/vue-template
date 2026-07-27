<template>
  <div class="cx-col-example-values">
    <h3 class="cx-col-example-values__title">不同 span 值对比</h3>
    <p class="cx-col-example-values__desc">
      value 从 1 到 24，所有断点统一样式。1 为 24 的 1/24 宽度。
    </p>

    <el-row :gutter="8">
      <CxCol v-for="n in spans" :key="n" :value="n">
        <div
          class="cx-col-example-values__cell"
          :style="{ opacity: n / 24 + 0.15 }"
        >
          {{ n }}
        </div>
      </CxCol>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ElRow } from 'element-plus'
import CxCol from '../CxCol.vue'

defineOptions({
  name: 'CxColDifferentSpanValues'
})

const spans = Array.from({ length: 24 }, (_, i) => i + 1)
</script>

<style scoped lang="scss">
.cx-col-example-values {
  max-width: 900px;
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

  &__cell {
    background: var(--el-color-primary);
    border-radius: 2px;
    margin-bottom: 4px;
    padding: 4px 0;
    text-align: center;
    font-size: 11px;
    color: #fff;
  }
}
</style>
