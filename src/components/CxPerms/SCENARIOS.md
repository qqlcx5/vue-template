---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_38ba8a7d86a611f18766525400f8a581
    ReservedCode1: s7OvGIr8xjiTiJdQBEptCw7jv6s/O3AUiWA4qBOMu0gRGS20ryGMtwOiniTUMCIPCV5G9ezxn0zR/pE9acnurEwBJZUYhBWBN6gT50G/cHR3QoRMDg01FSCC+UliwgwyWEoYa2O3Bd5rJy1hzy6YNePRU8jkzjL3CVUZH5sG7+G4b6XFt3NhTsfnNBE=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_38ba8a7d86a611f18766525400f8a581
    ReservedCode2: s7OvGIr8xjiTiJdQBEptCw7jv6s/O3AUiWA4qBOMu0gRGS20ryGMtwOiniTUMCIPCV5G9ezxn0zR/pE9acnurEwBJZUYhBWBN6gT50G/cHR3QoRMDg01FSCC+UliwgwyWEoYa2O3Bd5rJy1hzy6YNePRU8jkzjL3CVUZH5sG7+G4b6XFt3NhTsfnNBE=
---

# CxPerms 场景说明

## 典型场景

1. 按角色控制页面模块的可见性（如「管理员」才显示数据导出按钮）
2. 通过路由 `meta.permissions` 统一管理权限，CxPerms 做守卫渲染
3. 多权限组合判断：需要同时拥有多个权限才显示某功能

## 不适用场景

- 需要动态权限数据源（CxPerms 只读路由 `meta`，不支持传入自定义权限列表）
- 按钮级细粒度权限（可配合其他方案，CxPerms 本身不做按钮级区分）
- 未使用 vue-router 的项目

---

## Props 示例

### value 为单个字符串

路由配置：
```ts
// router.ts
{
  path: '/admin',
  meta: { permissions: ['admin', 'editor'] }
}
```

```vue
<template>
  <CxPerms value="admin">
    <el-button type="danger">删除用户</el-button>
  </CxPerms>
</template>
```

当前路由 `meta.permissions` 包含 `'admin'` → 渲染按钮。

### value 为数组（需全部满足）

```vue
<template>
  <CxPerms :value="['user:create', 'user:delete']">
    <div class="admin-panel">用户管理面板</div>
  </CxPerms>
</template>
```

仅当当前路由 `meta.permissions` **同时**包含 `user:create` 和 `user:delete` 时渲染。

### value 为空 — 不渲染

```vue
<template>
  <!-- 不会渲染任何内容 -->
  <CxPerms :value="[]">
    <p>这段内容永远不会显示</p>
  </CxPerms>
</template>
```

---

## 路由 meta 配置示例

### 使用 meta.permissions（推荐）

```ts
const routes = [
  {
    path: '/dashboard',
    meta: { permissions: ['dashboard:view', 'chart:view'] }
  }
]
```

```vue
<template>
  <CxPerms value="dashboard:view">
    <DashboardChart />
  </CxPerms>
</template>
```

### 使用 meta.roles

```ts
const routes = [
  {
    path: '/settings',
    meta: { roles: ['admin'] }
  }
]
```

```vue
<template>
  <CxPerms value="admin">
    <SettingsPanel />
  </CxPerms>
</template>
```

### 使用 meta.auths

```ts
const routes = [
  {
    path: '/reports',
    meta: { auths: ['report:export'] }
  }
]
```

```vue
<template>
  <CxPerms value="report:export">
    <ExportButton />
  </CxPerms>
</template>
```

---

## 特殊行为示例

### 超级管理员通配符

路由配置 `meta.permissions` 为 `['*:*:*']` 时，所有 `value` 都会放行：

```ts
const routes = [
  {
    path: '/admin',
    meta: { permissions: ['*:*:*'] }
  }
]
```

```vue
<template>
  <CxPerms value="any-permission">
    <p>超级管理员永远可见</p>
  </CxPerms>
</template>
```

### 路由未配置权限 — 默认放行

```ts
const routes = [
  {
    path: '/public',
    meta: {} // 无 permissions / roles / auths
  }
]
```

```vue
<template>
  <CxPerms value="anything">
    <p>未配置权限的路由默认放行</p>
  </CxPerms>
</template>
```

---

## 复杂场景

### 嵌套使用：多模块权限分级

```vue
<template>
  <div class="page">
    <!-- 所有拥有 dashboard:view 的用户可见 -->
    <CxPerms value="dashboard:view">
      <h2>数据看板</h2>
    </CxPerms>

    <!-- 需要同时拥有 user:view 和 user:edit 才可见 -->
    <CxPerms :value="['user:view', 'user:edit']">
      <UserEditPanel />
    </CxPerms>

    <!-- 仅 admin 可见 -->
    <CxPerms value="admin">
      <SystemSettings />
    </CxPerms>
  </div>
</template>
```

### 与 v-for 结合

```vue
<script setup lang="ts">
const menuItems = [
  { label: '用户管理', perm: 'user:view' },
  { label: '系统设置', perm: 'admin' },
  { label: '日志查看', perm: 'log:view' }
]
</script>

<template>
  <template v-for="item in menuItems" :key="item.perm">
    <CxPerms :value="item.perm">
      <el-menu-item>{{ item.label }}</el-menu-item>
    </CxPerms>
  </template>
</template>
```
