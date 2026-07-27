<template>
  <div class="cx-tree-example-basic">
    <h3>基础树</h3>
    <CxTree :data="treeData" checkable @check="onCheck" />
    <p class="cx-tree-example-basic__value">已选: {{ checkedKeys }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxTree from '../CxTree.vue'

defineOptions({ name: 'CxTreeExampleBasic' })

const checkedKeys = ref<string[]>([])

const treeData = [
  { id: '1', label: '一级 1', children: [{ id: '1-1', label: '二级 1-1' }, { id: '1-2', label: '二级 1-2' }] },
  { id: '2', label: '一级 2', children: [{ id: '2-1', label: '二级 2-1' }] },
]

function onCheck(_data: any, { checkedKeys: keys }: { checkedKeys: string[] }) {
  checkedKeys.value = keys
}
</script>

<style scoped lang="scss">
.cx-tree-example-basic {
  &__value {
    margin-top: 12px;
    color: #909399;
    font-size: 13px;
  }
}
</style>
