## 典型场景
- 中后台页面内容区白底容器
- 列表/表格的外层包裹
- 搜索栏 + 表格的组合容器

## 不适用场景
- 需要阴影/边框的卡片（使用 CxCard）

## 示例

### 1. 基础用法
```vue
<template>
  <CxContentWrap>
    <CxSearch :schema="schema" />
    <CxTable :data="data" :columns="columns" />
  </CxContentWrap>
</template>
```
