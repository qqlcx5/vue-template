<template>
  <div class="demo-page">
    <el-card header="CxDrawer — 程序化抽屉组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxDrawer 是程序化抽屉，通过 addDrawer API 打开，支持四个方向、可拖拽调整大小、Popconfirm 确认等。
      </el-alert>

      <el-row :gutter="12" style="margin-bottom: 16px">
        <el-button type="primary" @click="openBasic">1. 基础右侧抽屉</el-button>
        <el-button @click="openLeft">2. 左侧抽屉</el-button>
        <el-button @click="openTop">3. 顶部抽屉</el-button>
        <el-button @click="openBottom">4. 底部抽屉</el-button>
        <el-button @click="openResizable">5. 可调整大小</el-button>
        <el-button type="danger" @click="openPopConfirm">6. Popconfirm 确认</el-button>
        <el-button @click="openCustomFooter">7. 自定义底部按钮</el-button>
        <el-button @click="openRenderer">8. 自定义 Header/Footer</el-button>
        <el-button @click="openBeforeCancel">9. beforeCancel 拦截</el-button>
        <el-button @click="openLoading">10. sureBtnLoading</el-button>
        <el-button @click="openNoFooter">11. 隐藏 Footer</el-button>
        <el-button @click="closeAll">12. 关闭所有抽屉</el-button>
      </el-row>

      <el-alert type="warning" :closable="false" show-icon title="前提：需在 App 根组件放置 <CxDrawer /> 作为渲染锚点" />
    </el-card>

    <!-- 渲染锚点 -->
    <CxDrawer />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CxDrawer, addDrawer, closeAllDrawer } from '@/components/CxDrawer'

// 场景1：基础右侧抽屉
function openBasic() {
  addDrawer({
    title: '用户详情',
    size: '500px',
    contentRenderer: () => h('div', { style: 'padding: 20px' }, '右侧基础抽屉内容区域'),
    beforeSure: (done) => { ElMessage.success('确认'); done() }
  })
}

// 场景2：左侧抽屉
function openLeft() {
  addDrawer({
    title: '导航菜单',
    direction: 'ltr',
    size: '300px',
    hideFooter: true,
    contentRenderer: () => h('div', { style: 'padding: 16px' }, [
      h('p', '菜单项 1'),
      h('p', '菜单项 2'),
      h('p', '菜单项 3')
    ])
  })
}

// 场景3：顶部抽屉
function openTop() {
  addDrawer({
    title: '筛选条件',
    direction: 'ttb',
    size: '300px',
    contentRenderer: () => h('div', { style: 'padding: 20px' }, '顶部筛选条件区域')
  })
}

// 场景4：底部抽屉
function openBottom() {
  addDrawer({
    title: '操作面板',
    direction: 'btt',
    size: '400px',
    contentRenderer: () => h('div', { style: 'padding: 20px' }, '底部操作面板内容')
  })
}

// 场景5：可调整大小
function openResizable() {
  addDrawer({
    title: '代码编辑器（可拖拽边缘调整宽度）',
    direction: 'rtl',
    size: '600px',
    resizable: true,
    contentRenderer: () => h('textarea', {
      style: 'width:100%;height:300px;padding:12px;border:1px solid #ddd;border-radius:4px',
      placeholder: '输入代码...'
    })
  })
}

// 场景6：Popconfirm 确认
function openPopConfirm() {
  addDrawer({
    title: '批量删除',
    size: '450px',
    popConfirm: {
      title: '确定要删除所选项目？此操作不可恢复。',
      confirmButtonText: '确认删除',
      confirmButtonType: 'danger'
    },
    contentRenderer: () => h('p', '已选择 3 个项目，确认后将执行删除操作'),
    beforeSure: (done, ctx) => {
      setTimeout(() => { ctx.closeLoading(); done(); ElMessage.success('删除成功') }, 1000)
    }
  })
}

// 场景7：自定义底部按钮
function openCustomFooter() {
  addDrawer({
    title: '编辑配置',
    size: '500px',
    contentRenderer: () => h('div', { style: 'padding: 20px' }, '配置表单内容区域'),
    footerButtons: [
      { label: '重置', plain: true, btnClick: () => ElMessage.info('重置') },
      { label: '保存', type: 'primary', btnClick: () => ElMessage.success('保存成功') }
    ]
  })
}

// 场景8：自定义 Header/Footer
function openRenderer() {
  addDrawer({
    headerRenderer: ({ close, titleId, titleClass }) =>
      h('div', { style: 'color: blue; font-weight: bold' }, '自定义头部'),
    contentRenderer: () => h('div', { style: 'padding: 20px' }, '内容区域'),
    footerRenderer: () =>
      h('div', { style: 'text-align: center; padding: 12px 0' }, '自定义底部')
  })
}

// 场景9：beforeCancel 拦截
function openBeforeCancel() {
  addDrawer({
    title: '编辑中',
    size: '500px',
    contentRenderer: () => h('p', '有未保存的修改，关闭前会弹出确认框'),
    beforeCancel: (done, ctx) => {
      ElMessageBox.confirm('有未保存的修改，确定关闭？', '提示')
        .then(() => done())
        .catch(() => {})
    }
  })
}

// 场景10：sureBtnLoading
function openLoading() {
  addDrawer({
    title: '提交表单',
    sureBtnLoading: true,
    contentRenderer: () => h('p', '点击确定后需要异步处理，2秒后自动关闭'),
    beforeSure: (done, ctx) => {
      setTimeout(() => { ctx.closeLoading(); done(); ElMessage.success('提交完成') }, 2000)
    }
  })
}

// 场景11：隐藏 Footer
function openNoFooter() {
  addDrawer({
    title: '只读信息',
    hideFooter: true,
    size: '400px',
    contentRenderer: () => h('div', { style: 'padding: 20px' }, '这是一个没有底部按钮的抽屉')
  })
}

// 场景12：关闭所有
function closeAll() {
  closeAllDrawer()
  ElMessage.info('已关闭所有抽屉')
}
</script>

<style scoped>
.demo-page { padding: 16px; }
</style>
