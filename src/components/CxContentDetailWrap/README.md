# CxContentDetailWrap

## 设计意图
详情页包裹容器，自动计算并填充剩余高度，确保详情内容区域始终撑满可视空间，避免底部留白。

## 功能边界
- 支持：自动 calc 高度填充、自定义背景/内边距、loading 状态
- 不支持：多栏布局中的复杂高度计算

## 依赖
- 无外部依赖

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| bgColor | `string` | `'#fff'` | 否 | 背景色 |
| padding | `string \| number` | `'16px'` | 否 | 内边距 |
| loading | `boolean` | `false` | 否 | 加载状态 |
| offset | `number` | `0` | 否 | 额外减去的高度（px，用于减去顶部面包屑等） |

### Slots
| 插槽名 | 说明 |
|---|---|
| default | 详情内容 |
