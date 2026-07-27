# CxDictTag

## 设计意图
字典数据驱动的标签组件，将后端字典数据注入后自动匹配 label/type 渲染 el-tag，简化中后台枚举值展示。

## 功能边界
- 支持：字典数据驱动、多色标签、自定义 value→type 映射、fallback 兜底显示
- 不支持：字典数据异步请求（需外部完成请求后传入 dictData）

## 依赖
- Element Plus `el-tag`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| modelValue | `string \| number` | `''` | 否 | 当前值 |
| dictData | `{ label: string; value: string \| number; type?: string }[]` | `[]` | 是 | 字典数据 |
| fallback | `string` | `'-'` | 否 | 无匹配时的兜底文本 |

### Slots
| 插槽名 | 说明 |
|---|---|
| default | 自定义渲染（参数: { item, value }） |
