## 典型场景
- 组织架构树
- 菜单权限分配
- 部门选择

## 不适用场景
- 仅需级联下拉选择（用 CxCascader）
- 扁平列表（用 el-select multiple）

## 示例

### 1. 展开/折叠 + 过滤
```vue
<template>
  <CxExpandTree :data="treeData" show-expand-all filterable checkable @check="onCheck" />
</template>
```
