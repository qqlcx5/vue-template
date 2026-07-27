<template>
  <div class="cx-echart-example-pie">
    <h3>饼图</h3>
    <CxEchart :option="pieOption" height="350px" />
  </div>
</template>

<script setup lang="ts">
import CxEchart from '../CxEchart.vue'

defineOptions({ name: 'CxEchartExamplePie' })

const pieOption = {
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: '60%',
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' },
      ],
    },
  ],
}
</script>
