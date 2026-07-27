## 典型场景
- 列表页数据表格
- 可多选批量操作表格
- 需要分页的查询结果

## 不适用场景
- 仅 3-5 行无分页需求（直接用 el-table）
- 高度定制化的复杂表格（如合并单元格）

## 示例

### 1. Schema 驱动 + 分页
```vue
<template>
  <CxTable :columns="columns" :data="tableData" :pagination="{ total: 100, pageSize: 20 }" @pageChange="onPageChange" />
</template>

<script setup>
const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'status', label: '状态', type: 'tag', tagMap: { 1: { type: 'success', text: '启用' }, 0: { type: 'danger', text: '禁用' } } },
]
</script>
```

### 2. 工具栏
```vue
<CxTable :columns="columns" :data="data" show-toolbar :toolbar="['refresh', 'column', 'export']" />
```
