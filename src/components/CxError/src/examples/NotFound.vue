<template>
  <div class="cx-error-example-404">
    <h3>404 页面不存在</h3>
    <CxError status="404" message="您访问的页面不存在" />
  </div>
</template>

<script setup lang="ts">
import CxError from '../CxError.vue'

defineOptions({ name: 'CxErrorExample404' })
</script>
