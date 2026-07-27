<template>
  <div class="cx-echart-example-basic">
    <h3>基础柱状图</h3>
    <CxEchart :option="option" height="350px" />
  </div>
</template>

<script setup lang="ts">
import CxEchart from '../CxEchart.vue'

defineOptions({ name: 'CxEchartExampleBasic' })

const option = {
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' }],
}
</script>
