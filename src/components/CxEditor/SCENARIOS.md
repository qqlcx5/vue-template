## 典型场景
- 公告/通知内容编辑
- 文章/帮助中心内容编写
- 邮件模板编辑

## 不适用场景
- 纯文本输入（使用 el-input + type="textarea"）
- Markdown 编辑

## 示例

### 1. 基础用法
```vue
<template>
  <CxEditor v-model="content" placeholder="请输入公告内容" />
</template>

<script setup>
const content = ref('<p>默认内容</p>')
</script>
```
