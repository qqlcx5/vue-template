# CxCol

## 设计意图

CxCol 是基于 Element Plus `el-col` 的简化栅格列组件。它将单一 `value` 值同时应用于所有响应式断点（xs / sm / md / lg / xl），避免重复书写相同的断点配置。同时通过 `inheritAttrs: false` + `v-bind="$attrs"` 透传机制，支持 `el-col` 的其他原生属性（如 `offset`、`span` 等）。

## 功能边界

- **支持**：统一所有断点占位数值（1-24）；透传 `el-col` 原生属性（`span`、`offset`、`push`、`pull` 等）；默认插槽渲染子内容。
- **不支持**：按断点分别设置不同占位值（如需差异化断点，直接使用 `el-col` 而非 CxCol）。

## 依赖

- **Element Plus**：`el-col` 组件。

## 完整 API

### Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `value` | `number` | `24` | 否 | 栅格占位数值，范围 1-24。会同时设为 `el-col` 的 `xs`、`sm`、`md`、`lg`、`xl` 属性 |

### Emits

无（透传 `$attrs` 中可能包含原生事件）。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 列内容插槽，等同于 `el-col` 的默认插槽 |

### Expose

无。

## 透传机制

由于设置了 `inheritAttrs: false` 并绑定了 `v-bind="$attrs"`，非 Props 声明的属性会直接透传到 `el-col` 上。例如可以传入 `:span="12"`、`:offset="2"` 等 `el-col` 原生属性。
