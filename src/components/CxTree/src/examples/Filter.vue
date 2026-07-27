<template>
  <div class="cx-tree-example-filter">
    <h3>可过滤树</h3>
    <el-input v-model="filterText" placeholder="输入关键词过滤" style="margin-bottom: 12px; width: 240px" />
    <CxTree :data="treeData" filterable :filter-text="filterText" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxTree from '../CxTree.vue'

defineOptions({ name: 'CxTreeExampleFilter' })

const filterText = ref('')

const treeData = [
  { id: '1', label: '技术部', children: [{ id: '1-1', label: '前端组' }, { id: '1-2', label: '后端组' }] },
  { id: '2', label: '产品部' },
  { id: '3', label: '设计部' },
]
</script>
