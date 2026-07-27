# CxTable

## 设计意图
中后台表格核心组件，基于 Element Plus el-table 深度封装，Schema 驱动列配置 + 内置分页联动、多种工具栏（导出/刷新/列设置/密度）。

## 功能边界
- 支持：Schema 驱动多类型列（index/tag/action/expand）、分页联动、多选、导出、刷新、列设置、密度切换、loading、空状态、自定义单元格 slot
- 不支持：树形表格、合并单元格、虚拟滚动（需单独配置）

## 依赖
- Element Plus `el-table`、`el-pagination`
- CxPagination

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| columns | `TableColumn[]` | `[]` | 是 | 列配置 |
| data | `any[]` | `[]` | 是 | 表格数据 |
| loading | `boolean` | `false` | 否 | 加载状态 |
| selection | `boolean` | `false` | 否 | 多选 |
| pagination | `PaginationConfig \| false` | — | 否 | 分页配置，false 关闭 |
| border | `boolean` | `true` | 否 | 纵向边框 |
| stripe | `boolean` | `true` | 否 | 斑马纹 |
| showToolbar | `boolean` | `false` | 否 | 显示工具栏 |
| toolbar | `('refresh' \| 'density' \| 'column' \| 'export')[]` | `[]` | 否 | 工具栏按钮 |

### Slots
| 插槽名 | 说明 |
|---|---|
| [column.prop] | 按字段名自定义单元格 |
