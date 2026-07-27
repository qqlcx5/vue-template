<template>
  <el-image-viewer
    v-if="visible"
    :url-list="urlList"
    :initial-index="initialIndex"
    :infinite="infinite"
    :hide-on-click-modal="hideOnClickModal"
    @close="handleClose"
    @switch="handleSwitch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CxImageViewerProps, CxImageViewerEmits } from './types'

defineOptions({ name: 'CxImageViewer' })

const props = withDefaults(defineProps<CxImageViewerProps>(), {
  urlList: () => [],
  initialIndex: 0,
  infinite: true,
  hideOnClickModal: false,
  showArrows: true,
})

const emit = defineEmits<CxImageViewerEmits>()

const visible = ref(true)

function handleClose() {
  visible.value = false
  emit('close')
}

function handleSwitch(index: number) {
  emit('switch', index)
}
</script>
