<template>
  <div class="cx-empty-example-action">
    <h3>带操作的空状态</h3>
    <CxEmpty description="暂无收藏内容">
      <el-button type="primary">去逛逛</el-button>
    </CxEmpty>
  </div>
</template>

<script setup lang="ts">
import CxEmpty from '../CxEmpty.vue'

defineOptions({ name: 'CxEmptyExampleAction' })
</script>
