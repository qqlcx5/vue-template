# CxImageViewer

## 设计意图
图片预览查看器，支持放大/缩小/旋转/翻页操作，并提供 `createImageViewer` 程序化调用 API，适用于列表图片点击放大预览场景。

## 功能边界
- 支持：照片墙预览、缩略图列表、放大/缩小/旋转/翻页、键盘导航、程序化调用
- 不支持：图片编辑（裁剪/标注）、视频预览

## 依赖
- Element Plus `el-image-viewer`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| modelValue | `boolean` | `false` | 否 | 是否显示（v-model） |
| urlList | `string[]` | `[]` | 否 | 图片 URL 列表 |
| initialIndex | `number` | `0` | 否 | 初始展示第几张 |
| infinite | `boolean` | `true` | 否 | 无限循环翻页 |
| hideOnClickModal | `boolean` | `false` | 否 | 点击遮罩关闭 |

### Emits
| 事件名 | 参数 | 说明 |
|---|---|---|
| update:modelValue | `visible: boolean` | 显示状态变化 |
| close | — | 关闭 |

### Expose
| 方法 | 说明 |
|---|---|
| createImageViewer | `(options: { urlList: string[]; initialIndex?: number }) => void` — 程序化打开预览 |
