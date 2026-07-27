<template>
  <div class="cx-dict-tag-example-basic">
    <h3>字典标签</h3>
    <div class="cx-dict-tag-example-basic__row">
      <span class="cx-dict-tag-example-basic__label">当前状态：</span>
      <CxDictTag :modelValue="status" :dictData="statusDict" />
    </div>
    <div class="cx-dict-tag-example-basic__row" style="margin-top: 12px">
      <span class="cx-dict-tag-example-basic__label">切换：</span>
      <el-radio-group v-model="status">
        <el-radio v-for="item in statusDict" :key="item.value" :value="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxDictTag from '../CxDictTag.vue'

defineOptions({ name: 'CxDictTagExampleBasic' })

const status = ref(1)

const statusDict = [
  { label: '启用', value: 1, type: 'success' },
  { label: '禁用', value: 0, type: 'danger' },
  { label: '待审核', value: 2, type: 'warning' },
]
</script>

<style scoped lang="scss">
.cx-dict-tag-example-basic {
  &__row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__label {
    font-size: 14px;
    color: #606266;
  }
}
</style>
