# CxAuth 场景说明

## 典型场景

- 按钮级权限控制：根据当前用户角色决定是否显示"删除"、"编辑"等操作按钮。
- 页面区域权限控制：某个面板或功能区仅对特定权限用户可见。
- 菜单项权限控制：结合导航菜单，仅渲染当前用户有权访问的菜单项。

## 不适用场景

- 权限需要从后端异步获取的场景（CxAuth 仅读取路由 `meta.auths`，不做异步请求）。
- "任一满足即放行"的场景（仅支持 ALL 逻辑，不支持 OR 逻辑）。
- 不依赖 vue-router 的纯组件权限控制。

## 前置要求

路由配置必须在 `meta.auths` 中声明当前路由所需的权限列表：

```ts
const routes = [
  {
    path: '/admin',
    meta: {
      auths: ['admin', 'super_admin']
    }
  }
]
```

---

## 示例

### 基础用法：单个权限

```vue
<template>
  <CxAuth value="admin">
    <el-button type="danger">管理员操作</el-button>
  </CxAuth>
</template>

<script setup lang="ts">
import CxAuth from '@/components/CxAuth'
</script>
```

### 多权限全部满足

```vue
<template>
  <CxAuth :value="['admin', 'write']">
    <el-button type="primary">编辑文章</el-button>
  </CxAuth>
</template>

<script setup lang="ts">
import CxAuth from '@/components/CxAuth'
</script>
```

### 路由未配置 auths 时的默认放行行为

```vue
<!-- 假设当前路由 meta 为 {}（无 auths 字段），以下插槽将正常渲染 -->
<CxAuth value="admin">
  <span>路由未配置权限，默认可见</span>
</CxAuth>
```

### value 为空时拒绝渲染

```vue
<!-- value 为空（默认 []），插槽不会渲染 -->
<CxAuth>
  <span>此处内容不可见</span>
</CxAuth>
```

### 复杂场景：表格操作列权限控制

```vue
<template>
  <el-table :data="list">
    <el-table-column prop="name" label="名称" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <CxAuth value="read">
          <el-button link type="primary" @click="view(row)">查看</el-button>
        </CxAuth>
        <CxAuth :value="['admin', 'write']">
          <el-button link type="primary" @click="edit(row)">编辑</el-button>
        </CxAuth>
        <CxAuth value="admin">
          <el-button link type="danger" @click="remove(row)">删除</el-button>
        </CxAuth>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import CxAuth from '@/components/CxAuth'

const list = ref([
  { id: 1, name: '项目A' },
  { id: 2, name: '项目B' }
])

function view(row: any) { /* ... */ }
function edit(row: any) { /* ... */ }
function remove(row: any) { /* ... */ }
</script>
```

### 复杂场景：结合动态路由权限

```vue
<template>
  <el-menu>
    <CxAuth value="dashboard">
      <el-menu-item index="/dashboard">仪表盘</el-menu-item>
    </CxAuth>
    <CxAuth value="settings">
      <el-menu-item index="/settings">系统设置</el-menu-item>
    </CxAuth>
    <CxAuth :value="['admin', 'audit']">
      <el-menu-item index="/audit">审计日志</el-menu-item>
    </CxAuth>
  </el-menu>
</template>

<script setup lang="ts">
import CxAuth from '@/components/CxAuth'
</script>
```
