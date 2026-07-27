<template>
  <div class="cx-barcode-example-svg">
    <h3 class="cx-barcode-example-svg__title">SVG 标签渲染</h3>
    <p class="cx-barcode-example-svg__desc">
      使用 tag="svg" 渲染矢量条形码，适合需要无损缩放的场景。
    </p>

    <CxBarcode tag="svg" text="SVG-BARCODE-01" />
    <CxBarcode tag="svg" text="SVG-BARCODE-02" />
  </div>
</template>

<script setup lang="ts">
import CxBarcode from '../CxBarcode.vue'

defineOptions({
  name: 'CxBarcodeSvgTag'
})
</script>

<style scoped lang="scss">
.cx-barcode-example-svg {
  max-width: 480px;
  padding: 16px;

  &__title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
  }

  &__desc {
    margin: 0 0 16px;
    font-size: 13px;
    color: #909399;
    line-height: 1.6;
  }

  .cx-barcode {
    margin-bottom: 20px;
  }
}
</style>
