---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_2feebc3386a611f18108525400287e28
    ReservedCode1: 7NqDsZqJwlW1ZCDI0KfhK2Zl43qZ1do88LTe5lPcJug38xlzTCuJblYuZTraD2yoV2YflPqhmtGatij8eQVp5UB4qmQki0b19nwzMmd6ZitvmFwDNsSnsPKH4CyMP6/XZKw9pRq+y8tKPawEMTGGndNJKRJXxRVnQvFNqhmV7qp44PXZE77nvlDbddo=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_2feebc3386a611f18108525400287e28
    ReservedCode2: 7NqDsZqJwlW1ZCDI0KfhK2Zl43qZ1do88LTe5lPcJug38xlzTCuJblYuZTraD2yoV2YflPqhmtGatij8eQVp5UB4qmQki0b19nwzMmd6ZitvmFwDNsSnsPKH4CyMP6/XZKw9pRq+y8tKPawEMTGGndNJKRJXxRVnQvFNqhmV7qp44PXZE77nvlDbddo=
---

# CxFlop — 场景说明

## 典型场景

1. **仪表盘 / 大屏展示**：在数据监控大屏或仪表盘中，以视觉冲击力强的翻页时钟展示实时时间，提升展示氛围。
2. **倒计时 / 计时器页面的辅助展示**：作为当前时间的辅助参考，与倒计时组件搭配。
3. **管理系统首页**：在后台管理系统首页顶部放置翻页时钟，增加页面的动态感和科技感。

## 不适用场景

- **需要设置特定时间**：CxFlop 始终显示系统当前时间，无法传入自定义时间。
- **需要日期显示**：仅显示时分秒，不包含年/月/日/星期。
- **需要 12 小时制或 AM/PM**：仅支持 24 小时制。
- **需要控制暂停/继续**：组件内部定时器不可外部控制。

## 完整示例

### 基础用法（直接使用）

```vue
<template>
  <div class="dashboard-header">
    <CxFlop />
  </div>
</template>

<script setup lang="ts">
import CxFlop from '@/components/CxFlop'
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #1a1a2e;
}
</style>
```

### 与其他仪表盘组件组合

```vue
<template>
  <div class="monitor-screen">
    <div class="monitor-screen__header">
      <h1>数据监控中心</h1>
      <CxFlop />
    </div>
    <div class="monitor-screen__charts">
      <!-- 图表区域 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import CxFlop from '@/components/CxFlop'
</script>

<style scoped>
.monitor-screen {
  width: 100vw;
  height: 100vh;
  background: #0a0a1a;
  color: #fff;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
```

## 注意事项

- 组件完全自驱动，无需传入任何 props。
- 组件卸载时会自动清除定时器，无需手动管理。
- 翻页动画时长由内部 CxFlipper 的 `duration` prop 控制（默认 600ms）。
