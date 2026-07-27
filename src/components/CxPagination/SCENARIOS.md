## 典型场景
- 列表页面底部分页导航
- 表格数据切换页码和每页条数

## 不适用场景
- 纯前端全量数据分页（前端需要自行切片，本组件只负责交互）
- 无限滚动加载（应使用 v-infinite-scroll 等方案）

## 示例

### 1. 基础用法
```vue
<template>
  <div class="cx-pagination-example-basic">
    <h3>基础分页</h3>
    <CxPagination v-model="page" v-model:pageSize="pageSize" :total="100" />
    <p>当前第 {{ page }} 页，每页 {{ pageSize }} 条</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxPagination from '../CxPagination.vue'

defineOptions({ name: 'CxPaginationExampleBasic' })

const page = ref(1)
const pageSize = ref(10)
</script>
```
说明：通过双 v-model 绑定页码和每页条数，组件内部触发 change 事件时同步更新。

### 2. 小型分页
```vue
<template>
  <div class="cx-pagination-example-small">
    <h3>小型分页（适合弹窗/卡片内）</h3>
    <CxPagination v-model="page" :pageSize="10" :total="50" small />
  </div>
</template>
```

### 3. 自定义布局
通过 `layout` prop 可自由组合 total、sizes、prev、pager、next、jumper 模块。
