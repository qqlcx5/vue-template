<template>
  <div class="cx-cascader-example-basic">
    <h3>基础级联选择</h3>
    <CxCascader v-model="value" :options="options" placeholder="请选择分类" />
    <p class="cx-cascader-example-basic__value">已选: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxCascader from '../CxCascader.vue'

defineOptions({ name: 'CxCascaderExampleBasic' })

const value = ref<(string | number)[]>([])

const options = [
  {
    value: 'guide',
    label: '指南',
    children: [
      { value: 'design', label: '设计规范' },
      { value: 'dev', label: '开发指南' },
    ],
  },
  {
    value: 'resource',
    label: '资源',
    children: [
      { value: 'icons', label: '图标' },
      { value: 'templates', label: '模板' },
    ],
  },
]
</script>

<style scoped lang="scss">
.cx-cascader-example-basic {
  &__value {
    margin-top: 12px;
    color: #909399;
    font-size: 13px;
  }
}
</style>
