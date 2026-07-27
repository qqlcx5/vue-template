## 典型场景
- 详情页内容区（自动撑满剩余高度）
- 表单页（避免表单过短时底部留白）

## 不适用场景
- 内容高度超过一屏且需要滚动（正常用法，但要确保 overflow: auto）
- 不需要填满高度的普通内容区（使用 CxContentWrap）

## 示例

### 1. 详情页布局
```vue
<template>
  <div class="detail-page">
    <el-breadcrumb><!-- 面包屑 --></el-breadcrumb>
    <CxContentDetailWrap :offset="40" :loading="loading">
      <CxDescriptions :schema="detailSchema" :data="detail" />
    </CxContentDetailWrap>
  </div>
</template>
```
说明：offset 设为 40 扣除面包屑高度，剩余空间由详情容器填满。
