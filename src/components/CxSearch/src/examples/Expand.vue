<template>
  <div class="cx-search-example-expand">
    <h3>多行搜索（自动折叠）</h3>
    <CxSearch :schema="schema" v-model="query" @search="onSearch" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import CxSearch from '../CxSearch.vue'

defineOptions({ name: 'CxSearchExampleExpand' })

const query = reactive({
  name: '',
  status: undefined,
  date: [],
  dept: '',
  keyword: '',
})

const schema = [
  { field: 'name', label: '姓名', component: 'input', props: { placeholder: '请输入' } },
  { field: 'status', label: '状态', component: 'select', props: { options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] } },
  { field: 'date', label: '日期', component: 'daterange', props: {} },
  { field: 'dept', label: '部门', component: 'input', props: { placeholder: '请输入部门' } },
  { field: 'keyword', label: '关键词', component: 'input', props: { placeholder: '请输入' }, colProps: { span: 8 } },
]

function onSearch() {
  console.log('search', query)
}
</script>
