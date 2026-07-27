---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_4550278986a611f18766525400f8a581
    ReservedCode1: oqfHC7lBbslSOiEO8OGUSP/Hf6SGUrAeE5LjQFlKaJ7RENpol7Dfame9PL+kJiOm8gD5nBygUIOR4znB9WdZhRh6ZCFvxvOf9s/wqZNLK6b6UwqMvWYem1cz2YipwMr6R26dGtTS1pYm/5Z0RUZbRdNposLRhj3QAc3HvJvumVbxWwEO56Fevf2lfzo=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_4550278986a611f18766525400f8a581
    ReservedCode2: oqfHC7lBbslSOiEO8OGUSP/Hf6SGUrAeE5LjQFlKaJ7RENpol7Dfame9PL+kJiOm8gD5nBygUIOR4znB9WdZhRh6ZCFvxvOf9s/wqZNLK6b6UwqMvWYem1cz2YipwMr6R26dGtTS1pYm/5Z0RUZbRdNposLRhj3QAc3HvJvumVbxWwEO56Fevf2lfzo=
---

# CxTreeLine 场景说明

## 典型场景

### 1. 基础用法 — el-tree 搭配引导线

```vue
<template>
  <el-tree :data="treeData" node-key="id" default-expand-all>
    <template #default="{ node, data }">
      <CxTreeLine :node="node" :data="data" />
    </template>
  </el-tree>
</template>

<script setup lang="ts">
const treeData = [
  {
    id: 1,
    label: '一级节点',
    children: [
      { id: 2, label: '二级节点 A' },
      { id: 3, label: '二级节点 B', children: [{ id: 4, label: '三级节点' }] }
    ]
  }
]
</script>
```

### 2. el-tree-v2 虚拟树 — 必须传 treeData

```vue
<template>
  <el-tree-v2
    :data="largeTreeData"
    :props="{ label: 'name', children: 'children' }"
    :height="400"
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
</template>

<script setup lang="ts">
const largeTreeData = [
  { id: 1, name: '根节点', children: [/* ... */] }
]
</script>
```

### 3. 自定义节点标签

```vue
<template>
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
</template>
```

### 4. 标签后添加操作按钮

```vue
<template>
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
</template>

<script setup lang="ts">
function onEdit(data: any) { console.log('编辑', data) }
function onDelete(id: number) { console.log('删除', id) }
</script>
```

### 5. 完全自定义节点内容

```vue
<template>
  <el-tree :data="treeData" node-key="id" default-expand-all>
    <template #default="{ node, data }">
      <CxTreeLine :node="node" :data="data">
        <template #default>
          <div class="custom-node">
            <el-icon><Folder /></el-icon>
            <span>{{ data.label }}</span>
            <el-tag size="small">{{ data.count }}</el-tag>
          </div>
        </template>
      </CxTreeLine>
    </template>
  </el-tree>
</template>
```

### 6. 隐藏标签横线 + 自定义缩进

```vue
<template>
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
</template>
```

## 不适用场景

- **独立使用**：CxTreeLine 必须配合 el-tree/el-tree-v2 使用，无法独立渲染树形连线
- **非 Element Plus 树组件**：仅兼容 el-tree 和 el-tree-v2
- **需要实线/自定义颜色**：组件内置虚线样式，如需自定义需覆盖 CSS
- **横向树/思维导图**：仅支持纵向层级连线
