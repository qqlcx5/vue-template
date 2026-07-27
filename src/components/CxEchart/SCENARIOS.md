## 典型场景
- 仪表盘统计图表（柱状图/折线图/饼图）
- 数据大屏可视化
- 报表趋势图

## 不适用场景
- 需要高度定制的图表交互（直接使用 echarts.init）
- 3D 地图等高级 GIS 图表

## 示例

### 1. 基础柱状图
```vue
<template>
  <CxEchart :option="option" height="400px" />
</template>

<script setup>
const option = {
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 200, 150], type: 'bar' }],
}
</script>
```

### 2. Loading 状态
```vue
<CxEchart :option="option" :loading="loading" @init="onChartInit" />
```
