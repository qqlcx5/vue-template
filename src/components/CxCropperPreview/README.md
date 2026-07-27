# CxCropperPreview

基于 `CxCropper` 的图片裁剪预览组件。在裁剪区域的右侧弹出浮层（Popover），实时展示圆形裁剪后的头像预览效果及图片信息。

## 设计意图

- 将"CxCropper 圆形裁剪 + 头像预览"场景封装为独立组件，减少重复组装
- 通过 Element Plus 的 Popover 提供裁剪预览浮层，直观展示裁剪效果
- 内置图片尺寸和文件大小的格式化展示

## 功能边界

- **负责**：以圆形裁剪方式裁剪图片，并在右侧 Popover 中实时预览结果及元信息
- **不负责**：非圆形裁剪场景（CxCropperPreview 内部固定使用 `circled` 模式）、自定义裁剪区域尺寸
- **依赖**：`CxCropper`、Element Plus（`el-popover` / `el-image`）

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `imgSrc` | `string` | — | 图片源地址 |

### Emits

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `cropper` | `(result: { base64: string; blob: Blob; info: any })` | 裁剪结果变化时触发，透传 `CxCropper` 的 `cropper` 事件 |

### Slots

无。

### Expose

| 方法 | 说明 |
| --- | --- |
| `hidePopover()` | 手动关闭预览 Popover |
