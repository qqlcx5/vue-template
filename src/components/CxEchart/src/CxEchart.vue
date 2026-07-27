<template>
  <div ref="chartRef" class="cx-echart" :style="chartStyle" />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import type { CxEchartProps, CxEchartEmits } from './types'

defineOptions({ name: 'CxEchart' })

const props = withDefaults(defineProps<CxEchartProps>(), {
  options: () => ({}),
  height: '400px',
  width: '100%',
  watchTheme: true,
  autoResize: true,
})

const emit = defineEmits<CxEchartEmits>()

const chartRef = ref<HTMLElement>()
let chartInstance: echarts.ECharts | null = null

const chartStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}))

function initChart() {
  if (!chartRef.value) return
  if (chartInstance) {
    chartInstance.dispose()
  }
  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption(props.options)
  emit('ready', chartInstance)
}

function handleResize() {
  chartInstance?.resize()
}

watch(() => props.options, () => {
  if (chartInstance) {
    chartInstance.setOption(props.options, true)
  }
}, { deep: true })

onMounted(() => {
  nextTick(initChart)
  if (props.autoResize) {
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<style scoped lang="scss">
.cx-echart {
  width: 100%;
}
</style>
