<template>
  <div class="cx-table">
    <el-table
      ref="tableRef"
      :data="data"
      :max-height="maxHeight"
      :border="border"
      :stripe="stripe"
      :row-key="rowKey"
      :default-sort="{}"
      v-loading="loading"
      element-loading-text="加载中..."
      :empty-text="emptyText"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @sort-change="handleSortChange"
      v-bind="$attrs"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        width="50"
        align="center"
      />
      <el-table-column
        v-if="showIndex"
        type="index"
        :width="indexWidth"
        label="序号"
        align="center"
      />
      <el-table-column
        v-if="expandable"
        type="expand"
        width="50"
      >
        <template #default="scope">
          <slot name="expand" :row="scope.row" />
        </template>
      </el-table-column>
      <template v-for="col in visibleColumns" :key="col.field">
        <el-table-column
          :prop="col.field"
          :label="col.label"
          :width="col.width"
          :min-width="col.minWidth"
          :fixed="col.fixed"
          :sortable="col.sortable"
          :show-overflow-tooltip="col.showOverflowTooltip ?? true"
          :align="col.align ?? 'left'"
        >
          <template #default="scope">
            <slot
              v-if="$slots[col.field]"
              :name="col.field"
              :row="scope.row"
              :column="scope.column"
              :index="scope.$index"
            />
            <span v-else>
              {{ col.formatter ? col.formatter(scope.row, scope.column, scope.row[col.field], scope.$index) : scope.row[col.field] }}
            </span>
          </template>
          <template v-if="col.headerRenderer" #header>
            <component :is="col.headerRenderer" />
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CxTableProps, CxTableEmits } from './types'

defineOptions({ name: 'CxTable' })

const props = withDefaults(defineProps<CxTableProps>(), {
  data: () => [],
  columns: () => [],
  showIndex: false,
  indexWidth: '60',
  showSelection: false,
  selection: () => [],
  border: true,
  stripe: false,
  rowKey: 'id',
  expandable: false,
  loading: false,
  emptyText: '暂无数据',
})

const emit = defineEmits<CxTableEmits>()

const tableRef = ref()

const visibleColumns = computed(() => {
  return (props.columns ?? []).filter(col => !col.hidden)
})

function handleSelectionChange(selection: Record<string, any>[]) {
  emit('selection-change', selection)
}

function handleRowClick(row: Record<string, any>, column: any, event: Event) {
  emit('row-click', row, column, event)
}

function handleSortChange(sort: { prop: string; order: string }) {
  emit('sort-change', sort)
}
</script>

<style scoped lang="scss">
.cx-table {
  width: 100%;
}
</style>
