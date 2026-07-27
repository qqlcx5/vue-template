## 典型场景
- 状态列展示（启用/禁用、已审核/未审核）
- 类型列展示（菜单类型、用户类型）
- 业务枚举标签

## 不适用场景
- 字典数据是异步加载且加载中需要 loading 骨架（由外部控制）
- 需要点击交互的标签（使用 el-tag 直接写）

## 示例

### 1. 表格状态列
```vue
<CxTable :columns="columns" :data="tableData">
  <template #status="{ row }">
    <CxDictTag :modelValue="row.status" :dictData="statusDict" />
  </template>
</CxTable>

<script setup>
const statusDict = [
  { label: '启用', value: 1, type: 'success' },
  { label: '禁用', value: 0, type: 'danger' },
]
</script>
```
