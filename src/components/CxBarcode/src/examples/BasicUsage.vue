<template>
  <div class="cx-barcode-example-basic">
    <h3 class="cx-barcode-example-basic__title">基础用法：Canvas 条形码</h3>
    <p class="cx-barcode-example-basic__desc">
      默认以 Canvas 渲染，传入 text 即可生成 CODE128 格式条形码。
    </p>

    <CxBarcode text="JP1024-CX01" />
    <CxBarcode text="20240723-PROD" />
  </div>
</template>

<script setup lang="ts">
import CxBarcode from '../CxBarcode.vue'

defineOptions({
  name: 'CxBarcodeBasicUsage'
})
</script>

<style scoped lang="scss">
.cx-barcode-example-basic {
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
