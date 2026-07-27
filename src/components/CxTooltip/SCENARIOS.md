## 典型场景
- 表格列省略号悬浮显示完整内容
- 列表标题溢出自动提示
- 标签文字过长时 hover 展示

## 不适用场景
- 需要复杂交互的弹出（应使用 el-popover）
- 确认操作提示（应使用 el-popconfirm）

## 示例

### 1. 溢出自动显示
```vue
<template>
  <CxTooltip content="这是一段很长很长很长很长很长很长很长很长很长很长的文本">
    <span class="ellipsis">这是一段很长很长很长很长...</span>
  </CxTooltip>
</template>
```
说明：`autoOverflow` 为 true 时，仅当文本真实溢出才弹出 Tooltip。

### 2. 手动触发表格列提示
```vue
<CxTable :columns="columns" :data="data">
  <template #name="{ row }">
    <CxTooltip :content="row.name">
      <span class="ellipsis">{{ row.name }}</span>
    </CxTooltip>
  </template>
</CxTable>
```
