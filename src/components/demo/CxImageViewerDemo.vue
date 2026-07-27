<template>
  <div class="demo-page">
    <el-card header="CxImageViewer 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-image-viewer-demo__section">
        <el-button type="primary" @click="openViewer">预览</el-button>
      </div>

      <!-- 场景2：指定初始索引 -->
      <h3>场景2：指定初始索引（从第2张开始）</h3>
      <div class="cx-image-viewer-demo__section">
        <el-button type="primary" @click="openWithIndex">从第2张预览</el-button>
      </div>

      <!-- 场景3：无限循环 -->
      <h3>场景3：无限循环</h3>
      <div class="cx-image-viewer-demo__section">
        <el-button type="primary" @click="openInfinite">无限循环预览</el-button>
      </div>

      <!-- 场景4：createImageViewer 函数调用 -->
      <h3>场景4：createImageViewer 函数方式</h3>
      <div class="cx-image-viewer-demo__section">
        <el-button type="primary" @click="openByFunction">函数方式打开</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CxImageViewer, createImageViewer } from '@/components/CxImageViewer'

defineOptions({
  name: 'CxImageViewerDemo'
})

const urlList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
]

function openViewer() {
  // 通过组件方式打开，这里仅示意，实际需配合组件状态
}

function openWithIndex() {
  // initialIndex = 1
}

function openInfinite() {
  // infinite = true
}

function openByFunction() {
  createImageViewer({ urlList, initialIndex: 0 })
}
</script>

<style scoped lang="scss">
.cx-image-viewer-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
