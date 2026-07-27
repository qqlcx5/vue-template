# CxTooltip

## 设计意图
文本溢出自动显示 Tooltip 的智能提示组件，组合 Element Plus el-tooltip 与 CxIcon，解决表格列、列表项等场景的省略号悬浮显示。

## 功能边界
- 支持：溢出自动检测显示、手动触发、自定义 placement、内容插槽
- 不支持：富文本内容提示（应直接用 el-popover）

## 依赖
- Element Plus `el-tooltip`
- CxIcon

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| content | `string` | `''` | 否 | 提示内容 |
| placement | `string` | `'top'` | 否 | 提示位置 |
| showAfter | `number` | `200` | 否 | 延迟显示（ms） |
| hideAfter | `number` | `0` | 否 | 延迟隐藏（ms） |
| maxWidth | `string \| number` | `300` | 否 | 最大宽度 |
| autoOverflow | `boolean` | `true` | 否 | 自动检测溢出才显示 |

### Slots
| 插槽名 | 说明 |
|---|---|
| default | 触发元素 |
| content | 自定义提示内容 |
