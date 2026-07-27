<template>
  <div class="demo-page">
    <el-card header="CxDialog — 程序化弹窗组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxDialog 是程序化弹窗，通过 addDialog API 打开，支持自定义内容、底部按钮、Popconfirm 确认、全屏切换等。
      </el-alert>

      <el-row :gutter="12" style="margin-bottom: 16px">
        <el-button type="primary" @click="openBasic">1. 基础弹窗</el-button>
        <el-button type="danger" @click="openPopconfirm">2. Popconfirm 二次确认</el-button>
        <el-button @click="openCustomFooter">3. 自定义底部按钮</el-button>
        <el-button @click="openFullscreen">4. 全屏切换</el-button>
        <el-button @click="openCustomRenderer">5. 自定义 Header/Footer</el-button>
        <el-button @click="openBeforeCancel">6. beforeCancel 拦截</el-button>
        <el-button @click="openLoading">7. sureBtnLoading</el-button>
        <el-button @click="openNoFooter">8. 隐藏 Footer</el-button>
        <el-button @click="openUpdate">9. updateDialog 动态更新</el-button>
        <el-button @click="closeAll">10. 关闭所有弹窗</el-button>
      </el-row>

      <el-alert type="warning" :closable="false" show-icon title="前提：需在 App 根组件放置 <CxDialog /> 作为渲染锚点" />
    </el-card>

    <!-- 渲染锚点 -->
    <CxDialog />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CxDialog, addDialog, updateDialog, closeAllDialog } from '@/components/CxDialog'

// 场景1：基础弹窗
function openBasic() {
  addDialog({
    title: '新增用户',
    width: '600px',
    contentRenderer: () => h('div', { style: 'padding: 20px' }, [
      h('p', '这是一个基础弹窗示例'),
      h('p', '通过 contentRenderer 渲染内容区域')
    ]),
    beforeSure: (done, ctx) => {
      ElMessage.success('确认提交')
      done()
    }
  })
}

// 场景2：Popconfirm 二次确认
function openPopconfirm() {
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
      setTimeout(() => { ctx.closeLoading(); done(); ElMessage.success('删除成功') }, 1000)
    }
  })
}

// 场景3：自定义底部按钮
function openCustomFooter() {
  addDialog({
    title: '自定义操作',
    width: '500px',
    contentRenderer: () => h('p', '请选择操作'),
    footerButtons: [
      { label: '保存草稿', type: 'info', plain: true, btnClick: () => ElMessage.info('保存草稿') },
      { label: '提交审核', type: 'primary', btnClick: () => ElMessage.success('提交审核') }
    ]
  })
}

// 场景4：全屏切换
function openFullscreen() {
  addDialog({
    title: '代码预览（可全屏）',
    fullscreenIcon: true,
    contentRenderer: () => h('pre', { style: 'height: 300px; overflow: auto; background: #f5f5f5; padding: 16px; border-radius: 4px' }, `// 代码内容\nimport { createApp } from 'vue'\nconst app = createApp(App)\napp.mount('#app')`),
    fullscreenCallBack: ({ options }) => {
      ElMessage.info(`全屏状态: ${options.fullscreen ? '全屏' : '窗口'}`)
    }
  })
}

// 场景5：自定义 Header/Footer
function openCustomRenderer() {
  addDialog({
    title: '默认标题会被覆盖',
    headerRenderer: ({ close, titleId, titleClass }) =>
      h('div', { style: 'color: red; font-weight: bold; font-size: 18px' }, '自定义 Header'),
    contentRenderer: () => h('div', { style: 'padding: 20px' }, '内容区域'),
    footerRenderer: () =>
      h('div', { style: 'text-align: center; padding: 12px 0' }, '自定义 Footer 区域')
  })
}

// 场景6：beforeCancel 拦截
function openBeforeCancel() {
  addDialog({
    title: '编辑中',
    width: '500px',
    contentRenderer: () => h('p', '您有未保存的修改，关闭前会弹出确认框'),
    beforeCancel: (done, ctx) => {
      ElMessageBox.confirm('有未保存的修改，确定放弃？', '提示')
        .then(() => done())
        .catch(() => {})
    }
  })
}

// 场景7：sureBtnLoading
function openLoading() {
  addDialog({
    title: '提交中',
    width: '400px',
    sureBtnLoading: true,
    contentRenderer: () => h('p', '点击确定后按钮将显示 Loading 状态，3秒后自动关闭'),
    beforeSure: (done, ctx) => {
      setTimeout(() => {
        ctx.closeLoading()
        done()
        ElMessage.success('提交完成')
      }, 3000)
    }
  })
}

// 场景8：隐藏 Footer
function openNoFooter() {
  addDialog({
    title: '纯展示弹窗',
    hideFooter: true,
    width: '400px',
    contentRenderer: () => h('div', { style: 'padding: 20px; text-align: center' }, '这是一个没有底部按钮的纯展示对话框。')
  })
}

// 场景9：updateDialog 动态更新
function openUpdate() {
  addDialog({
    title: '处理中...',
    width: '400px',
    hideFooter: true,
    contentRenderer: () => h('p', '正在处理，请稍候...')
  })
  setTimeout(() => updateDialog('处理完成', 'title'), 2000)
  setTimeout(() => updateDialog('处理已完成 ✓', 'title'), 3000)
}

// 场景10：关闭所有
function closeAll() {
  closeAllDialog()
  ElMessage.info('已关闭所有弹窗')
}
</script>

<style scoped>
.demo-page { padding: 16px; }
</style>
