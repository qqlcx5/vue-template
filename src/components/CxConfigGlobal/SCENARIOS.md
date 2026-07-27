## 典型场景
- App.vue 根部注入项目全局配置
- 多租户场景注入不同配置

## 不适用场景
- 运行时频繁变更的配置（建议用 composable + reactive state）

## 示例

### 在 App.vue 中使用
```vue
<template>
  <CxConfigGlobal :config="globalConfig">
    <router-view />
  </CxConfigGlobal>
</template>

<script setup>
const globalConfig = {
  projectName: '管理系统',
  dictApi: '/api/dict',
  uploadUrl: '/api/upload',
}
</script>
```
