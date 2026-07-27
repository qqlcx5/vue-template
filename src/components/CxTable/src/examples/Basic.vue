<template>
  <div class="cx-table-example-basic">
    <h3>Schema 驱动表格 + 分页</h3>
    <CxTable :columns="columns" :data="tableData" :pagination="pagination" @pageChange="onPageChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import CxTable from '../CxTable.vue'

defineOptions({ name: 'CxTableExampleBasic' })

const currentPage = ref(1)

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'email', label: '邮箱' },
]

const tableData = [
  { name: '张三', age: 28, email: 'zhangsan@example.com' },
  { name: '李四', age: 32, email: 'lisi@example.com' },
  { name: '王五', age: 25, email: 'wangwu@example.com' },
]

const pagination = reactive({ total: 100, pageSize: 10 })

function onPageChange({ page, pageSize }: { page: number; pageSize: number }) {
  currentPage.value = page
  pagination.pageSize = pageSize
}
</script>
