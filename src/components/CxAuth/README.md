# CxAuth

## 设计意图

CxAuth 是基于 Vue Router `meta.auths` 的声明式权限控制组件。将需要权限控制的内容包裹在 `<CxAuth>` 插槽中，组件会根据当前路由元信息 `meta.auths` 与传入的 `value` 权限标识做匹配，自动决定是否渲染插槽内容。

## 功能边界

- **支持**：单个权限标识匹配；多个权限标识"全部满足"匹配；路由未配置 `auths` 时默认放行。
- **不支持**："任一满足"模式（仅支持 ALL 逻辑）；异步权限校验；脱离 vue-router 的权限控制场景。

## 依赖

- **Vue Router**：通过 `useRoute()` 获取当前路由的 `meta.auths` 字段。

## 完整 API

### Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `value` | `string \| string[]` | `[]` | 否 | 权限标识。单个字符串需在 `meta.auths` 中存在；数组时需全部存在才渲染 |

### Emits

无。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 有权限时渲染的内容区域 |

### Expose

无。

## 权限判断逻辑

1. 若 `value` 为空 → **拒绝渲染**
2. 若路由 `meta.auths` 未定义或为空数组 → **默认放行**
3. 若 `value` 为字符串 → 该字符串存在于 `meta.auths` 中则放行
4. 若 `value` 为数组 → 所有元素都存在于 `meta.auths` 中则放行（ALL 逻辑）
