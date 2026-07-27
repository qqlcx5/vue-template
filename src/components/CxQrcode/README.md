---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_3b13e2d686a611f18766525400f8a581
    ReservedCode1: igQSIvqjAAsLrTw2Ngyop7zgQtrMLyr5KZSxMQYtJQdAf1c/A2N1eHNYYeBW4hiVQcSmlS09Dqhht8GAizKGV+85JJ/a3gGOfCnophOncAYbP17deF43FSYLllT72wf5WGcb3b4VKfifV2RvvWJcVT8Nn4tqFuv/u41OwCBrK5/aR/3QxVUrEulM1Vc=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_3b13e2d686a611f18766525400f8a581
    ReservedCode2: igQSIvqjAAsLrTw2Ngyop7zgQtrMLyr5KZSxMQYtJQdAf1c/A2N1eHNYYeBW4hiVQcSmlS09Dqhht8GAizKGV+85JJ/a3gGOfCnophOncAYbP17deF43FSYLllT72wf5WGcb3b4VKfifV2RvvWJcVT8Nn4tqFuv/u41OwCBrK5/aR/3QxVUrEulM1Vc=
---

# CxQrcode 二维码生成组件

## 设计意图

CxQrcode 是基于 `qrcode` 库的二维码生成组件。它封装了 Canvas 和 Img 两种渲染模式，支持中心 Logo 嵌套、过期禁用遮罩、自适应纠错级别等特性，让二维码的生成和展示变得开箱即用。

核心定位：在页面中快速生成带有 Logo 的二维码（如分享链接、支付码、设备绑定码），支持禁用态（过期/失效）的视觉反馈。

## 功能边界

**负责**：
- 根据 `text` 内容生成二维码（Canvas 模式支持 Logo，Img 模式不支持 Logo）
- 自动根据内容长度选择合适的纠错级别（短内容 H 级、中等 Q 级、长内容 M 级）
- Logo 绘制（支持自定义大小、背景色、边框、圆角）
- 禁用态遮罩（过期/失效提示）
- `done` 事件返回二维码 Data URL
- 点击事件的透传（正常点击 / 禁用点击）

**不负责**：
- 不做二维码解码/识别
- 不做二维码样式自定义（颜色、形状等，需通过 `options` 传入 `qrcode` 原生配置）
- 不提供下载/保存按钮（可从 `done` 事件获取 Data URL 自行实现）

## 依赖

| 包名 | 用途 |
|---|---|
| `qrcode` | 二维码生成核心库 |

## API

### Props

| 名称 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `tag` | `'canvas' \| 'img'` | 否 | `'canvas'` | 渲染标签类型。canvas 支持 Logo，img 不支持 |
| `text` | `string \| Record<string, any>[]` | 否 | `''` | 二维码内容，最终转为字符串 |
| `options` | `QRCodeRenderersOptions` | 否 | `{}` | qrcode.js 原生配置项（errorCorrectionLevel 会被组件根据内容长度自动覆盖） |
| `width` | `number` | 否 | `200` | 二维码宽度（px） |
| `logo` | `string \| Partial<QrcodeLogo>` | 否 | `''` | Logo 配置。传字符串时作为 `src`；传对象时可细粒度控制 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用（显示过期遮罩） |
| `disabledText` | `string` | 否 | `''` | 禁用时提示文字 |

#### QrcodeLogo

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `src` | `string` | — | Logo 图片地址 |
| `logoSize` | `number` | `0.15` | Logo 大小比例（相对二维码宽度） |
| `bgColor` | `string` | `'#ffffff'` | Logo 背景色 |
| `borderSize` | `number` | `0.05` | Logo 边框大小比例 |
| `crossOrigin` | `string` | `'anonymous'` | 图片跨域属性 |
| `borderRadius` | `number` | `8` | Logo 背景圆角 |
| `logoRadius` | `number` | `0` | Logo 自身圆角 |

### Emits

| 事件名 | 参数 | 触发时机 |
|---|---|---|
| `done` | `(url: string)` | 二维码生成完成，返回 Data URL |
| `click` | 无 | 点击二维码（非禁用态） |
| `disabled-click` | 无 | 点击禁用遮罩 |

### Expose

无。

### Slots

无。
