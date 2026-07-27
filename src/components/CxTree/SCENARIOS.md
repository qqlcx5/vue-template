## 典型场景
- 组织架构树
- 菜单权限树
- 分类树

## 不适用场景
- 仅需级联下拉选择（用 CxCascader）
- 超大数据量无虚拟滚动（用 CxExpandTree）

## 示例

### 1. 懒加载树
```vue
<template>
  <CxTree lazy :load="loadNode" @node-click="onNodeClick" />
</template>

<script setup>
function loadNode(node, resolve) {
  // 根据 node.level 请求不同层数据
  api.getChildren(node.data?.id).then(resolve)
}
</script>
```
