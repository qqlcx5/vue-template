# CxDescriptions

## 设计意图
Schema 驱动的描述列表组件，基于 Element Plus el-descriptions 封装，将数据与配置解耦，一行 schema 定义即可渲染详情页字段。

## 功能边界
- 支持：schema 驱动渲染、列数控制、自定义 label/value 样式、slot 自定义单元格、border 模式
- 不支持：复杂嵌套布局（多层 descriptions 嵌套请拆分为多个实例）

## 依赖
- Element Plus `el-descriptions`、`el-descriptions-item`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| schema | `DescriptionsSchema[]` | `[]` | 否 | 字段配置 |
| data | `Record<string, any>` | `{}` | 否 | 源数据 |
| column | `number` | `3` | 否 | 每行列数 |
| border | `boolean` | `true` | 否 | 边框模式 |
| size | `string` | `'default'` | 否 | 尺寸 |
| labelWidth | `string \| number` | `''` | 否 | 标签宽度 |

**DescriptionsSchema**:
| 字段 | 类型 | 说明 |
|---|---|---|
| field | `string` | 数据字段名 |
| label | `string` | 标签文本 |
| span | `number` | 占据列数 |
| tag | `string \| (val: any) => { type: string; text: string }` | 标签渲染 |
| formatter | `(val: any, row: Record<string, any>) => string` | 格式化函数 |

### Slots
| 插槽名 | 说明 |
|---|---|
| [field] | 动态插槽，可按 field 名自定义单元格内容 |
