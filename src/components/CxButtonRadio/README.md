# CxButtonRadio

## 设计意图
按钮式单选组，将 el-radio-group 渲染为 el-button-group 样式，适合筛选/切换类场景。

## 功能边界
- 支持：双向绑定、尺寸控制、禁用、选项 label/value 配置、类型(填充/outline/text)
- 不支持：复杂模板渲染（slot 请用 CxSegmented）

## 依赖
- Element Plus `el-radio-group`、`el-radio-button`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| modelValue | `string \| number` | `''` | 否 | 当前值（v-model） |
| options | `{ label: string; value: string \| number }[]` | `[]` | 是 | 选项列表 |
| size | `string` | `'default'` | 否 | 按钮尺寸 |
| disabled | `boolean` | `false` | 否 | 禁用全部 |
