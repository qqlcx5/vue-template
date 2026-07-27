## 典型场景
- 列表页顶部搜索栏
- 数据筛选表单
- 报表查询条件

## 不适用场景
- 复杂表单（多级嵌套、动态字段联动，用 ProForm）
- 仅有 1-2 个搜索字段（直接用 el-form 更简洁）

## 示例

### 1. 基础搜索
```vue
<template>
  <CxSearch :schema="schema" v-model="query" @search="onSearch" @reset="onReset" />
</template>

<script setup>
const schema = [
  { field: 'name', label: '姓名', component: 'input', props: { placeholder: '请输入' } },
  { field: 'status', label: '状态', component: 'select', props: { options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] } },
]
</script>
```
