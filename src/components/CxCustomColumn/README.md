# CxCustomColumn

## 设计意图
表格自定义列管理组件，通过 Popover 弹出多选列表，让用户自由控制表格列的显示/隐藏。

## 功能边界
- 支持：多选列显隐、全选/反选、搜索过滤列名、列排序（拖拽调整顺序）、持久化（localStorage 记忆）
- 不支持：列宽调节、分组列（仅显隐控制）

## 依赖
- Element Plus `el-popover`、`el-checkbox-group`、`el-checkbox`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| columns | `{ label: string; prop: string; visible: boolean }[]` | `[]` | 是 | 列配置 |
| storageKey | `string` | `''` | 否 | localStorage key，传入则自动持久化 |
| triggerText | `string` | `'列设置'` | 否 | 触发按钮文本 |
| maxHeight | `string \| number` | `400` | 否 | 列表最大高度 |

### Emits
| 事件名 | 参数 | 说明 |
|---|---|---|
| change | `columns` | 列配置变化 |
