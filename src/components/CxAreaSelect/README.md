# CxAreaSelect

## 设计意图
省市区三级联动选择组件，基于 Element Plus el-cascader + 中国行政区划数据，支持代码/名称双模式，适配中后台地址填写场景。

## 功能边界
- 支持：省-市-区三级联动、双向绑定、代码模式(code)/名称模式(name)、全部地区/仅省市可选、表单集成
- 不支持：街道级四级联动、海外地址

## 依赖
- Element Plus `el-cascader`
- china-area-data（行政区划数据）

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| modelValue | `string[]` | `[]` | 否 | 选中值（v-model），代码模式下为 code 数组 |
| codeMode | `boolean` | `true` | 否 | 是否代码模式 |
| placeholder | `string` | `'请选择省市区'` | 否 | 占位文本 |
| disabled | `boolean` | `false` | 否 | 禁用 |
| level | `0 \| 1 \| 2` | `2` | 否 | 限制可选层级：0=省 1=省市 2=省市区 |

### Emits
| 事件名 | 参数 | 说明 |
|---|---|---|
| update:modelValue | `value: string[]` | 值变化 |
| change | `{ codes: string[]; names: string[] }` | 选择变化 |
