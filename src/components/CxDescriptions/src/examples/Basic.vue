<template>
  <div class="cx-descriptions-example-basic">
    <h3>Schema 驱动描述列表</h3>
    <CxDescriptions :schema="schema" :data="user" />
  </div>
</template>

<script setup lang="ts">
import CxDescriptions from '../CxDescriptions.vue'

defineOptions({ name: 'CxDescriptionsExampleBasic' })

const user = { name: '张三', age: 28, email: 'zhangsan@example.com', status: 1 }

const schema = [
  { field: 'name', label: '姓名' },
  { field: 'age', label: '年龄' },
  { field: 'email', label: '邮箱', span: 2 },
  {
    field: 'status',
    label: '状态',
    tag: (val: number) => ({
      type: val === 1 ? 'success' : 'danger',
      text: val === 1 ? '启用' : '禁用',
    }),
  },
]
</script>
