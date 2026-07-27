## 典型场景
- 路由 404 页面
- 权限不足 403 拦截页
- 服务异常 500 兜底页

## 不适用场景
- 表单校验错误（应使用 ElMessage 或行内提示）
- 业务逻辑异常弹窗（应使用 CxDialog）

## 示例

### 1. 404 页面
```vue
<template>
  <CxError status="404" message="您访问的页面不存在" @back="router.push('/')" />
</template>
```

### 2. 500 服务异常（含重试）
```vue
<template>
  <CxError status="500" message="服务器开小差了" show-back show-retry @back="goHome" @retry="reload" />
</template>
```
