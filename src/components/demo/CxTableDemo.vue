<template>
  <div class="demo-page">
    <el-card header="CxTable 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-table-demo__section">
        <CxTable :data="tableData" :columns="columns" />
      </div>

      <!-- 场景2：索引列 -->
      <h3>场景2：索引列</h3>
      <div class="cx-table-demo__section">
        <CxTable :data="tableData" :columns="columns" show-index :index-width="80" />
      </div>

      <!-- 场景3：选择列 -->
      <h3>场景3：选择列</h3>
      <div class="cx-table-demo__section">
        <p class="cx-table-demo__value">已选行数：{{ selection.length }}</p>
        <CxTable :data="tableData" :columns="columns" show-selection :selection="selection" @selection-change="handleSelectionChange" />
      </div>

      <!-- 场景4：斑马纹 + 边框 -->
      <h3>场景4：斑马纹 + 边框</h3>
      <div class="cx-table-demo__section">
        <CxTable :data="tableData" :columns="columns" stripe border />
      </div>

      <!-- 场景5：展开行 -->
      <h3>场景5：展开行</h3>
      <div class="cx-table-demo__section">
        <CxTable :data="tableData" :columns="columns" expandable>
          <template #expand="{ row }">
            <p style="margin: 0; padding: 12px;">
              展开行详情 — {{ row.name }} 的扩展信息：居住于 {{ row.address }}，日期 {{ row.date }}
            </p>
          </template>
        </CxTable>
      </div>

      <!-- 场景6：行点击 + 排序 -->
      <h3>场景6：行点击 + 排序</h3>
      <div class="cx-table-demo__section">
        <CxTable :data="tableData" :columns="sortColumns" border @row-click="handleRowClick" @sort-change="handleSortChange" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxTable } from '@/components/CxTable'
import type { TableColumn } from '@/components/CxTable'

defineOptions({
  name: 'CxTableDemo'
})

const selection = ref<any[]>([])

const tableData = ref([
  { id: 1, name: '张三', age: 28, address: '北京市朝阳区', date: '2026-01-15' },
  { id: 2, name: '李四', age: 32, address: '上海市浦东新区', date: '2026-02-20' },
  { id: 3, name: '王五', age: 25, address: '广州市天河区', date: '2026-03-10' },
  { id: 4, name: '赵六', age: 35, address: '深圳市南山区', date: '2026-04-05' },
  { id: 5, name: '孙七', age: 29, address: '杭州市西湖区', date: '2026-05-18' }
])

const columns: TableColumn[] = [
  { field: 'name', label: '姓名', width: 120 },
  { field: 'age', label: '年龄', width: 80 },
  { field: 'address', label: '地址', minWidth: 180 },
  { field: 'date', label: '日期', width: 140 }
]

const sortColumns: TableColumn[] = [
  { field: 'name', label: '姓名', width: 120 },
  { field: 'age', label: '年龄', width: 80, sortable: true },
  { field: 'address', label: '地址', minWidth: 180 },
  { field: 'date', label: '日期', width: 140, sortable: true }
]

function handleSelectionChange(val: any[]) {
  selection.value = val
  console.log('[CxTable] selection-change:', val)
}

function handleRowClick(row: any) {
  console.log('[CxTable] row-click:', row)
}

function handleSortChange(val: any) {
  console.log('[CxTable] sort-change:', val)
}
</script>

<style scoped lang="scss">
.cx-table-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }

  &__value {
    margin: 0 0 8px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}
</style>
