<template>
  <div class="cx-button-radio-example-basic">
    <h3>筛选切换</h3>
    <CxButtonRadio v-model="status" :options="options" />
    <p class="cx-button-radio-example-basic__value">当前筛选: {{ status || '全部' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxButtonRadio from '../CxButtonRadio.vue'

defineOptions({ name: 'CxButtonRadioExampleBasic' })

const status = ref<string | number>('')

const options = [
  { label: '全部', value: '' },
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]
</script>

<style scoped lang="scss">
.cx-button-radio-example-basic {
  &__value {
    margin-top: 12px;
    color: #909399;
    font-size: 13px;
  }
}
</style>
