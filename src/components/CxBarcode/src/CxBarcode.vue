<template>
  <div class="cx-barcode">
    <component :is="tag" ref="wrapRef" class="cx-barcode__element" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import JsBarcode from 'jsbarcode'
import type { CxBarcodeProps } from './types'

// ============================================================
// Options
// ============================================================

defineOptions({
  name: 'CxBarcode'
})

// ============================================================
// Props
// ============================================================

const props = withDefaults(defineProps<CxBarcodeProps>(), {
  tag: 'canvas',
  text: '',
  options: () => ({}),
  type: 'CODE128'
})

// ============================================================
// 响应式状态
// ============================================================

const wrapRef = ref<HTMLElement | null>(null)

// ============================================================
// 渲染条形码
// ============================================================

function renderBarcode() {
  if (!wrapRef.value || !props.text) return
  const opt = { ...props.options, format: props.type }
  JsBarcode(wrapRef.value, props.text, opt)
}

// ============================================================
// Watchers
// ============================================================

onMounted(() => {
  nextTick(() => {
    renderBarcode()
  })
})

watch(
  () => [props.text, props.type, props.options, props.tag],
  () => {
    nextTick(() => {
      renderBarcode()
    })
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
.cx-barcode {
  display: inline-block;

  &__element {
    display: block;
  }
}
</style>
