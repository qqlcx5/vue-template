# CxDrawer 场景说明

## 典型场景

- 侧边栏表单编辑（如用户详情、配置面板）
- 筛选面板（从右侧滑出的筛选条件抽屉）
- 详情预览（从底部滑出的内容详情）
- 需要同时管理多个抽屉的复杂页面
- 可拖拽调整宽度的面板（`resizable`）

## 不适用场景

- 简单的 `el-drawer` 声明式使用（直接用 Element Plus 更简洁）
- 全屏模态弹窗（用 CxDialog 更合适）
- 轻提示 / 通知

---

## 使用示例

> **前提**：在 App 根组件中放置 `<CxDrawer />` 作为渲染锚点。

### 1. 基础右侧抽屉（程序化打开）

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <router-view />
    <CxDrawer />
  </div>
</template>

<script setup lang="ts">
import { CxDrawer } from '@/components/CxDrawer'
</script>
```

```vue
<!-- 业务页面 -->
<template>
  <el-button @click="openDetailDrawer">查看详情</el-button>
</template>

<script setup lang="ts">
import { addDrawer } from '@/components/CxDrawer'
import { h } from 'vue'
import UserDetail from './UserDetail.vue'

function openDetailDrawer() {
  addDrawer({
    title: '用户详情',
    size: '500px',
    contentRenderer: ({ options, index }) => h(UserDetail),
    beforeSure: (done, ctx) => { done() }
  })
}
</script>
```

### 2. 四个方向的抽屉（prop: direction）

```vue
<script setup lang="ts">
import { addDrawer } from '@/components/CxDrawer'
import { h } from 'vue'

// 从左侧滑出
function openLeftDrawer() {
  addDrawer({
    title: '导航菜单',
    direction: 'ltr',
    size: '300px',
    hideFooter: true,
    contentRenderer: () => h('div', '左侧菜单内容')
  })
}

// 从底部滑出
function openBottomDrawer() {
  addDrawer({
    title: '操作面板',
    direction: 'btt',
    size: '400px',
    contentRenderer: () => h('div', '底部操作面板')
  })
}
</script>
```

### 3. 可调整大小（prop: resizable）

```vue
<script setup lang="ts">
import { addDrawer } from '@/components/CxDrawer'
import { h } from 'vue'

function openResizableDrawer() {
  addDrawer({
    title: '代码编辑器',
    direction: 'rtl',
    size: '600px',
    resizable: true,
    contentRenderer: () => h('textarea', {
      style: 'width:100%;height:100%',
      placeholder: '输入代码...'
    })
  })
}
</script>
```

### 4. 带 Popconfirm 确认（prop: popConfirm）

```vue
<script setup lang="ts">
import { addDrawer } from '@/components/CxDrawer'
import { h } from 'vue'

function openDeleteDrawer() {
  addDrawer({
    title: '批量删除',
    size: '450px',
    popConfirm: {
      title: '确定要删除所选项目？此操作不可恢复。',
      confirmButtonText: '确认删除',
      confirmButtonType: 'danger'
    },
    contentRenderer: () => h('p', '已选择 3 个项目'),
    beforeSure: (done, ctx) => {
      fetch('/api/items/batch-delete', { method: 'POST' })
        .then(() => { ctx.closeLoading(); done() })
    }
  })
}
</script>
```

### 5. 自定义底部按钮（prop: footerButtons）

```vue
<script setup lang="ts">
import { addDrawer } from '@/components/CxDrawer'
import { h } from 'vue'

function openCustomFooterDrawer() {
  addDrawer({
    title: '编辑配置',
    size: '500px',
    contentRenderer: () => h('div', '配置表单'),
    footerButtons: [
      { label: '重置', plain: true, btnClick: () => console.log('重置') },
      { label: '保存', type: 'primary', btnClick: () => console.log('保存') }
    ]
  })
}
</script>
```

### 6. 自定义 Header / Footer 渲染（prop: headerRenderer / footerRenderer）

```vue
<script setup lang="ts">
import { addDrawer } from '@/components/CxDrawer'
import { h } from 'vue'

function openRendererDrawer() {
  addDrawer({
    headerRenderer: ({ close, titleId, titleClass }) =>
      h('div', { style: 'color: blue' }, '自定义头部'),
    contentRenderer: () => h('p', '内容区域'),
    footerRenderer: () =>
      h('div', { style: 'text-align: center' }, '自定义底部')
  })
}
</script>
```

### 7. beforeCancel 拦截取消操作（prop: beforeCancel）

```vue
<script setup lang="ts">
import { addDrawer } from '@/components/CxDrawer'
import { h } from 'vue'
import { ElMessageBox } from 'element-plus'

function openInterceptDrawer() {
  addDrawer({
    title: '编辑中',
    size: '500px',
    contentRenderer: () => h('p', '有未保存的修改'),
    beforeCancel: (done, ctx) => {
      ElMessageBox.confirm('有未保存的修改，确定关闭？', '提示')
        .then(() => done())
        .catch(() => {})
    }
  })
}
</script>
```

### 8. sureBtnLoading 确定按钮 Loading（prop: sureBtnLoading）

```vue
<script setup lang="ts">
import { addDrawer } from '@/components/CxDrawer'
import { h } from 'vue'

function openLoadingDrawer() {
  addDrawer({
    title: '提交表单',
    sureBtnLoading: true,
    contentRenderer: () => h('p', '点击确定后需要异步处理'),
    beforeSure: (done, ctx) => {
      setTimeout(() => { ctx.closeLoading(); done() }, 2000)
    }
  })
}
</script>
```

### 9. hideFooter 隐藏底部（prop: hideFooter）

```vue
<script setup lang="ts">
import { addDrawer } from '@/components/CxDrawer'
import { h } from 'vue'

function openNoFooterDrawer() {
  addDrawer({
    title: '只读信息',
    hideFooter: true,
    size: '400px',
    contentRenderer: () => h('p', '这是一个没有底部按钮的抽屉')
  })
}
</script>
```

### 10. 关闭所有抽屉（程序化 API: closeAllDrawer）

```vue
<script setup lang="ts">
import { addDrawer, closeAllDrawer } from '@/components/CxDrawer'
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave(() => {
  closeAllDrawer()
})
</script>
```
