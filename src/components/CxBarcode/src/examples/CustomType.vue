<template>
  <div class="cx-barcode-example-type">
    <h3 class="cx-barcode-example-type__title">条形码格式切换</h3>
    <p class="cx-barcode-example-type__desc">
      通过 type prop 切换不同条形码格式（CODE128 / EAN13 / UPC / CODE39 等）。
    </p>

    <div class="cx-barcode-example-type__grid">
      <CxBarcode text="5901234123457" type="EAN13" />
      <CxBarcode text="123456789012" type="UPC" />
      <CxBarcode text="12345678" type="CODE39" />
      <CxBarcode text="20240723" type="ITF" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CxBarcode from '../CxBarcode.vue'

defineOptions({
  name: 'CxBarcodeCustomType'
})
</script>

<style scoped lang="scss">
.cx-barcode-example-type {
  max-width: 640px;
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

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: center;

    .cx-barcode {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
