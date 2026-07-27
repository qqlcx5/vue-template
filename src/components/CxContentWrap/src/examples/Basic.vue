<template>
  <div class="cx-content-wrap-example-basic">
    <h3>内容包裹容器</h3>
    <CxContentWrap>
      <p>这是被包裹的内容区域，默认白色背景、16px 内边距、4px 圆角。</p>
      <p>所有内容都会在这个统一的容器内展示。</p>
    </CxContentWrap>
  </div>
</template>

<script setup lang="ts">
import CxContentWrap from '../CxContentWrap.vue'

defineOptions({ name: 'CxContentWrapExampleBasic' })
</script>
