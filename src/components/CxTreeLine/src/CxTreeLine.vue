<template>
  <span class="cx-tree-line__label-wrapper">
    <!-- Label area -->
    <slot
      v-if="$slots.default"
      :node="node"
      :data="data"
    />
    <template v-else>
      <slot
        name="node-label"
        :node="node"
        :data="data"
      >
        <span class="cx-tree-line__label">{{ node.label }}</span>
      </slot>
      <span
        v-if="showLabelLine"
        class="cx-tree-line__label-line"
      />
      <slot
        name="after-node-label"
        :node="node"
        :data="data"
      />
    </template>

    <!-- Vertical lines -->
    <span
      v-for="(isLast, idx) in lastNodeArr"
      :key="idx"
      class="cx-tree-line__ver"
      :class="{
        'cx-tree-line__ver--last': isLast && node.level - 1 !== idx,
        'cx-tree-line__ver--last-leaf': isLast && node.level - 1 === idx
      }"
      :style="{ left: indent * idx + 'px' }"
    />

    <!-- Horizontal line -->
    <span
      class="cx-tree-line__hor"
      :style="{
        width: (node.isLeaf ? 24 : 8) + 'px',
        left: (node.level - 1) * indent + 'px'
      }"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CxTreeLineProps } from './types'

defineOptions({
  name: 'CxTreeLine'
})

const props = withDefaults(defineProps<CxTreeLineProps>(), {
  data: () => [],
  treeData: () => [],
  indent: 16,
  showLabelLine: true
})

interface AnyNode {
  key?: string
  id?: string
  level?: number
  parent?: AnyNode | null
  children?: AnyNode[]
  childNodes?: AnyNode[]
}

const lastNodeArr = computed(() => {
  const arr: boolean[] = []
  let currentNode: AnyNode = props.node as unknown as AnyNode

  while (currentNode) {
    let parentNode: AnyNode | null = currentNode.parent || null

    // el-tree-v2 兼容：第一层没有 parent，用 treeData 构造虚拟父节点
    if (currentNode.level === 1 && !currentNode.parent) {
      if (!props.treeData || !Array.isArray(props.treeData)) {
        throw new Error(
          'If using el-tree-v2 (Virtualized Tree), CxTreeLine requires treeData prop.'
        )
      }
      parentNode = {
        children: (props.treeData as any[]).map((item: any) => ({
          ...item,
          key: item.id
        })),
        level: 0,
        key: 'node-0',
        parent: null
      }
    }

    if (parentNode) {
      const siblings: AnyNode[] = parentNode.children || parentNode.childNodes || []
      const index = siblings.findIndex(
        (item) => (item.key || item.id) === (currentNode.key || currentNode.id)
      )
      arr.unshift(index === siblings.length - 1)
    }

    currentNode = parentNode!
  }

  return arr
})
</script>

<style scoped lang="scss">
$tree-line-color: #dcdfe6;
$tree-line-style: dashed;
$tree-line-width: 1px;

/* 让 el-tree-node__content 支持 relative 定位 */
:deep(.el-tree .el-tree-node__content) {
  position: relative;
}

.cx-tree-line__label-wrapper {
  display: flex;
  flex: 1;
  align-items: center;
}

.cx-tree-line__label {
  font-size: 12px;
}

.cx-tree-line__ver {
  position: absolute;
  top: 0;
  display: block;
  height: 100%;
  border-left: $tree-line-width $tree-line-style $tree-line-color;

  &--last {
    border-left-color: transparent;
  }

  &--last-leaf {
    height: 50%;
  }
}

.cx-tree-line__hor {
  position: absolute;
  top: 50%;
  display: block;
  border-bottom: $tree-line-width $tree-line-style $tree-line-color;
}

.cx-tree-line__label-line {
  flex: 1;
  align-self: center;
  margin: 0 10px;
  border-top: $tree-line-width $tree-line-style $tree-line-color;
}
</style>
