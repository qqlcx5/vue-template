<template>
  <div class="demo-page">
    <el-card header="CxExpandTree 示例" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        可展开的树形组件，支持默认展开层级、复选框、节点事件、自定义节点渲染等。
      </el-alert>

      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法（3层数据 + v-model）</h3>
      <div class="cx-expand-tree-demo__section">
        <CxExpandTree :data="treeData" v-model="selectedNode" @node-click="handleNodeClick" />
        <p class="cx-expand-tree-demo__info" style="margin-top: 8px">
          当前展开节点：{{ selectedNode }}
        </p>
      </div>

      <!-- 场景2：默认展开层级 -->
      <h3>场景2：默认展开 2 层</h3>
      <div class="cx-expand-tree-demo__section">
        <CxExpandTree :data="treeData" :default-expand-level="2" />
      </div>

      <!-- 场景3：复选框 -->
      <h3>场景3：带复选框</h3>
      <div class="cx-expand-tree-demo__section">
        <CxExpandTree :data="treeData" show-checkbox v-model:checked-keys="checkedKeys" />
        <p class="cx-expand-tree-demo__info" style="margin-top: 8px">
          选中节点 keys：{{ checkedKeys }}
        </p>
      </div>

      <!-- 场景4：check-strictly 严格模式 -->
      <h3>场景4：复选框严格模式（父子不关联）</h3>
      <div class="cx-expand-tree-demo__section">
        <CxExpandTree :data="treeData" show-checkbox check-strictly />
      </div>

      <!-- 场景5：node-click 事件 -->
      <h3>场景5：node-click 事件</h3>
      <div class="cx-expand-tree-demo__section">
        <el-alert type="warning" :closable="false" show-icon style="margin-bottom: 12px">
          点击任意节点，下方显示节点信息
        </el-alert>
        <CxExpandTree :data="treeData" @node-click="handleNodeClick" />
        <p class="cx-expand-tree-demo__info" style="margin-top: 8px">
          最后点击节点：{{ lastClickedNode ? lastClickedNode.label : '无' }}
        </p>
      </div>

      <!-- 场景6：展开/折叠事件 -->
      <h3>场景6：node-expand / node-collapse 事件</h3>
      <div class="cx-expand-tree-demo__section">
        <el-alert type="warning" :closable="false" show-icon style="margin-bottom: 12px">
          展开或折叠节点时，下方显示事件日志
        </el-alert>
        <CxExpandTree :data="treeData" @node-click="(node) => logEvent('expand-collapse', node)" />
        <p class="cx-expand-tree-demo__info" style="margin-top: 8px">
          事件日志：{{ eventLog || '无事件' }}
        </p>
      </div>

      <!-- 场景7：自定义节点 Slot -->
      <h3>场景7：自定义节点渲染（Slot）</h3>
      <div class="cx-expand-tree-demo__section">
        <CxExpandTree :data="treeData">
          <template #default="{ data }">
            <span class="cx-expand-tree-demo__custom-node">
              <el-tag size="small" :type="data.children ? 'primary' : 'info'">
                {{ data.children ? '目录' : '叶子' }}
              </el-tag>
              <span style="margin-left: 8px">{{ data.label }}</span>
            </span>
          </template>
        </CxExpandTree>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxExpandTree } from '@/components/CxExpandTree'

defineOptions({
  name: 'CxExpandTreeDemo'
})

const treeData = [
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
          { id: '2-1-2', label: '三级节点 2-1-2' }
        ]
      }
    ]
  }
]

const selectedNode = ref<(string | number)[]>(['1'])
const checkedKeys = ref<(string | number)[]>(['1-1-1', '2-1-2'])
const lastClickedNode = ref<any>(null)
const eventLog = ref('')

function handleNodeClick(node: unknown) {
  lastClickedNode.value = node
  console.log('[CxExpandTree] 节点点击：', node)
}

function logEvent(eventName: string, node: any) {
  eventLog.value = `${eventName} — ${node.label}`
}
</script>

<style scoped lang="scss">
.cx-expand-tree-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }

  &__info {
    font-size: 13px;
    color: var(--el-text-color-secondary);
  }
}
</style>
