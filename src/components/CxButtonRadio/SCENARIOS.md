## 典型场景
- 数据筛选切换（全部/已审核/未审核）
- 图表时间范围切换（今日/本周/本月）
- Tab 切换替代

## 不适用场景
- 选项特别多（建议用 el-select）
- 需要图标+文字的复杂按钮（用 CxSegmented）

## 示例

### 1. 状态筛选
```vue
<template>
  <CxButtonRadio v-model="status" :options="statusOptions" @change="fetchData" />
</template>

<script setup>
const statusOptions = [
  { label: '全部', value: '' },
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]
</script>
```
