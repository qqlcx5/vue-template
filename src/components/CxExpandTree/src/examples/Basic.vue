<template>
  <div class="cx-expand-tree-example-basic">
    <h3>树形控件（可展开/折叠/过滤）</h3>
    <CxExpandTree :data="treeData" show-expand-all filterable checkable @check="onCheck" />
    <p class="cx-expand-tree-example-basic__value">已选: {{ checkedKeys }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxExpandTree from '../CxExpandTree.vue'

defineOptions({ name: 'CxExpandTreeExampleBasic' })

const checkedKeys = ref<string[]>([])

const treeData = [
  {
    id: '1',
    label: '一级 1',
    children: [
      { id: '1-1', label: '二级 1-1' },
      { id: '1-2', label: '二级 1-2' },
    ],
  },
  {
    id: '2',
    label: '一级 2',
    children: [
      { id: '2-1', label: '二级 2-1' },
      { id: '2-2', label: '二级 2-2' },
    ],
  },
]

function onCheck(_data: any, { checkedKeys: keys }: { checkedKeys: string[] }) {
  checkedKeys.value = keys
}
</script>

<style scoped lang="scss">
.cx-expand-tree-example-basic {
  &__value {
    margin-top: 12px;
    color: #909399;
    font-size: 13px;
  }
}
</style>
