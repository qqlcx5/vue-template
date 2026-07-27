<template>
  <div class="cx-pagination-example-basic">
    <h3>基础分页</h3>
    <CxPagination v-model="page" v-model:pageSize="pageSize" :total="100" />
    <p class="cx-pagination-example-basic__info">当前第 {{ page }} 页，每页 {{ pageSize }} 条</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxPagination from '../CxPagination.vue'

defineOptions({ name: 'CxPaginationExampleBasic' })

const page = ref(1)
const pageSize = ref(10)
</script>

<style scoped lang="scss">
.cx-pagination-example-basic {
  &__info {
    margin-top: 12px;
    color: #606266;
    font-size: 14px;
  }
}
</style>
