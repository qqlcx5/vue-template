## 典型场景
- CxTable 工具栏列显隐控制
- 报表自定义字段展示

## 不适用场景
- 列拖拽排序（需额外实现，本组件专注于显隐）

## 示例

### 集成 CxTable
```vue
<template>
  <div>
    <CxCustomColumn v-model="columns" storage-key="user-table-columns" @change="onColumnChange" />
    <CxTable :columns="visibleColumns" :data="tableData" />
  </div>
</template>

<script setup>
const columns = ref([
  { label: '姓名', prop: 'name', visible: true },
  { label: '年龄', prop: 'age', visible: true },
  { label: '邮箱', prop: 'email', visible: false },
])

const visibleColumns = computed(() => columns.value.filter(c => c.visible))
</script>
```
