<template>
  <div class="cx-left-select-tree-example-basic">
    <h3>左树右表布局</h3>
    <CxLeftSelectTree :tree-data="treeData" :tree-width="240">
      <template #tree>
        <el-tree :data="treeData" :props="{ children: 'children', label: 'label' }" node-key="id" @node-click="onNodeClick" />
      </template>
      <div style="padding: 16px">
        <p v-if="currentDept">当前选中: {{ currentDept.label }}</p>
        <p v-else style="color: #909399">请选择左侧部门</p>
      </div>
    </CxLeftSelectTree>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxLeftSelectTree from '../CxLeftSelectTree.vue'

defineOptions({ name: 'CxLeftSelectTreeExampleBasic' })

const currentDept = ref<{ label: string } | null>(null)

const treeData = [
  { id: '1', label: '技术部', children: [{ id: '1-1', label: '前端组' }, { id: '1-2', label: '后端组' }] },
  { id: '2', label: '产品部' },
  { id: '3', label: '设计部' },
]

function onNodeClick(data: { label: string }) {
  currentDept.value = data
}
</script>
