<template>
  <div class="cx-col-example-slot">
    <h3 class="cx-col-example-slot__title">Slot + $attrs 透传</h3>
    <p class="cx-col-example-slot__desc">
      CxCol 支持默认插槽，并透传 $attrs 到内部 el-col（如 offset、push、pull 等）。
    </p>

    <el-row :gutter="12">
      <CxCol :value="6">
        <el-card shadow="hover" size="small">
          <template #header>卡片 1</template>
          <p>这是嵌入在 CxCol 插槽内的复杂内容。</p>
        </el-card>
      </CxCol>
      <CxCol :value="6">
        <el-card shadow="hover" size="small">
          <template #header>卡片 2</template>
          <el-tag type="success">插槽内组件</el-tag>
        </el-card>
      </CxCol>
      <CxCol :value="12">
        <el-card shadow="hover" size="small">
          <template #header>宽卡片</template>
          <el-progress :percentage="70" :stroke-width="16" striped />
        </el-card>
      </CxCol>
    </el-row>

    <!-- $attrs 透传示例：offset -->
    <el-row :gutter="12" style="margin-top: 16px">
      <CxCol :value="8" offset="4">
        <div class="cx-col-example-slot__cell--offset">
          span 8 + $attrs offset="4"（居中偏移）
        </div>
      </CxCol>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ElRow, ElCard, ElTag, ElProgress } from 'element-plus'
import CxCol from '../CxCol.vue'

defineOptions({
  name: 'CxColWithSlotContent'
})
</script>

<style scoped lang="scss">
.cx-col-example-slot {
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

  &__cell--offset {
    background: var(--el-color-success-light-9);
    border: 1px solid var(--el-color-success-light-7);
    border-radius: 4px;
    padding: 12px;
    text-align: center;
    font-size: 13px;
    color: var(--el-color-success);
  }
}
</style>
