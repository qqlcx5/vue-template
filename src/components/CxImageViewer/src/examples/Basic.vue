<template>
  <div class="cx-image-viewer-example-basic">
    <h3>图片预览</h3>
    <p class="cx-image-viewer-example-basic__desc">点击图片打开预览器</p>
    <div class="cx-image-viewer-example-basic__grid">
      <img
        v-for="(url, idx) in images"
        :key="idx"
        :src="url"
        class="cx-image-viewer-example-basic__thumb"
        @click="openViewer(idx)"
      />
    </div>
    <CxImageViewer v-model="visible" :url-list="images" :initial-index="currentIndex" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxImageViewer from '../CxImageViewer.vue'

defineOptions({ name: 'CxImageViewerExampleBasic' })

const visible = ref(false)
const currentIndex = ref(0)

const images = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
]

function openViewer(index: number) {
  currentIndex.value = index
  visible.value = true
}
</script>

<style scoped lang="scss">
.cx-image-viewer-example-basic {
  &__desc {
    color: #909399;
    font-size: 13px;
    margin-bottom: 12px;
  }

  &__grid {
    display: flex;
    gap: 12px;
  }

  &__thumb {
    width: 120px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
