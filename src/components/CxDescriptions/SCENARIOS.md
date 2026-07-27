## 典型场景
- 详情页字段展示
- 审批流摘要信息
- 用户信息卡片

## 不适用场景
- 表单编辑（应使用 CxForm / ProForm）
- 需要树形嵌套展示的数据

## 示例

### 1. 基础 schema 驱动
```vue
<template>
  <CxDescriptions :schema="schema" :data="user" />
</template>

<script setup>
const schema = [
  { field: 'name', label: '姓名' },
  { field: 'age', label: '年龄' },
  { field: 'status', label: '状态', tag: (val) => ({ type: val === 1 ? 'success' : 'danger', text: val === 1 ? '启用' : '禁用' }) },
]
const user = { name: '张三', age: 28, status: 1 }
</script>
```
说明：通过 tag 函数返回 `{ type, text }` 即可动态渲染 el-tag。
