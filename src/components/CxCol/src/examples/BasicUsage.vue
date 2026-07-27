<template>
  <div class="cx-col-example-basic">
    <h3 class="cx-col-example-basic__title">基础用法：栅格占位</h3>
    <p class="cx-col-example-basic__desc">
      value prop 会同时应用于 xs / sm / md / lg / xl 全部断点。
    </p>

    <el-row :gutter="12">
      <CxCol :value="6">
        <div class="cx-col-example-basic__cell">span 6</div>
      </CxCol>
      <CxCol :value="6">
        <div class="cx-col-example-basic__cell">span 6</div>
      </CxCol>
      <CxCol :value="6">
        <div class="cx-col-example-basic__cell">span 6</div>
      </CxCol>
      <CxCol :value="6">
        <div class="cx-col-example-basic__cell">span 6</div>
      </CxCol>
    </el-row>

    <el-row :gutter="12" style="margin-top: 16px">
      <CxCol :value="8">
        <div class="cx-col-example-basic__cell cx-col-example-basic__cell--alt">span 8</div>
      </CxCol>
      <CxCol :value="16">
        <div class="cx-col-example-basic__cell cx-col-example-basic__cell--alt">span 16</div>
      </CxCol>
    </el-row>

    <el-row :gutter="12" style="margin-top: 16px">
      <CxCol :value="24">
        <div class="cx-col-example-basic__cell cx-col-example-basic__cell--full">
          满宽 span 24（默认值）
        </div>
      </CxCol>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ElRow } from 'element-plus'
import CxCol from '../CxCol.vue'

defineOptions({
  name: 'CxColBasicUsage'
})
</script>

<style scoped lang="scss">
.cx-col-example-basic {
  max-width: 800px;
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
    background: var(--el-color-primary-light-9);
    border: 1px solid var(--el-color-primary-light-7);
    border-radius: 4px;
    padding: 12px 0;
    text-align: center;
    font-size: 13px;
    color: var(--el-color-primary);

    &--alt {
      background: var(--el-color-success-light-9);
      border-color: var(--el-color-success-light-7);
      color: var(--el-color-success);
    }

    &--full {
      background: var(--el-color-warning-light-9);
      border-color: var(--el-color-warning-light-7);
      color: var(--el-color-warning);
    }
  }
}
</style>
