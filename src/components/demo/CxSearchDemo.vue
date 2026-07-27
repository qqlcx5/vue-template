<template>
  <div class="demo-page">
    <el-card header="CxSearch 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法（inline 布局）</h3>
      <div class="cx-search-demo__section">
        <CxSearch
          v-model="searchForm1"
          :schema="schema"
          @search="handleSearch"
          @reset="handleReset"
        />
      </div>

      <!-- 场景2：底部布局 -->
      <h3>场景2：底部布局</h3>
      <div class="cx-search-demo__section">
        <CxSearch
          v-model="searchForm2"
          :schema="schema"
          layout="bottom"
          @search="handleSearch"
          @reset="handleReset"
        />
      </div>

      <!-- 场景3：折叠模式 -->
      <h3>场景3：折叠模式（超过 2 个时折叠）</h3>
      <div class="cx-search-demo__section">
        <CxSearch
          v-model="searchForm3"
          :schema="schema"
          :collapse-threshold="2"
          @search="handleSearch"
          @reset="handleReset"
        />
      </div>

      <!-- 场景4：自定义按钮文字 -->
      <h3>场景4：自定义按钮文字</h3>
      <div class="cx-search-demo__section">
        <CxSearch
          v-model="searchForm4"
          :schema="schema"
          search-text="查询"
          reset-text="清空"
          @search="handleSearch"
          @reset="handleReset"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxSearch } from '@/components/CxSearch'
import type { SearchSchemaItem } from '@/components/CxSearch'

defineOptions({
  name: 'CxSearchDemo'
})

const searchForm1 = ref({
  keyword: '',
  date: '',
  status: ''
})

const searchForm2 = ref({
  keyword: '',
  date: '',
  status: ''
})

const searchForm3 = ref({
  keyword: '',
  date: '',
  status: ''
})

const searchForm4 = ref({
  keyword: '',
  date: '',
  status: ''
})

const schema: SearchSchemaItem[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'el-input',
    componentProps: {
      placeholder: '请输入关键字',
      clearable: true
    }
  },
  {
    field: 'date',
    label: '日期',
    component: 'el-date-picker',
    componentProps: {
      type: 'date',
      placeholder: '选择日期'
    }
  },
  {
    field: 'status',
    label: '状态',
    component: 'el-select-v2',
    componentProps: {
      placeholder: '请选择状态',
      clearable: true,
      style: 'width: 160px',
      options: [
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' }
      ]
    }
  }
]

function handleSearch(model: any) {
  console.log('[CxSearch] search:', model)
}

function handleReset(model: any) {
  console.log('[CxSearch] reset:', model)
}
</script>

<style scoped lang="scss">
.cx-search-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
