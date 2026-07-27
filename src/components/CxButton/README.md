# CxButton

## 设计意图
对 Element Plus el-button 进行增强封装，支持前置/后置图标（直接集成 CxIcon）、loading 状态文字切换，统一中后台按钮交互规范。

## 功能边界
- 支持：preIcon/postIcon 图标、loading 文字、点击节流、二次确认、按钮类型/尺寸透传
- 不支持：按钮组（使用 el-button-group 包裹）、复杂 dropdown-button（使用 el-dropdown）

## 依赖
- Element Plus `el-button`
- CxIcon

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| preIcon | `string` | `''` | 否 | 前置图标名称 |
| postIcon | `string` | `''` | 否 | 后置图标名称 |
| loading | `boolean` | `false` | 否 | 加载状态 |
| loadingText | `string` | `''` | 否 | 加载中文案 |
| type | `string` | `'default'` | 否 | 按钮类型 |
| size | `string` | `'default'` | 否 | 按钮尺寸 |

### Slots
| 插槽名 | 说明 |
|---|---|
| default | 按钮内容 |
| preIcon | 自定义前置图标 |
| postIcon | 自定义后置图标 |
