<template>
  <div class="demo-page">
    <el-card header="CxTreeLine — 树形连线组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxTreeLine 为 Element Plus 的 el-tree / el-tree-v2 提供树形结构引导线（虚线），
        在树节点内容区域绘制纵向层级连线和横向分支线，增强层级视觉感知。
      </el-alert>

      <!-- 场景1：基础用法 el-tree + CxTreeLine -->
      <h3>场景1：基础用法（el-tree + CxTreeLine）</h3>
      <el-tree :data="treeData" node-key="id" default-expand-all>
        <template #default="{ node, data }">
          <CxTreeLine :node="node" :data="data" />
        </template>
      </el-tree>

      <!-- 场景2：el-tree-v2 虚拟树 -->
      <h3>场景2：el-tree-v2 虚拟树（必须传 treeData）</h3>
      <el-tree-v2
        :data="largeTreeData"
        :props="{ label: 'name', children: 'children' }"
        :height="300"
        node-key="id"
        default-expand-all
      >
        <template #default="{ node, data }">
          <CxTreeLine
            :node="node"
            :data="data"
            :tree-data="largeTreeData"
          />
        </template>
      </el-tree-v2>

      <!-- 场景3：自定义节点标签 -->
      <h3>场景3：自定义节点标签（#node-label 插槽）</h3>
      <el-tree :data="treeData" node-key="id" default-expand-all>
        <template #default="{ node, data }">
          <CxTreeLine :node="node" :data="data">
            <template #node-label="{ data }">
              <span style="color: #409eff; font-weight: bold">
                {{ data.label }}
              </span>
            </template>
          </CxTreeLine>
        </template>
      </el-tree>

      <!-- 场景4：标签后添加操作按钮 -->
      <h3>场景4：标签后添加操作按钮（#after-node-label 插槽）</h3>
      <el-tree :data="treeData" node-key="id" default-expand-all>
        <template #default="{ node, data }">
          <CxTreeLine :node="node" :data="data">
            <template #after-node-label="{ data }">
              <el-button size="small" text @click="onEdit(data)">编辑</el-button>
              <el-button size="small" text type="danger" @click="onDelete(data.id)">删除</el-button>
            </template>
          </CxTreeLine>
        </template>
      </el-tree>

      <!-- 场景5：完全自定义节点内容 -->
      <h3>场景5：完全自定义节点内容（#default 插槽）</h3>
      <el-tree :data="treeData2" node-key="id" default-expand-all>
        <template #default="{ node, data }">
          <CxTreeLine :node="node" :data="data">
            <template #default>
              <div class="custom-node">
                <span class="custom-node__label">{{ data.label }}</span>
                <el-tag size="small" :type="data.type">{{ data.count }}</el-tag>
              </div>
            </template>
          </CxTreeLine>
        </template>
      </el-tree>

      <!-- 场景6：隐藏标签横线 + 自定义缩进 -->
      <h3>场景6：隐藏标签横线 + 自定义缩进</h3>
      <el-tree :data="treeData" node-key="id" default-expand-all :indent="24">
        <template #default="{ node, data }">
          <CxTreeLine
            :node="node"
            :data="data"
            :indent="24"
            :show-label-line="false"
          />
        </template>
      </el-tree>
    </el-card>

    <!-- 复选框模式 -->
    <el-card header="复选框模式" shadow="never" class="demo-card">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxTreeLine 作为纯展示组件，与 el-tree 的 show-checkbox 无缝配合，引导线不受复选框影响。
      </el-alert>
      <h3>场景7：复选框模式（show-checkbox + CxTreeLine）</h3>
      <el-tree
        ref="checkTreeRef"
        :data="treeData"
        node-key="id"
        default-expand-all
        show-checkbox
        :default-checked-keys="[2, 4]"
      >
        <template #default="{ node, data }">
          <CxTreeLine :node="node" :data="data" />
        </template>
      </el-tree>
      <div style="margin-top: 8px; display: flex; gap: 8px">
        <el-button size="small" @click="onGetCheckedKeys">获取已选节点</el-button>
        <el-button size="small" @click="onGetCheckedNodes">获取已选节点数据</el-button>
        <el-button size="small" @click="onSetCheckedKeys">选中 [4, 5]</el-button>
        <el-button size="small" @click="onResetChecked">重置选中</el-button>
      </div>
    </el-card>

    <!-- 节点点击事件 -->
    <el-card header="节点点击事件" shadow="never" class="demo-card">
      <h3>场景8：监听节点点击（node-click + CxTreeLine）</h3>
      <el-tree
        ref="clickTreeRef"
        :data="treeData"
        node-key="id"
        default-expand-all
        highlight-current
        @node-click="onNodeClick"
      >
        <template #default="{ node, data }">
          <CxTreeLine :node="node" :data="data" />
        </template>
      </el-tree>
      <div class="demo-event-info" v-if="clickedNodeInfo">
        最后点击：{{ clickedNodeInfo }}
      </div>
    </el-card>

    <!-- 节点过滤搜索 -->
    <el-card header="节点过滤搜索" shadow="never" class="demo-card">
      <h3>场景9：节点过滤（filter-node-method + CxTreeLine）</h3>
      <el-input
        v-model="filterText"
        placeholder="输入关键字过滤节点"
        clearable
        style="margin-bottom: 8px; width: 260px"
      />
      <el-tree
        ref="filterTreeRef"
        :data="treeData"
        node-key="id"
        default-expand-all
        :filter-node-method="filterNode"
      >
        <template #default="{ node, data }">
          <CxTreeLine :node="node" :data="data" />
        </template>
      </el-tree>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import CxTreeLine from '@/components/CxTreeLine'

