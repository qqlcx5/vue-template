<template>
  <div class="demo-page">
    <el-card header="CxTree 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-tree-demo__section">
        <p class="cx-tree-demo__value">当前选中节点：{{ selectedNode }}</p>
        <CxTree v-model="selectedNode" :data="treeData" node-key="id" highlight-current />
      </div>

      <!-- 场景2：带搜索 -->
      <h3>场景2：带搜索</h3>
      <div class="cx-tree-demo__section">
        <CxTree
          v-model="selectedNode2"
          :data="treeData"
          node-key="id"
          filterable
          filter-placeholder="请输入关键词搜索"
        />
      </div>

      <!-- 场景3：复选框 -->
      <h3>场景3：复选框</h3>
      <div class="cx-tree-demo__section">
        <CxTree
          v-model="selectedNode3"
          :data="treeData"
          node-key="id"
          show-checkbox
        />
      </div>

      <!-- 场景4：默认展开 -->
      <h3>场景4：默认展开至第 2 层</h3>
      <div class="cx-tree-demo__section">
        <CxTree
          v-model="selectedNode4"
          :data="treeData"
          node-key="id"
          :default-expand-level="2"
          @node-click="handleNodeClick"
          @node-contextmenu="handleNodeContextmenu"
        />
      </div>

      <!-- 场景5：父子不互相关联 -->
      <h3>场景5：父子不互相关联</h3>
      <div class="cx-tree-demo__section">
        <CxTree
          v-model="selectedNode5"
          :data="treeData"
          node-key="id"
          show-checkbox
          check-strictly
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxTree } from '@/components/CxTree'
import type { TreeNode } from '@/components/CxTree'

defineOptions({
  name: 'CxTreeDemo'
})

const selectedNode = ref()
const selectedNode2 = ref()
const selectedNode3 = ref()
const selectedNode4 = ref()
const selectedNode5 = ref()

const treeData: TreeNode[] = [
  {
    id: '1',
    label: '一级节点 1',
    children: [
      {
        id: '1-1',
        label: '二级节点 1-1',
        children: [
          { id: '1-1-1', label: '三级节点 1-1-1' },
          { id: '1-1-2', label: '三级节点 1-1-2' }
        ]
      },
      {
        id: '1-2',
        label: '二级节点 1-2',
        children: [
          { id: '1-2-1', label: '三级节点 1-2-1' }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '一级节点 2',
    children: [
      {
        id: '2-1',
        label: '二级节点 2-1',
        children: [
          { id: '2-1-1', label: '三级节点 2-1-1' },
          { id: '2-1-2', label: '三级节点 2-1-2' },
          { id: '2-1-3', label: '三级节点 2-1-3' }
        ]
      },
      { id: '2-2', label: '二级节点 2-2' }
    ]
  },
  {
    id: '3',
    label: '一级节点 3'
  }
]

function handleNodeClick(node: any, data: any) {
  console.log('[CxTree] node-click:', node, data)
}

function handleNodeContextmenu(event: Event, node: any, data: any) {
  console.log('[CxTree] node-contextmenu:', node, data)
  event.preventDefault()
}
</script>

<style scoped lang="scss">
.cx-tree-demo {
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
