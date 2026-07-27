# CxIFrame

## 设计意图
iframe 容器组件，提供 loading 骨架屏、自适应高度、安全 sandbox 属性，适配中后台嵌入第三方页面。

## 功能边界
- 支持：loading 状态、自适应高度（postMessage 通信）、sandbox 安全属性、URL 切换
- 不支持：跨域 iframe 高度自适应（需 postMessage 配合）、父子窗口频繁交互

## 依赖
- 无外部依赖

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| src | `string` | `''` | 否 | iframe URL |
| autoHeight | `boolean` | `false` | 否 | 自适应高度（需子页面 postMessage） |
| sandbox | `string` | `''` | 否 | sandbox 属性 |
| loading | `boolean` | `false` | 否 | 外部控制加载状态 |
| showLoading | `boolean` | `true` | 否 | 加载时显示骨架 |

### Emits
| 事件名 | 参数 | 说明 |
|---|---|---|
| load | — | 加载完成 |
| error | — | 加载失败 |
