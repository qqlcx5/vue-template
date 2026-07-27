<template>
  <div class="cx-error-example-403">
    <h3>403 权限不足</h3>
    <CxError status="403" message="您没有访问该页面的权限" show-back />
  </div>
</template>

<script setup lang="ts">
import CxError from '../CxError.vue'

defineOptions({ name: 'CxErrorExample403' })
</script>
