<template>
  <div class="cx-error-example-500">
    <h3>500 服务异常</h3>
    <CxError status="500" message="服务器开小差了，请稍后重试" show-back show-retry />
  </div>
</template>

<script setup lang="ts">
import CxError from '../CxError.vue'

defineOptions({ name: 'CxErrorExample500' })
</script>
