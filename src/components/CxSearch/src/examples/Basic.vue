<template>
  <div class="cx-search-example-basic">
    <h3>Schema 搜索栏</h3>
    <CxSearch :schema="schema" v-model="query" @search="onSearch" @reset="onReset" />
    <p class="cx-search-example-basic__result">查询结果: {{ JSON.stringify(query) }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import CxSearch from '../CxSearch.vue'

defineOptions({ name: 'CxSearchExampleBasic' })

const query = reactive({
  name: '',
  status: undefined,
})

const schema = [
  { field: 'name', label: '姓名', component: 'input', props: { placeholder: '请输入姓名' } },
  {
    field: 'status',
    label: '状态',
    component: 'select',
    props: {
      placeholder: '请选择',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
]

function onSearch() {
  console.log('search', query)
}

function onReset() {
  console.log('reset')
}
</script>

<style scoped lang="scss">
.cx-search-example-basic {
  &__result {
    margin-top: 12px;
    padding: 8px;
    background: #f5f7fa;
    border-radius: 4px;
    font-size: 13px;
  }
}
</style>
