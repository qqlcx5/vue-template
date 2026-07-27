---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_4314fe1f86a611f18766525400f8a581
    ReservedCode1: UGazGuitiAxlWIMdTBFYCFbu/9vyF9ZxF6ZL12szTk3drneqRMWw5q3UIowlA3sp2pOWoecfrKUAnerApRVoc2wEXrCpPEdcfQV50kU/ZT76KmwXefvALbaSojRJ/hBqvsdakKhropejyDmKVMN18mKWEHtQTLS1PsmFkBWAZC3Vigf6iybHT5PUB+w=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_4314fe1f86a611f18766525400f8a581
    ReservedCode2: UGazGuitiAxlWIMdTBFYCFbu/9vyF9ZxF6ZL12szTk3drneqRMWw5q3UIowlA3sp2pOWoecfrKUAnerApRVoc2wEXrCpPEdcfQV50kU/ZT76KmwXefvALbaSojRJ/hBqvsdakKhropejyDmKVMN18mKWEHtQTLS1PsmFkBWAZC3Vigf6iybHT5PUB+w=
---

# CxText 文本省略/展开

## 设计意图

CxText 对 Element Plus 的 `ElText` 进行了封装，在文本溢出（单行省略或多行截断）时自动通过 `ElTooltip` 展示完整内容。Tooltip 仅在文本实际溢出时才启用，避免无意义的悬浮提示。组件通过 `v-bind="$attrs"` 透传所有 ElText 原生属性。

## 功能边界

- **适用场景**：表格列宽不足时的内容省略、卡片标题/描述溢出、列表项文本截断
- **不适用场景**：需要手动展开/收起的"查看更多"交互（需自行实现）、富文本 HTML 内容的省略

## 导出的类型

| 类型 | 说明 |
|------|------|
| `CXTextProps` | 组件 Props 类型 |

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `lineClamp` | `string \| number` | — | 行数限制。不传则为单行省略；传入数字为多行省略 |
| `tooltipProps` | `Partial<ElTooltipProps>` | `{}` | 透传给 `el-tooltip` 的额外属性，默认 `placement: 'top'`, `showAfter: 300` |

### 透传属性（$attrs）

所有 CxText 上未声明的属性会透传给内部的 `ElText`，例如 `type`、`size`、`tag` 等。

### Events

无自有事件（`$attrs` 中的事件会透传给 `ElText`）。

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 文本内容，同时作为 tooltip 的默认展示内容 |
| `content` | 自定义 tooltip 弹出内容（优先级高于 default） |

### Expose

无。
