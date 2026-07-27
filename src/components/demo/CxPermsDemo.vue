<template>
  <div class="demo-page">
    <el-card header="CxPerms — 权限守卫组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxPerms 基于路由 meta.permissions/roles/auths 进行权限判断，支持单个字符串和数组（需全部满足）两种模式。
      </el-alert>

      <!-- 场景1：value 单个字符串 -->
      <h3>场景1：value 单个字符串</h3>
      <div class="demo-row">
        <CxPerms value="admin">
          <el-button type="danger">需要 admin 权限</el-button>
        </CxPerms>
        <CxPerms value="read">
          <el-button type="primary">需要 read 权限</el-button>
        </CxPerms>
        <CxPerms value="write">
          <el-button type="warning">需要 write 权限</el-button>
        </CxPerms>
      </div>

      <!-- 场景2：value 数组（需全部满足） -->
      <h3>场景2：value 数组（需全部满足）</h3>
      <div class="demo-row">
        <CxPerms :value="['admin', 'write']">
          <el-button type="danger">需要同时拥有 admin + write 权限</el-button>
        </CxPerms>
        <CxPerms :value="['read', 'write']">
          <el-button type="primary">需要同时拥有 read + write 权限</el-button>
        </CxPerms>
      </div>

      <!-- 场景3：value 为空不渲染 -->
      <h3>场景3：value 为空不渲染</h3>
      <div class="demo-row">
        <CxPerms>
          <el-tag type="danger">此内容不会显示（value 为空）</el-tag>
        </CxPerms>
        <el-tag type="info">↑ 上方区域为空是正确行为</el-tag>
      </div>

      <!-- 场景4：路由 meta.permissions 配置说明 -->
      <h3>场景4：路由 meta.permissions 配置说明</h3>
      <el-alert type="warning" :closable="false" show-icon style="margin-bottom: 12px">
        <p>在路由配置中设置 meta.permissions / meta.roles / meta.auths（任意一个均可），组件会依次查找。</p>
        <pre class="code-block">{
  path: '/system/user',
  meta: {
    permissions: ['admin', 'editor']  // 拥有任一权限即可
  }
}</pre>
      </el-alert>

      <!-- 场景5：超级管理员通配符说明 -->
      <h3>场景5：超级管理员通配符 *:*:* 说明</h3>
      <el-alert type="success" :closable="false" show-icon style="margin-bottom: 12px">
        当路由 meta 中权限列表为 ['*:*:*'] 时，CxPerms 会直接放行所有内容，适用于超级管理员角色。
        <pre class="code-block">{
  path: '/admin',
  meta: {
    permissions: ['*:*:*']  // 超级管理员，放行所有
  }
}</pre>
      </el-alert>

      <!-- 场景6：路由未配置权限默认放行 -->
      <h3>场景6：路由未配置权限默认放行</h3>
      <div class="demo-row">
        <CxPerms value="admin">
          <el-tag type="success">当前路由未配置 meta 权限时，此内容默认可见</el-tag>
        </CxPerms>
      </div>

      <!-- 场景7：嵌套使用（多模块权限分级） -->
      <h3>场景7：嵌套使用（多模块权限分级）</h3>
      <div class="demo-row">
        <CxPerms :value="['admin']">
          <div class="nested-block">
            <p style="margin: 0 0 8px">✅ 已通过 admin 权限验证</p>
            <CxPerms :value="['admin', 'write']">
              <el-button type="danger">✅ admin + write 双重验证通过 → 可执行操作</el-button>
            </CxPerms>
          </div>
        </CxPerms>
      </div>

      <!-- 场景8：与 v-for 结合（菜单项循环） -->
      <h3>场景8：与 v-for 结合（菜单项循环）</h3>
      <div class="menu-list">
        <div v-for="item in menuItems" :key="item.name" class="menu-item">
          <CxPerms :value="item.perms">
            <el-card shadow="hover" class="menu-card">
              <div class="menu-card__inner">
                <el-icon :size="24"><component :is="item.icon" /></el-icon>
                <span>{{ item.label }}</span>
              </div>
            </el-card>
          </CxPerms>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import CxPerms from '@/components/CxPerms'
import { User, Setting, Document, DataAnalysis, Bell } from '@element-plus/icons-vue'

const menuItems = [
  { label: '用户管理', name: 'users', icon: User, perms: ['admin'] },
  { label: '系统设置', name: 'settings', icon: Setting, perms: ['admin'] },
  { label: '文档管理', name: 'docs', icon: Document, perms: ['read'] },
  { label: '数据统计', name: 'stats', icon: DataAnalysis, perms: ['read', 'write'] },
  { label: '消息通知', name: 'notify', icon: Bell, perms: ['admin'] }
]
</script>

<style scoped lang="scss">
.demo-page {
  padding: 16px;

  h3 {
    margin: 16px 0 8px;
    font-size: 15px;
    color: var(--el-text-color-primary);
  }
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.code-block {
  background: rgba(0, 0, 0, 0.06);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  margin: 8px 0 0;
  font-family: 'Courier New', monospace;
}

.nested-block {
  padding: 12px;
  border: 1px dashed var(--el-color-primary);
  border-radius: 4px;
}

.menu-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.menu-item {
  min-width: 160px;
}

.menu-card {
  &__inner {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
}
</style>
