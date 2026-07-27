<template>
  <div class="demo-page">
    <el-card header="CxAuth — 权限控制组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxAuth 根据路由 meta.auths 判断当前用户是否拥有指定权限，支持单个权限和多数组全满足两种模式。
      </el-alert>

      <!-- 场景1：单个权限 -->
      <h3>场景1：单个权限控制</h3>
      <el-row :gutter="16" style="margin-bottom: 16px">
        <CxAuth value="admin">
          <el-button type="danger">管理员操作（需 admin 权限）</el-button>
        </CxAuth>
        <CxAuth value="read">
          <el-button type="primary">查看操作（需 read 权限）</el-button>
        </CxAuth>
      </el-row>

      <!-- 场景2：多权限全部满足 -->
      <h3>场景2：多权限全部满足</h3>
      <el-row :gutter="16" style="margin-bottom: 16px">
        <CxAuth :value="['admin', 'write']">
          <el-button type="warning">编辑文章（需同时拥有 admin + write）</el-button>
        </CxAuth>
      </el-row>

      <!-- 场景3：路由未配置 auths 时默认放行 -->
      <h3>场景3：路由未配置 auths 时默认放行</h3>
      <el-row :gutter="16" style="margin-bottom: 16px">
        <CxAuth value="admin">
          <el-tag type="success">路由未配置权限时，此内容默认可见</el-tag>
        </CxAuth>
      </el-row>

      <!-- 场景4：value 为空时拒绝渲染 -->
      <h3>场景4：value 为空时拒绝渲染</h3>
      <el-row :gutter="16" style="margin-bottom: 16px">
        <CxAuth>
          <el-tag type="danger">此内容不会显示（value 为空）</el-tag>
        </CxAuth>
        <el-tag type="info">↑ 上方区域为空是正确行为</el-tag>
      </el-row>

      <!-- 场景5：表格操作列权限控制 -->
      <h3>场景5：表格操作列权限控制</h3>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column label="操作" width="280">
          <template #default="{ row }">
            <CxAuth value="read">
              <el-button link type="primary" @click="viewRow(row)">查看</el-button>
            </CxAuth>
            <CxAuth :value="['admin', 'write']">
              <el-button link type="primary" @click="editRow(row)">编辑</el-button>
            </CxAuth>
            <CxAuth value="admin">
              <el-button link type="danger" @click="deleteRow(row)">删除</el-button>
            </CxAuth>
          </template>
        </el-table-column>
      </el-table>

      <!-- 场景6：菜单项权限控制 -->
      <h3>场景6：菜单项权限控制</h3>
      <el-menu mode="horizontal">
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
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import CxAuth from '@/components/CxAuth'

const tableData = ref([
  { id: 1, name: '项目 Alpha', status: '进行中' },
  { id: 2, name: '项目 Beta', status: '已完成' },
  { id: 3, name: '项目 Gamma', status: '已归档' }
])

function viewRow(row: any) {
  ElMessage.info(`查看：${row.name}`)
}

function editRow(row: any) {
  ElMessage.success(`编辑：${row.name}`)
}

function deleteRow(row: any) {
  ElMessage.warning(`删除：${row.name}`)
}
</script>

<style scoped>
.demo-page { padding: 16px; }
h3 { margin: 16px 0 8px; font-size: 15px; color: #303133; }
</style>
