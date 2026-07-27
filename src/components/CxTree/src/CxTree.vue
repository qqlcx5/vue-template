<template>
  <div class="cx-tree">
    <el-input
      v-if="filterable"
      v-model="filterText"
      :placeholder="filterPlaceholder"
      clearable
      class="cx-tree__filter"
    />
    <el-tree
      ref="treeRef"
      :data="data"
      :show-checkbox="showCheckbox"
      :node-key="nodeKey"
      :default-expanded-keys="defaultExpandedKeys"
      :check-strictly="checkStrictly"
      :highlight-current="highlightCurrent"
      :filter-node-method="filterNode"
      :props="{ children: 'children', label: 'label', disabled: 'disabled' }"
      @node-click="handleNodeClick"
      @node-contextmenu="handleContextMenu"
      @check="handleCheck"
    >
      <template #default="{ node, data: nodeData }">
        <slot :node="node" :data="nodeData">
          <span>{{ nodeData.label }}</span>
        </slot>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CxTreeProps, CxTreeEmits, TreeNode } from './types'

defineOptions({ name: 'CxTree' })

const props = withDefaults(defineProps<CxTreeProps>(), {
  data: () => [],
  modelValue: () => [],
  showCheckbox: false,
  filterable: false,
  filterPlaceholder: '输入关键词搜索',
  defaultExpandLevel: 1,
  nodeKey: 'id',
  highlightCurrent: false,
  checkStrictly: false,
})

const emit = defineEmits<CxTreeEmits>()

const treeRef = ref()
const filterText = ref('')

const defaultExpandedKeys = computed(() => {
  const keys: (string | number)[] = []
  const collect = (nodes: TreeNode[], level: number) => {
    if (level >= props.defaultExpandLevel) return
    for (const node of nodes) {
      keys.push(node[props.nodeKey])
      if (node.children) collect(node.children, level + 1)
    }
  }
  collect(props.data ?? [], 0)
  return keys
})

watch(filterText, (val) => {
  treeRef.value?.filter(val)
})

function filterNode(value: string, data: TreeNode) {
  if (!value) return true
  return data.label.toLowerCase().includes(value.toLowerCase())
}

function handleNodeClick(node: TreeNode) {
  emit('node-click', node)
}

function handleContextMenu(event: Event, node: TreeNode) {
  emit('node-contextmenu', event, node)
}

function handleCheck(_checkedNode: any, checkedInfo: { checkedKeys: (string | number)[] }) {
  emit('update:modelValue', checkedInfo.checkedKeys)
}
</script>

<style scoped lang="scss">
.cx-tree {
  &__filter {
    margin-bottom: 12px;
  }
}
</style>
