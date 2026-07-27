---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_2eff531386a611f18108525400287e28
    ReservedCode1: GcM65ydAIFl1usHAGFIgCkJkvAoY9yXJtrKv1dxJ7yxGdvEWs5wVHX+Nj6xmIdxnDyv+IH/fRzSDUEC6K4vgT71mp5ZCjhidR089PGIuEVoWzs6YxC0nrhg9h5/YKk5UN1Lo4sSn3WaQt8Pu0ys3zdEeok/Wv+9ARlD7MN6eD1RGVZLw0nxVQoHHM/g=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_2eff531386a611f18108525400287e28
    ReservedCode2: GcM65ydAIFl1usHAGFIgCkJkvAoY9yXJtrKv1dxJ7yxGdvEWs5wVHX+Nj6xmIdxnDyv+IH/fRzSDUEC6K4vgT71mp5ZCjhidR089PGIuEVoWzs6YxC0nrhg9h5/YKk5UN1Lo4sSn3WaQt8Pu0ys3zdEeok/Wv+9ARlD7MN6eD1RGVZLw0nxVQoHHM/g=
---

# CxFlop

翻页时钟组件，以卡片翻页动效实时展示当前时间（HH:MM:SS）。

## 设计意图

CxFlop 是一个纯展示型的翻页时钟，内部由 **6 个 CxFlipper 翻页数字单元** 和 **2 个冒号分隔符** 组成。组件在挂载后立即初始化当前时间，之后每秒更新一次，通过向下翻页动画驱动数字变化。

- **零外部 Props**：组件完全自驱动，不依赖外部传入任何数据。
- **自动生命周期管理**：挂载时启动定时器，卸载时自动清除，无内存泄漏风险。
- **内部复用 CxFlipper**：每个数字位由独立的 CxFlipper 渲染，翻页动画由 CxFlipper 的 `flipDown()` 方法驱动。

## 功能边界

| 范围 | 说明 |
| --- | --- |
| **包含** | 24小时制翻页时钟展示、自动每秒刷新、翻页动画 |
| **不包含** | 12小时制切换、日期显示、时区设置、外观主题定制、手动设置时间、暂停/继续 |

## 依赖

- `CxFlipper`（内部子组件）：数字翻页单元，提供 `setFront()` / `flipDown()` / `flipUp()` / `setBack()` 方法。

## API

### Props

无外部 Props。

### Emits

无。

### Slots

无。

### Expose

无。

## 使用示例

```vue
<template>
  <CxFlop />
</template>

<script setup lang="ts">
import CxFlop from '@/components/CxFlop'
</script>
```
