<template>
  <div class="demo-page">
    <el-card header="CxBarcode — 条形码生成组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxBarcode 基于 JsBarcode 封装，支持 Canvas / SVG / Img 三种渲染方式，可自定义条码格式、颜色、尺寸等。
      </el-alert>

      <!-- 场景1：默认 Canvas 渲染 CODE128 -->
      <h3>场景1：默认 Canvas 渲染 CODE128</h3>
      <CxBarcode text="6901234567890" />

      <!-- 场景2：自定义条码格式 EAN-13 -->
      <h3>场景2：自定义条码格式（EAN-13）</h3>
      <CxBarcode text="5901234123457" type="EAN13" />

      <!-- 场景3：SVG 渲染 -->
      <h3>场景3：SVG 渲染</h3>
      <CxBarcode text="ABC-123-XYZ" tag="svg" />

      <!-- 场景4：Img 渲染 -->
      <h3>场景4：Img 渲染</h3>
      <CxBarcode text="ORDER-2024-001" tag="img" />

      <!-- 场景5：完整配置 -->
      <h3>场景5：完整配置（颜色、尺寸、文本显示）</h3>
      <CxBarcode
        text="123456789012"
        type="CODE128"
        :options="barcodeOptions"
      />

      <!-- 场景6：隐藏底部文本 -->
      <h3>场景6：隐藏底部文本</h3>
      <CxBarcode text="6001234567890" :options="{ displayValue: false }" />

      <!-- 场景7：响应式更新 -->
      <h3>场景7：响应式更新（动态切换内容与格式）</h3>
      <el-form :inline="true" style="margin-bottom: 12px">
        <el-form-item label="内容">
          <el-input v-model="dynamicText" placeholder="输入条码内容" />
        </el-form-item>
        <el-form-item label="格式">
          <el-select v-model="dynamicFormat" style="width: 150px">
            <el-option value="CODE128" label="CODE128" />
            <el-option value="EAN13" label="EAN13" />
            <el-option value="UPC" label="UPC" />
          </el-select>
        </el-form-item>
        <el-form-item label="渲染方式">
          <el-select v-model="dynamicTag" style="width: 120px">
            <el-option value="canvas" label="Canvas" />
            <el-option value="svg" label="SVG" />
            <el-option value="img" label="Img" />
          </el-select>
        </el-form-item>
      </el-form>
      <CxBarcode :text="dynamicText" :type="dynamicFormat" :tag="dynamicTag" />

      <!-- 场景8：批量条形码列表 -->
      <h3>场景8：批量订单条形码列表</h3>
      <el-table :data="orders" border>
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column label="条形码">
          <template #default="{ row }">
            <CxBarcode
              :text="row.orderNo"
              :options="{ width: 1.5, height: 40, fontSize: 10, displayValue: false }"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxBarcode from '@/components/CxBarcode'

const barcodeOptions = {
  lineColor: '#2c3e50',
  width: 2,
  height: 80,
  displayValue: true,
  fontSize: 14,
  textMargin: 4,
  margin: 10,
  background: '#f9f9f9'
}

const dynamicText = ref('6901234567890')
const dynamicFormat = ref('CODE128')
const dynamicTag = ref<'canvas' | 'svg' | 'img'>('canvas')

const orders = ref([
  { orderNo: '202407010001' },
  { orderNo: '202407010002' },
  { orderNo: '202407010003' }
])
</script>

<style scoped>
.demo-page { padding: 16px; }
h3 { margin: 16px 0 8px; font-size: 15px; color: #303133; }
</style>
