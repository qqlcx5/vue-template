<template>
  <div class="cx-iframe-example-basic">
    <h3>iframe 容器</h3>
    <CxIFrame src="https://www.baidu.com" @load="onLoad" />
    <p class="cx-iframe-example-basic__status" v-if="loaded">加载完成</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxIFrame from '../CxIFrame.vue'

defineOptions({ name: 'CxIFrameExampleBasic' })

const loaded = ref(false)

function onLoad() {
  loaded.value = true
}
</script>

<style scoped lang="scss">
.cx-iframe-example-basic {
  &__status {
    margin-top: 8px;
    color: #67c23a;
    font-size: 13px;
  }
}
</style>