// 场景1/3/4/6：基础树数据
const treeData = [
  {
    id: 1,
    label: '一级节点',
    children: [
      { id: 2, label: '二级节点 A' },
      {
        id: 3,
        label: '二级节点 B',
        children: [
          { id: 4, label: '三级节点 A' },
          { id: 5, label: '三级节点 B' }
        ]
      },
      { id: 6, label: '二级节点 C' }
    ]
  },
  {
    id: 7,
    label: '一级节点 B',
    children: [
      { id: 8, label: '二级节点 D' }
    ]
  }
]

// 场景2：虚拟树大数据
const largeTreeData = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `根节点 ${i + 1}`,
  children: Array.from({ length: 10 }, (_, j) => ({
    id: i * 10 + j + 100,
    name: `子节点 ${i + 1}-${j + 1}`,
    children: Array.from({ length: 3 }, (_, k) => ({
      id: i * 100 + j * 10 + k + 1000,
      name: `叶节点 ${i + 1}-${j + 1}-${k + 1}`
    }))
  }))
}))

// 场景5：带额外数据的树
const treeData2 = [
  {
    id: 1,
    label: '项目管理',
    count: 12,
    type: 'primary' as const,
    children: [
      { id: 2, label: '需求分析', count: 5, type: 'success' as const },
      { id: 3, label: '开发中', count: 4, type: 'warning' as const },
      { id: 4, label: '已完成', count: 3, type: 'info' as const }
    ]
  }
]

// 场景4：操作按钮
function onEdit(data: any) {
  ElMessage.info(`编辑：${data.label}`)
}

function onDelete(id: number) {
  ElMessage.warning(`删除节点 ID：${id}`)
}

// 场景7：复选框模式
const checkTreeRef = ref()
function onGetCheckedKeys() {
  const keys = checkTreeRef.value?.getCheckedKeys() || []
  ElMessage.info(`已选 keys: ${JSON.stringify(keys)}`)
}
function onGetCheckedNodes() {
  const nodes = checkTreeRef.value?.getCheckedNodes() || []
  ElMessage.info(`已选节点数: ${nodes.length}`)
}
function onSetCheckedKeys() {
  checkTreeRef.value?.setCheckedKeys([4, 5])
}
function onResetChecked() {
  checkTreeRef.value?.setCheckedKeys([])
}

// 场景8：节点点击事件
const clickTreeRef = ref()
const clickedNodeInfo = ref('')
function onNodeClick(data: any, node: any) {
  clickedNodeInfo.value = `${data.label} (ID: ${data.id}, Level: ${node.level}, isLeaf: ${node.isLeaf})`
}

// 场景9：节点过滤搜索
const filterTreeRef = ref()
const filterText = ref('')
watch(filterText, (val) => {
  filterTreeRef.value?.filter(val)
})
function filterNode(value: string, data: any) {
  if (!value) return true
  return data.label.includes(value)
}
</script>

<style scoped lang="scss">
.demo-page {
  padding: 16px;

  h3 {
    margin: 16px 0 8px;
    font-size: 15px;
    color: var(--el-text-color-primary);
  }
}

.custom-node {
  display: flex;
  align-items: center;
  gap: 8px;

  &__label {
    font-size: 13px;
  }
}

.demo-card {
  margin-top: 16px;
}

.demo-event-info {
  margin-top: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--el-color-info);
  background: var(--el-color-info-light-9);
  border-radius: 4px;
}
</style>
