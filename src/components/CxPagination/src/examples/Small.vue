<template>
  <div class="cx-pagination-example-small">
    <h3>小型分页</h3>
    <p class="cx-pagination-example-small__desc">适合弹窗或卡片内部使用</p>
    <CxPagination v-model="page" :pageSize="10" :total="50" small />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxPagination from '../CxPagination.vue'

defineOptions({ name: 'CxPaginationExampleSmall' })

const page = ref(1)
</script>

<style scoped lang="scss">
.cx-pagination-example-small {
  &__desc {
    color: #909399;
    font-size: 13px;
    margin-bottom: 12px;
  }
}
</style>
