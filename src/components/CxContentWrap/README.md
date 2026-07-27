# CxContentWrap

## 设计意图
内容包裹容器，提供统一的背景色、内边距、圆角，是中后台页面内容区的基础布局组件。

## 功能边界
- 支持：自定义背景色、内边距、圆角、最小高度
- 不支持：响应式断点切换

## 依赖
- 无外部依赖

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| bgColor | `string` | `'#fff'` | 否 | 背景色 |
| padding | `string \| number` | `'16px'` | 否 | 内边距 |
| borderRadius | `string \| number` | `'4px'` | 否 | 圆角 |
| minHeight | `string \| number` | `'auto'` | 否 | 最小高度 |

### Slots
| 插槽名 | 说明 |
|---|---|
| default | 包裹内容 |
