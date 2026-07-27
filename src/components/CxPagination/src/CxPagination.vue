<template>
  <el-pagination
    :class="['cx-pagination', { 'cx-pagination--small': small }]"
    :current-page="currentPage"
    :page-size="currentLimit"
    :page-sizes="pageSizes"
    :total="total"
    :layout="layout"
    :background="background"
    :small="small"
    v-bind="$attrs"
    @size-change="handleSizeChange"
    @current-change="handlePageChange"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CxPaginationProps, CxPaginationEmits } from './types'

defineOptions({ name: 'CxPagination' })

const props = withDefaults(defineProps<CxPaginationProps>(), {
  page: 1,
  limit: 10,
  total: 0,
  pageSizes: () => [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  small: false,
})

const emit = defineEmits<CxPaginationEmits>()

const currentPage = computed(() => props.page)
const currentLimit = computed(() => props.limit)

function handlePageChange(page: number) {
  emit('update:page', page)
  emit('pagination', { page, limit: currentLimit.value })
}

function handleSizeChange(limit: number) {
  emit('update:limit', limit)
  emit('pagination', { page: 1, limit })
}
</script>

<style scoped lang="scss">
.cx-pagination {
  display: flex;
  justify-content: flex-end;
  padding: 16px 0;

  &--small {
    padding: 8px 0;
  }
}
</style>
