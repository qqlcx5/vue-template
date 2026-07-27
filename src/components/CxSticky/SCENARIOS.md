## 典型场景
- 表格表头或搜索栏吸附在页面顶部
- Tab 栏滚动时固定
- 侧边栏目录跟随

## 不适用场景
- 元素需要同时 sticky + fixed 切换
- IE 兼容要求高的场景

## 示例

### 1. 搜索栏吸附
```vue
<template>
  <div class="page">
    <div style="height: 120vh; background: #f5f5f5" />
    <CxSticky :offsetTop="0">
      <CxSearch :schema="schema" @search="onSearch" />
    </CxSticky>
    <CxTable :data="tableData" :columns="columns" />
  </div>
</template>
```
说明：搜索栏在页面滚动后会吸附在顶部，始终可见。
