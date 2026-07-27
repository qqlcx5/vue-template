# CxBarcode

## 设计意图

CxBarcode 是基于 JsBarcode 库封装的条形码生成组件。支持以 Canvas、SVG 或 Img 三种标签渲染条形码，可自定义条码格式、线宽、高度、颜色等配置项。适用于订单编号、资产编号等场景的条形码生成与展示。

## 功能边界

- **支持**：生成 CODE128 / EAN-13 / UPC / ITF / MSI 等 JsBarcode 支持的全部条码格式；动态切换渲染标签类型（canvas / svg / img）；`text`、`type`、`options` 响应式变化自动重新渲染。
- **不支持**：二维码（QR Code）生成（JsBarcode 仅支持一维条形码）；条形码扫描识别；打印排版。

## 依赖

- **jsbarcode**：核心条形码渲染库，需安装 `jsbarcode` 包。

## 完整 API

### Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `tag` | `'canvas' \| 'svg' \| 'img'` | `'canvas'` | 否 | 条形码渲染的 HTML 标签类型 |
| `text` | `string` | `''` | 否 | 条形码编码内容（如 `"6901234567890"`），为空时不渲染 |
| `type` | `string` | `'CODE128'` | 否 | 条形码格式。等同于 `options.format`，但优先级更高。支持 CODE128、EAN-13、UPC、ITF、MSI 等 |
| `options` | `JsBarcodeOptions` | `{}` | 否 | JsBarcode 配置项，详见 [JsBarcode Wiki](https://github.com/lindell/JsBarcode/wiki/Options)。如 `lineColor`、`width`、`height`、`displayValue` 等 |

> **type 与 options.format 冲突时**：`type` 会覆盖 `options.format`。源码逻辑为 `{ ...options, format: type }`。

### Emits

无。

### Slots

无。

### Expose

无。
