# CxEmpty

## 设计意图
统一的中后台空状态占位组件，提供默认 SVG 插画、自定义描述文本和操作区。

## 功能边界
- 支持：内置空状态 SVG 插画、自定义 image 插槽、描述文本、底部操作区
- 不支持：无数据时自动触发请求（由外部控制）

## 依赖
- Element Plus `el-empty`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| description | `string` | `'暂无数据'` | 否 | 描述文本 |
| imageSize | `number` | `120` | 否 | 图片大小（px） |

### Slots
| 插槽名 | 说明 |
|---|---|
| default | 自定义底部操作区 |
| image | 自定义图片 |
| description | 自定义描述区 |
