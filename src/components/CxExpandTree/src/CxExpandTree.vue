<template>
  <el-tree
    ref="treeRef"
    :data="data"
    :show-checkbox="showCheckbox"
    :node-key="nodeKey"
    :default-expanded-keys="defaultExpandedKeys"
    :default-checked-keys="checkedKeys"
    :check-strictly="checkStrictly"
    :props="{ children: 'children', label: 'label' }"
    highlight-current
    class="cx-expand-tree"
    @node-click="handleNodeClick"
    @check="handleCheck"
    @node-expand="handleExpand"
    @node-collapse="handleCollapse"
  >
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope" />
    </template>
  </el-tree>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { CxExpandTreeProps, CxExpandTreeEmits } from './types'

defineOptions({ name: 'CxExpandTree' })

const props = withDefaults(defineProps<CxExpandTreeProps>(), {
  data: () => [],
  modelValue: () => [],
  nodeKey: 'id',
  defaultExpandLevel: 1,
  showCheckbox: false,
  checkStrictly: false,
  checkedKeys: () => [],
})

const emit = defineEmits<CxExpandTreeEmits>()

const treeRef = ref()
const expandedKeys = ref<(string | number)[]>([])

const defaultExpandedKeys = computed(() => {
  const keys: (string | number)[] = []
  const collect = (nodes: any[], level: number) => {
    if (level >= props.defaultExpandLevel) return
    for (const node of nodes) {
      keys.push(node[props.nodeKey])
      if (node.children) collect(node.children, level + 1)
    }
  }
  collect(props.data ?? [], 0)
  return keys
})

watch(() => props.modelValue, (val) => {
  if (val) expandedKeys.value = val
}, { immediate: true })

watch(() => props.checkedKeys, (val) => {
  if (!val || !treeRef.value) return
  nextTick(() => {
    treeRef.value.setCheckedKeys(val)
  })
}, { immediate: true })

function handleNodeClick(node: any) {
  emit('node-click', node)
}

function handleCheck(_checkedNode: any, checkedInfo: { checkedKeys: (string | number)[] }) {
  emit('update:checkedKeys', checkedInfo.checkedKeys)
}

function handleExpand(data: any) {
  expandedKeys.value.push(data[props.nodeKey])
  emit('update:modelValue', [...expandedKeys.value])
}

function handleCollapse(data: any) {
  expandedKeys.value = expandedKeys.value.filter(k => k !== data[props.nodeKey])
  emit('update:modelValue', [...expandedKeys.value])
}

defineExpose({
  treeRef,
  getTree: () => treeRef.value,
})
</script>
