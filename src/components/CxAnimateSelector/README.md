# CxAnimateSelector

## 设计意图

CxAnimateSelector 是基于 Element Plus `el-select` 封装的动画选择器组件。它提供一个可视化下拉面板，用户可以从 animate.css 内置的所有动画效果中预览并选择其一。选中值通过 `v-model` 双向绑定，值为 animate.css 的动画类名（如 `"bounce"`、`"fadeIn"`）。

## 功能边界

- **支持**：从 90+ 种 animate.css 动画名称中选择一个；支持关键词过滤搜索；鼠标悬停实时预览动画效果；支持清空选择。
- **不支持**：同时选择多个动画；自定义动画列表；自定义预览 UI 样式（卡片尺寸、颜色等固定）。

## 依赖

- **animate.css**：动画预览依赖 `animate__animated`、`animate__XXX`、`animate__infinite` 类名。项目需已引入 animate.css。
- **Element Plus**：`el-select`、`el-scrollbar`、`el-empty`。

## 完整 API

### Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `placeholder` | `string` | `"请选择动画"` | 否 | 选择框占位文本 |
| `modelValue` | `string` | `""` | 否 | v-model 双向绑定的选中动画名称 |

### Emits

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `(value: string)` | v-model 更新事件，选中值变化或清空时触发 |

### Slots

无对外暴露的插槽。

### Expose

无对外暴露的方法或属性。
