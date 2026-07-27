# CxInfotip

## 设计意图
提示信息气泡组件，内部引用 CxIcon 渲染问号图标，hover 时弹出 el-tooltip 展示帮助文案，常用于表单标签旁的说明提示。

## 功能边界
- 支持：hover 弹出提示、自定义提示内容、placement 控制、图标大小自定义
- 不支持：复杂 HTML 内容提示

## 依赖
- Element Plus `el-tooltip`
- CxIcon

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| content | `string` | `''` | 否 | 提示内容 |
| placement | `string` | `'top'` | 否 | 提示位置 |
| iconSize | `number` | `14` | 否 | 图标大小 |

### Slots
| 插槽名 | 说明 |
|---|---|
| content | 自定义提示内容 |
