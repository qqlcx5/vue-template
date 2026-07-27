## 典型场景
- 表格图片列点击放大预览
- 详情页多图查看
- 商品图片轮播预览

## 不适用场景
- 单图不需要缩略图列表（直接用 el-image preview-src-list）
- 图片裁剪/编辑

## 示例

### 1. 程序化调用
```vue
<script setup lang="ts">
import { useImageViewer } from 'jp-ui'

const { show } = useImageViewer()
show(['https://example.com/1.jpg', 'https://example.com/2.jpg'], 0)
</script>
```

### 2. 组件式使用
```vue
<template>
  <CxImageViewer v-model="visible" :urlList="images" :initialIndex="0" @close="visible = false" />
</template>
```
