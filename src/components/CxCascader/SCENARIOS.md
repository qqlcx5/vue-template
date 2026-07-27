## 典型场景
- 组织架构选择
- 商品类目选择
- 地区选择

## 不适用场景
- 树形结构需要复选框的（应使用 CxTree）
- 选项量特别大需虚拟滚动的

## 示例

### 1. 基础用法
```vue
<template>
  <CxCascader v-model="value" :options="options" placeholder="请选择分类" />
</template>
```

### 2. 多选 + 全部
```vue
<CxCascader v-model="value" :options="categories" multiple all-checked @change="onChange" />
```
