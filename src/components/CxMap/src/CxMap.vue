<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import type { CxMapOptions } from './types'

defineOptions({ name: 'CxMap' })

interface Props {
  amapKey: string
  version?: string
  plugins?: string[]
  options?: CxMapOptions
}

const props = withDefaults(defineProps<Props>(), {
  version: '2.0',
  plugins: () => ['AMap.ToolBar', 'AMap.MapType'],
  options: () => ({})
})

const emit = defineEmits<{
  'ready': [map: any, AMap: any]
  'error': [error: any]
}>()

const containerRef = ref<HTMLElement>()
const loading = ref(true)
let mapInstance: any = null

const defaultOptions: CxMapOptions = {
  zoom: 11,
  center: [116.397428, 39.90923],
  viewMode: '2D'
}

onMounted(() => {
  initMap()
})

onBeforeUnmount(() => {
  if (mapInstance) {
    try {
      mapInstance.destroy?.()
      mapInstance.clearEvents?.('click')
    } catch {
      /* ignore */
    }
    mapInstance = null
  }
})

async function initMap() {
  if (!props.amapKey) {
    loading.value = false
    emit('error', new Error('amapKey is required'))
    return
  }

  try {
    const AMap = await AMapLoader.load({
      key: props.amapKey,
      version: props.version,
      plugins: props.plugins
    })

    if (!containerRef.value) return

    const mergedOptions = { ...defaultOptions, ...props.options }

    mapInstance = new AMap.Map(containerRef.value, mergedOptions)

    mapInstance.on('complete', () => {
      loading.value = false
    })

    emit('ready', mapInstance, AMap)
  } catch (err) {
    loading.value = false
    emit('error', err)
    console.error('CxMap: 地图加载失败', err)
  }
}

function getMap() {
  return mapInstance
}

defineExpose({ getMap })
</script>

<template>
  <div class="cx-map" v-loading="loading">
    <div ref="containerRef" class="cx-map__container"></div>
  </div>
</template>

<style scoped lang="scss">
.cx-map {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;

  &__container {
    width: 100%;
    height: 100%;
    min-height: 300px;
  }
}
</style>
