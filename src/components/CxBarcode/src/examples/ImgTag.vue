<template>
  <div class="cx-barcode-example-img">
    <h3 class="cx-barcode-example-img__title">IMG 标签渲染</h3>
    <p class="cx-barcode-example-img__desc">
      使用 tag="img" 渲染为 &lt;img&gt; 元素，适合直接下载或复制。
    </p>

    <CxBarcode tag="img" text="IMG-TAG-DEMO" />
  </div>
</template>

<script setup lang="ts">
import CxBarcode from '../CxBarcode.vue'

defineOptions({
  name: 'CxBarcodeImgTag'
})
</script>

<style scoped lang="scss">
.cx-barcode-example-img {
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
}
</style>
