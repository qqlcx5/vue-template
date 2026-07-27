# CxEditor

## 设计意图
富文本编辑器封装组件，基于 wangeditor 或 TinyMCE，提供统一 API（v-model 绑定 HTML 内容），适配中后台内容编辑（公告、文章、邮件模板等）。

## 功能边界
- 支持：v-model HTML 双向绑定、工具栏配置、只读模式、上传图片、placeholder
- 不支持：Markdown 编辑（非富文本场景）、协同编辑

## 依赖
- 富文本编辑器库（wangeditor 或 tinymce）

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| modelValue | `string` | `''` | 否 | HTML 内容（v-model） |
| readOnly | `boolean` | `false` | 否 | 只读模式 |
| placeholder | `string` | `'请输入内容'` | 否 | 占位文本 |
| height | `string \| number` | `'400px'` | 否 | 编辑器高度 |
| toolbarConfig | `object` | 默认工具栏 | 否 | 工具栏配置 |
| uploadUrl | `string` | `''` | 否 | 图片上传接口 |
