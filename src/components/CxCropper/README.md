# CxCropper

基于 [cropperjs](https://github.com/fengyuanchen/cropperjs) 封装的 Vue 3 图片裁剪组件，提供完善的右键上下文菜单，支持上传、下载、圆形裁剪、拖拽移动、翻转、旋转和缩放等操作。

## 设计意图

- 提供开箱即用的图片裁剪体验，封装 cropperjs 的初始化与销毁生命周期
- 内置右键上下文菜单，涵盖常用裁剪操作（上传、下载、圆形/矩形切换、移动、翻转、旋转、缩放、重置）
- 通过 `cropper` 事件实时输出裁剪结果（Base64 + Blob + 裁剪信息），支持实时预览
- 支持圆形裁剪模式（如头像裁剪场景），内部使用 Canvas 合成圆形遮罩

## 功能边界

- **负责**：基于一张已有图片进行区域裁剪，输出裁剪后的 Base64、Blob 及位置尺寸信息
- **不负责**：图片上传至服务端（仅提供上传替换本地图片的能力）、裁剪结果持久化存储
- **依赖**：`cropperjs`、Element Plus（`el-upload` / `el-button` / `el-tooltip`）

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `src` | `string` | — | 图片源地址，**必填** |
| `alt` | `string` | `''` | 图片 alt 属性 |
| `circled` | `boolean` | `false` | 是否启用圆形裁剪模式 |
| `height` | `string \| number` | `'360px'` | 裁剪区域高度 |
| `realTimePreview` | `boolean` | `true` | 是否在拖动裁剪框时实时触发 `cropper` 事件 |
| `crossorigin` | `'' \| 'anonymous' \| 'use-credentials'` | `undefined` | 图片 crossorigin 属性 |
| `imageStyle` | `Record<string, any>` | `{}` | 图片容器自定义样式 |
| `options` | `Cropper.Options` | `{}` | cropperjs 额外配置，会与默认配置合并 |

### Emits

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `cropper` | `(result: CxCropperResult)` | 裁剪结果变化时触发，包含 `base64`、`blob`、`info` |
| `readied` | `(cropperInstance: Cropper)` | cropperjs 实例初始化完成时触发 |
| `error` | `()` | 裁剪过程中出错时触发 |

### CxCropperResult

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `base64` | `string` | 裁剪后图片的 Base64 字符串 |
| `blob` | `Blob` | 裁剪后图片的 Blob 对象 |
| `info.size` | `number` | Blob 文件大小（字节） |
| `info.x` | `number` | 裁剪框左上角 X 坐标 |
| `info.y` | `number` | 裁剪框左上角 Y 坐标 |
| `info.width` | `number` | 裁剪框宽度 |
| `info.height` | `number` | 裁剪框高度 |
| `info.rotate` | `number` | 旋转角度 |
| `info.scaleX` | `number` | 水平缩放系数 |
| `info.scaleY` | `number` | 垂直缩放系数 |

### Slots

无。

### Expose

无。
