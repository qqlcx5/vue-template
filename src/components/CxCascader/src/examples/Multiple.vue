<template>
  <div class="cx-cascader-example-multiple">
    <h3>多选 + 全部</h3>
    <CxCascader v-model="value" :options="options" multiple all-checked all-checked-label="全部分类" />
    <p class="cx-cascader-example-multiple__value">已选: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxCascader from '../CxCascader.vue'

defineOptions({ name: 'CxCascaderExampleMultiple' })

const value = ref<any[]>([])

const options = [
  {
    value: 'frontend',
    label: '前端',
    children: [
      { value: 'vue', label: 'Vue' },
      { value: 'react', label: 'React' },
    ],
  },
  {
    value: 'backend',
    label: '后端',
    children: [
      { value: 'java', label: 'Java' },
      { value: 'python', label: 'Python' },
    ],
  },
]
</script>

<style scoped lang="scss">
.cx-cascader-example-multiple {
  &__value {
    margin-top: 12px;
    color: #909399;
    font-size: 13px;
  }
}
</style>
