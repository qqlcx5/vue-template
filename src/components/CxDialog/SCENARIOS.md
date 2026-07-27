# CxDialog 场景说明

## 典型场景

- 表单编辑弹窗（新增/编辑用户、配置项等）
- 确认操作弹窗（删除确认、审批等，配合 Popconfirm）
- 多步骤弹窗（通过 `beforeSure` 拦截分步验证）
- 全屏内容展示（配合 `fullscreenIcon`）
- 需要同时管理多个对话框的复杂页面

## 不适用场景

- 简单的 `el-dialog` 声明式使用（直接用 Element Plus 更简洁）
- 轻提示 / 通知（用 `ElMessage` / `ElNotification`）
- 无需底部按钮的纯展示对话框（可用，但略显冗余）

---

## 使用示例

> **前提**：在 App 根组件中放置 `<CxDialog />` 作为渲染锚点。

### 1. 基础弹窗（程序化打开）

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <router-view />
    <CxDialog />
  </div>
</template>

<script setup lang="ts">
import { CxDialog } from '@/components/CxDialog'
</script>
```

```vue
<!-- 业务页面 -->
<template>
  <el-button @click="openFormDialog">新增用户</el-button>
</template>

<script setup lang="ts">
import { addDialog } from '@/components/CxDialog'
import { h } from 'vue'
import UserForm from './UserForm.vue'

function openFormDialog() {
  addDialog({
    title: '新增用户',
    width: '600px',
    contentRenderer: ({ options, index }) => h(UserForm, {
      onClose: (args: any) => {
        console.log('表单关闭:', args)
      }
    }),
    beforeSure: (done, ctx) => {
      console.log('确认前校验...')
      done()
    }
  })
}
</script>
```

### 2. 带 Popconfirm 二次确认（prop: popconfirm）

```vue
<script setup lang="ts">
import { addDialog } from '@/components/CxDialog'
import { h } from 'vue'

function openDeleteDialog() {
  addDialog({
    title: '删除确认',
    width: '450px',
    popconfirm: {
      title: '确定要删除该用户吗？此操作不可恢复。',
      confirmButtonText: '确认删除',
      confirmButtonType: 'danger'
    },
    contentRenderer: () => h('p', '删除后数据将无法恢复，请谨慎操作。'),
    beforeSure: (done, ctx) => {
      fetch('/api/user/delete', { method: 'DELETE' })
        .then(() => { ctx.closeLoading(); done() })
        .catch(() => ctx.closeLoading())
    }
  })
}
</script>
```

### 3. 自定义底部按钮（prop: footerButtons）

```vue
<script setup lang="ts">
import { addDialog } from '@/components/CxDialog'
import { h } from 'vue'

function openCustomFooterDialog() {
  addDialog({
    title: '自定义操作',
    width: '500px',
    contentRenderer: () => h('p', '请选择操作'),
    footerButtons: [
      {
        label: '保存草稿',
        type: 'info',
        plain: true,
        btnClick: ({ dialog }) => console.log('保存草稿')
      },
      {
        label: '提交审核',
        type: 'primary',
        btnClick: ({ dialog }) => console.log('提交审核')
      }
    ]
  })
}
</script>
```

### 4. 全屏切换（prop: fullscreenIcon）

```vue
<script setup lang="ts">
import { addDialog } from '@/components/CxDialog'
import { h } from 'vue'

function openFullscreenDialog() {
  addDialog({
    title: '代码预览',
    fullscreenIcon: true,
    contentRenderer: () => h('pre', { style: 'height: 100%' }, '// 代码内容...'),
    fullscreenCallBack: ({ options, index }) => {
      console.log('全屏状态:', options.fullscreen)
    }
  })
}
</script>
```

### 5. 自定义 Header / Footer 渲染（prop: headerRenderer / footerRenderer）

```vue
<script setup lang="ts">
import { addDialog } from '@/components/CxDialog'
import { h } from 'vue'

function openCustomDialog() {
  addDialog({
    title: '默认标题会被覆盖',
    headerRenderer: ({ close, titleId, titleClass }) =>
      h('div', { style: 'color: red; font-weight: bold' }, '自定义 Header'),
    contentRenderer: () => h('p', '内容区域'),
    footerRenderer: () =>
      h('div', { style: 'text-align: center' }, '自定义 Footer 区域')
  })
}
</script>
```

### 6. beforeCancel 拦截取消操作（prop: beforeCancel）

```vue
<script setup lang="ts">
import { addDialog } from '@/components/CxDialog'
import { h } from 'vue'
import { ElMessageBox } from 'element-plus'

function openInterceptDialog() {
  addDialog({
    title: '编辑中',
    width: '500px',
    contentRenderer: () => h('p', '您有未保存的修改'),
    beforeCancel: (done, ctx) => {
      ElMessageBox.confirm('有未保存的修改，确定放弃？', '提示')
        .then(() => done())
        .catch(() => {})
    }
  })
}
</script>
```

### 7. sureBtnLoading 确定按钮 Loading（prop: sureBtnLoading）

```vue
<script setup lang="ts">
import { addDialog } from '@/components/CxDialog'
import { h } from 'vue'

function openLoadingDialog() {
  addDialog({
    title: '提交中',
    width: '400px',
    sureBtnLoading: true,
    contentRenderer: () => h('p', '点击确定后按钮将显示 Loading 状态'),
    beforeSure: (done, ctx) => {
      setTimeout(() => {
        ctx.closeLoading()
        done()
      }, 3000)
    }
  })
}
</script>
```

### 8. 隐藏 Footer（prop: hideFooter）

```vue
<script setup lang="ts">
import { addDialog } from '@/components/CxDialog'
import { h } from 'vue'

function openNoFooterDialog() {
  addDialog({
    title: '纯展示',
    hideFooter: true,
    width: '400px',
    contentRenderer: () => h('p', '这是一个没有底部按钮的纯展示对话框。')
  })
}
</script>
```

### 9. 更新对话框属性（程序化 API: updateDialog）

```vue
<script setup lang="ts">
import { addDialog, updateDialog } from '@/components/CxDialog'
import { h } from 'vue'

function openProgressDialog() {
  addDialog({
    title: '处理中...',
    width: '400px',
    hideFooter: true,
    contentRenderer: () => h('p', '正在处理，请稍候...')
  })

  setTimeout(() => updateDialog('处理完成', 'title'), 2000)
}
</script>
```

### 10. 关闭所有对话框（程序化 API: closeAllDialog）

```vue
<script setup lang="ts">
import { addDialog, closeAllDialog } from '@/components/CxDialog'
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave(() => {
  closeAllDialog()
})
</script>
```
