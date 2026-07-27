<!-- ErpProTable.vue -->
<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, reactive, onMounted, useSlots } from 'vue'
import type { ErpColumn, ApiFn } from './types'
import { ElInput, ElSelect, ElOption, ElDatePicker, ElPagination, ElButton } from 'element-plus'

const props = defineProps<{
  columns: ErpColumn<T>[]
  api: ApiFn<T>
  height?: string | number
}>()

// 1. 响应式状态封装 (闭环管理)
const loading = ref(false)
const tableData = ref<T[]>([])
const searchForm = reactive<Record<string, any>>({})

const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
})

// 2. 初始化默认搜索值
props.columns.forEach(col => {
  if (col.search && col.search.defaultValue !== undefined) {
    searchForm[col.field] = col.search.defaultValue
  }
})

// 3. 数据请求核心逻辑
const fetchData = async () => {
  loading.value = true
  try {
    const queryParams = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      ...searchForm
    }
    const { list, total } = await props.api(queryParams)
    tableData.value = list as any
    pagination.total = total
  } finally {
    loading.value = false
  }
}

// 4. 事件触发器
const handleSearch = () => {
  pagination.currentPage = 1 // 搜索重置回第一页
  fetchData()
}

const handleReset = () => {
  Object.keys(searchForm).forEach(key => {
    delete searchForm[key]
  })
  handleSearch()
}

const handlePageChange = (page: number) => {
  pagination.currentPage = page
  fetchData()
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  pagination.currentPage = 1
  fetchData()
}

// 暴露刷新方法给父组件
defineExpose({
  refresh: fetchData,
  reset: handleReset,
  getSearchForm: () => ({ ...searchForm })
})

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="erp-pro-table-container">
    <!-- 顶部全局操作栏 (重置按钮/自定义按钮) -->
    <div class="table-toolbar">
      <slot name="toolbar">
        <el-button type="warning" plain size="small" @click="handleReset">重置搜索</el-button>
        <el-button type="primary" plain size="small" @click="handleSearch">刷新数据</el-button>
      </slot>
    </div>

    <!-- vxe-table 主体 -->
    <vxe-table
      :data="tableData"
      :loading="loading"
      :height="height || 'calc(100vh - 180px)'"
      border="full"
      align="center"
      size="mini"
      show-overflow
    >
      <template v-for="col in columns" :key="col.field">
        <vxe-column v-bind="col">
          <!-- 💡 核心：自定义双层表头 -->
          <template #header="{ column }">
            <div class="erp-header-wrapper">
              <!-- 第一行表头：搜索输入框 (阻止事件冒泡以防触发排序) -->
              <div class="erp-header-search" @click.stop>
                <template v-if="col.search">
                  <!-- Input 搜索 -->
                  <el-input
                    v-if="col.search?.type === 'input'"
                    v-model="searchForm[col.field]"
                    size="small"
                    placeholder="回车搜索"
                    clearable
                    v-bind="col.search.props"
                    @keyup.enter="handleSearch"
                    @clear="handleSearch"
                  />

                  <!-- Select 搜索 -->
                  <el-select
                    v-else-if="col.search?.type === 'select'"
                    v-model="searchForm[col.field]"
                    size="small"
                    placeholder="请选择"
                    clearable
                    v-bind="col.search.props"
                    @change="handleSearch"
                  >
                    <el-option
                      v-for="opt in col.search.options"
                      :key="opt.value"
                      :label="opt.label"
                      :value="opt.value"
                    />
                  </el-select>

                  <!-- Date 搜索 -->
                  <el-date-picker
                    v-else-if="col.search?.type === 'date'"
                    v-model="searchForm[col.field]"
                    size="small"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder="选择日期"
                    v-bind="col.search.props"
                    @change="handleSearch"
                  />
                </template>
                <!-- 无搜索项时的占位，保证排版对齐 -->
                <div v-else class="search-placeholder">-</div>
              </div>

              <!-- 第二行表头：列名 -->
              <div class="erp-header-title">
                {{ column.title }}
              </div>
            </div>
          </template>

          <!-- 动态自定义单元格内容 -->
          <template v-if="col.slotName" #default="scope">
            <slot :name="col.slotName" v-bind="scope"></slot>
          </template>
        </vxe-column>
      </template>
    </vxe-table>

    <!-- 底部分页 -->
    <div class="table-pagination">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<style scoped>
.erp-pro-table-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #fff;
  padding: 12px;
}

.table-toolbar {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* 双行表头样式 */
.erp-header-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
}

.erp-header-search {
  width: 100%;
  padding: 0 2px;
}

.search-placeholder {
  height: 24px;
  line-height: 24px;
  color: #ccc;
  font-size: 12px;
}

.erp-header-title {
  font-weight: bold;
  color: #333;
  line-height: 20px;
}

.table-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>
