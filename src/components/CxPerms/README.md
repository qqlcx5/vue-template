---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_37ff7d8486a611f18108525400287e28
    ReservedCode1: gdJZyb6RC62hQnGvugMnU2PtuKx83nhs5Ddi54zNiPR6K/eJo+4SOnxURC6y+mSaT1zkx9igRkms0IeRGsuTXIUeQF82DcShHZ0vHhnAMVtj7NqaBa010nYRaNnTh5yjP/aXeiZHuTvp/3NWUYAurOiz0NtSqHgCfwBaubRkH0BzyLVA3Z3XIUfX4GU=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_37ff7d8486a611f18108525400287e28
    ReservedCode2: gdJZyb6RC62hQnGvugMnU2PtuKx83nhs5Ddi54zNiPR6K/eJo+4SOnxURC6y+mSaT1zkx9igRkms0IeRGsuTXIUeQF82DcShHZ0vHhnAMVtj7NqaBa010nYRaNnTh5yjP/aXeiZHuTvp/3NWUYAurOiz0NtSqHgCfwBaubRkH0BzyLVA3Z3XIUfX4GU=
---

# CxPerms 角色权限控制组件

## 设计意图

CxPerms 是一个基于 Vue Router 路由 `meta` 的角色权限守卫组件。它通过 `<slot />` 有条件地渲染子内容：仅当当前路由的 `meta.permissions`（或 `meta.roles` / `meta.auths`）包含传入的权限标识时，才渲染插槽内容。

核心定位：替代 `v-if` + 手动权限判断的模板代码，以声明式组件表达「有权限才渲染」的语义。

## 功能边界

**负责**：
- 从 `useRoute()` 获取当前路由的 `meta` 权限列表
- 按优先级 `meta.permissions > meta.roles > meta.auths` 读取权限列表
- 支持单个权限标识（`string`）和多个权限标识（`string[]`，需全部满足）
- `meta` 中权限列表为空时默认放行（渲染）
- `meta` 中权限为 `['*:*:*']` 时视为超级管理员，全部放行
- `value` 为空时不渲染

**不负责**：
- 不管理权限数据本身（权限列表由路由配置的 `meta` 提供）
- 不做登录态验证或 Token 校验
- 不做按钮级权限控制（需配合其他方案）

## 依赖

| 包名 | 用途 |
|---|---|
| `vue-router` | 通过 `useRoute()` 读取当前路由 `meta` |

## API

### Props

| 名称 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `value` | `string \| string[]` | 否 | `[]` | 角色权限标识。数组时需**全部满足**才渲染；空值时不渲染 |

### Emits

无。

### Expose

无。

### Slots

| 名称 | 作用域 | 说明 |
|---|---|---|
| `default` | — | 有权限时渲染的内容 |
