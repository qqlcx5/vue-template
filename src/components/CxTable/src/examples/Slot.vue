<template>
  <div class="cx-table-example-slot">
    <h3>自定义列 + 工具栏</h3>
    <CxTable :columns="columns" :data="tableData" show-toolbar :toolbar="['refresh', 'density']">
      <template #action>
        <el-button size="small" type="primary" text>编辑</el-button>
        <el-button size="small" type="danger" text>删除</el-button>
      </template>
    </CxTable>
  </div>
</template>

<script setup lang="ts">
import CxTable from '../CxTable.vue'

defineOptions({ name: 'CxTableExampleSlot' })

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'action', label: '操作', width: 150 },
]

const tableData = [
  { name: '张三', age: 28 },
  { name: '李四', age: 32 },
]
</script>
