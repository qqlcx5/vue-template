# CxPagination

## 设计意图
对 Element Plus 分页组件进行封装，提供双 v-model 绑定（当前页码 + 每页条数），适配中后台后台管理系统的分页场景。

## 功能边界
- 支持：双 v-model（page/pageSize）、总条数绑定、内置 pageSizes 选项、小型模式、背景色模式
- 不支持：前端分页逻辑（仅负责 UI 交互，数据切分由外部处理）

## 依赖
- Element Plus `el-pagination`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| modelValue | `number` | `1` | 否 | 当前页码（v-model） |
| pageSize | `number` | `10` | 否 | 每页条数（v-model:pageSize） |
| total | `number` | `0` | 否 | 总条数 |
| pageSizes | `number[]` | `[10, 20, 50, 100]` | 否 | 每页条数选项 |
| small | `boolean` | `false` | 否 | 小型分页 |
| background | `boolean` | `true` | 否 | 背景色 |
| layout | `string` | `'total, sizes, prev, pager, next, jumper'` | 否 | 布局 |

### Emits
| 事件名 | 参数 | 说明 |
|---|---|---|
| update:modelValue | `page: number` | 页码变化 |
| update:pageSize | `size: number` | 每页条数变化 |
| change | `{ page: number; pageSize: number }` | 页码/条数任一变化 |
