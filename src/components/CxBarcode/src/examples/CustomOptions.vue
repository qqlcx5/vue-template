<template>
  <div class="cx-barcode-example-options">
    <h3 class="cx-barcode-example-options__title">自定义 JsBarcode 配置</h3>
    <p class="cx-barcode-example-options__desc">
      通过 options prop 传入 JsBarcode 原生配置：高度、宽度、颜色、字体等。
    </p>

    <!-- 自定义高度、宽度、颜色 -->
    <CxBarcode
      text="OPTIONS-DEMO"
      :options="{
        height: 80,
        width: 2.5,
        lineColor: '#1d4ed8',
        background: '#eff6ff'
      }"
    />

    <!-- 隐藏文字，显示边框 -->
    <CxBarcode
      text="NO-TEXT-DEMO"
      type="CODE39"
      :options="{
        displayValue: false,
        height: 60,
        margin: 20
      }"
    />

    <!-- 自定义字体与颜色 -->
    <CxBarcode
      text="FONT-STYLE"
      :options="{
        fontSize: 18,
        fontOptions: 'bold italic',
        textMargin: 8,
        lineColor: '#047857'
      }"
    />
  </div>
</template>

<script setup lang="ts">
import CxBarcode from '../CxBarcode.vue'

defineOptions({
  name: 'CxBarcodeCustomOptions'
})
</script>

<style scoped lang="scss">
.cx-barcode-example-options {
  max-width: 560px;
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
    margin-bottom: 28px;
    display: block;
  }
}
</style>
