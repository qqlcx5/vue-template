<template>
  <div class="cx-iframe" :style="containerStyle">
    <iframe
      :src="src"
      :style="{ width: '100%', height: '100%', border: frameborder ? '1px solid #dcdfe6' : 'none' }"
      :allowfullscreen="allowFullscreen"
      @load="onLoad"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CxIFrameProps } from './types'

defineOptions({ name: 'CxIFrame' })

const props = withDefaults(defineProps<CxIFrameProps>(), {
  src: '',
  height: '500px',
  width: '100%',
  frameborder: 0,
  allowFullscreen: true,
})

const containerStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}))
</script>
