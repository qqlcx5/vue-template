<template>
  <div class="demo-page">
    <el-card header="CxEchart 示例" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        基于 ECharts 封装的图表组件，支持折线图、柱状图、饼图等。
      </el-alert>

      <!-- 场景1：基础折线图 -->
      <h3>场景1：基础折线图</h3>
      <div class="cx-echart-demo__section">
        <CxEchart :options="lineOptions" @ready="handleReady" />
      </div>

      <!-- 场景2：柱状图 -->
      <h3>场景2：柱状图</h3>
      <div class="cx-echart-demo__section">
        <CxEchart :options="barOptions" />
      </div>

      <!-- 场景3：饼图 -->
      <h3>场景3：饼图（height=300px）</h3>
      <div class="cx-echart-demo__section">
        <CxEchart :options="pieOptions" height="300px" />
      </div>

      <!-- 场景4：自定义高度 -->
      <h3>场景4：自定义高度（height=250px）</h3>
      <div class="cx-echart-demo__section">
        <CxEchart :options="lineOptions" height="250px" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { CxEchart } from '@/components/CxEchart'

defineOptions({
  name: 'CxEchartDemo'
})

const lineOptions: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'line',
      data: [150, 230, 224, 218, 135, 147, 260],
      smooth: true,
      name: '访问量'
    }
  ]
}

const barOptions: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['苹果', '香蕉', '橙子', '葡萄', '西瓜']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'bar',
      data: [120, 200, 150, 80, 70],
      name: '销量'
    }
  ]
}

const pieOptions: EChartsOption = {
  series: [
    {
      type: 'pie',
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' }
      ]
    }
  ]
}

function handleReady(instance: unknown) {
  console.log('[CxEchart] 图表就绪', instance)
}
</script>

<style scoped lang="scss">
.cx-echart-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
