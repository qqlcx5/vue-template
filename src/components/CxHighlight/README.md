# CxHighlight

## 设计意图
关键词高亮组件，对文本中的搜索关键词进行高亮标记（黄色背景），常用于搜索结果的片段展示。

## 功能边界
- 支持：多关键词高亮、大小写敏感/不敏感、高亮样式自定义、HTML 安全转义
- 不支持：富文本内部高亮、正则表达式匹配

## 依赖
- 无外部依赖（纯 JS + Vue）

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| text | `string` | `''` | 否 | 原始文本 |
| keywords | `string \| string[]` | `[]` | 否 | 高亮关键词 |
| caseSensitive | `boolean` | `false` | 否 | 大小写敏感 |
| highlightClass | `string` | `''` | 否 | 高亮元素 class |
| highlightStyle | `Record<string, string>` | `{ background: '#fff3cd', color: '#856404' }` | 否 | 高亮样式 |
