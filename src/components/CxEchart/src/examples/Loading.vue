<template>
  <div class="cx-echart-example-line">
    <h3>折线图（Loading）</h3>
    <el-button @click="toggleLoading" style="margin-bottom: 12px">切换 Loading</el-button>
    <CxEchart :option="lineOption" :loading="loading" height="350px" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxEchart from '../CxEchart.vue'

defineOptions({ name: 'CxEchartExampleLine' })

const loading = ref(false)

const lineOption = {
  xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
  yAxis: { type: 'value' },
  series: [
    { data: [150, 230, 224, 218, 135], type: 'line', smooth: true },
  ],
}

function toggleLoading() {
  loading.value = !loading.value
}
</script>
