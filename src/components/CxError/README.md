# CxError

## 设计意图
统一的中后台异常状态展示组件，支持 404/403/500 等常见 HTTP 错误码，提供返回/刷新操作入口。

## 功能边界
- 支持：内置 404/403/500 三种错误插画、自定义 message、返回首页/重试按钮、自定义图片 slot
- 不支持：自动重定向（由外部控制）、非 HTTP 错误类型（通用错误需自定义）

## 依赖
- Element Plus `el-result`、`el-button`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| status | `'404' \| '403' \| '500' \| 'warning' \| 'info'` | `'404'` | 否 | 错误状态码 |
| message | `string` | `''` | 否 | 自定义错误描述 |
| showBack | `boolean` | `true` | 否 | 显示返回首页按钮 |
| showRetry | `boolean` | `false` | 否 | 显示重试按钮 |
| backText | `string` | `'返回首页'` | 否 | 返回按钮文本 |
| retryText | `string` | `'重试'` | 否 | 重试按钮文本 |

### Emits
| 事件名 | 参数 | 说明 |
|---|---|---|
| back | — | 点击返回按钮 |
| retry | — | 点击重试按钮 |

### Slots
| 插槽名 | 说明 |
|---|---|
| extra | 自定义额外操作区 |
