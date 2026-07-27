# CxSearch

## 设计意图
Schema 驱动的搜索栏组件，通过配置 JSON 即可生成搜索表单，内置展开/折叠、高级搜索、重置功能。

## 功能边界
- 支持：Schema 驱动渲染、展开/折叠（超过一行折叠）、多种表单控件（input/select/daterange/cascader）、重置、搜索按钮、自定义按钮区
- 不支持：嵌套对象表单（需用 ProForm）

## 依赖
- Element Plus `el-form`、`el-row`、`el-col`、`el-button`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| schema | `SearchSchema[]` | `[]` | 是 | 搜索配置 |
| model | `Record<string, any>` | `{}` | 否 | 搜索表单数据（双向） |
| labelWidth | `string \| number` | `'auto'` | 否 | 标签宽度 |
| showReset | `boolean` | `true` | 否 | 显示重置按钮 |
| searchText | `string` | `'查询'` | 否 | 搜索按钮文案 |
| resetText | `string` | `'重置'` | 否 | 重置按钮文案 |
| lineClamp | `number` | `1` | 否 | 折叠前展示行数 |

**SearchSchema**:
| 字段 | 类型 | 说明 |
|---|---|---|
| field | `string` | 字段名 |
| label | `string` | 标签 |
| component | `string` | 控件名（input/select/daterange/cascader） |
| props | `object` | 透传给控件的 props |
| colProps | `object` | 透传给 el-col 的 props |
