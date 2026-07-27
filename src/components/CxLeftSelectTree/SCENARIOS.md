## 典型场景
- 组织架构选人（左树选部门，右表列成员）
- 角色分配（左树选角色，右表列用户）
- 文件夹 + 文件列表

## 不适用场景
- 仅需单选树节点（用 CxExpandTree 或 CxCascader）

## 示例

### 组织架构选人
```vue
<template>
  <CxLeftSelectTree :tree-data="departments" :tree-width="260">
    <template #tree>
      <CxExpandTree :data="departments" @node-click="onDeptClick" />
    </template>
    <CxTable :data="members" :columns="columns" />
  </CxLeftSelectTree>
</template>
```
