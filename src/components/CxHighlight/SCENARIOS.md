## 典型场景
- 搜索结果列表 — 标题和摘要高亮展示搜索词
- 代码 diff 对比
- 全文搜索命中标记

## 不适用场景
- 需要同时高亮+tooltip 提示（需外层再包 CxTooltip）

## 示例

### 1. 搜索结果高亮
```vue
<template>
  <CxHighlight :text="item.title" :keywords="searchKey" />
</template>
```
