<template>
  <div class="cx-auth-example-array">
    <h3 class="cx-auth-example-array__title">数组权限：全部满足才渲染</h3>
    <p class="cx-auth-example-array__desc">
      传入字符串数组时，路由 meta.auths 需<b>全部包含</b>所有权限标识才渲染。
    </p>

    <!-- 数组权限 — 需要 admin 和 editor 同时满足 -->
    <CxAuth :value="['admin', 'editor']">
      <el-alert
        title="admin + editor 双重权限验证通过"
        type="success"
        description="当前路由 meta.auths 同时包含 admin 和 editor 两项权限。"
        :closable="false"
        show-icon
      />
    </CxAuth>

    <!-- 数组权限 — 包含一个不存在的权限 -->
    <CxAuth :value="['admin', 'superuser']">
      <el-alert
        title="admin + superuser"
        type="error"
        description="如果你看到这条消息，说明 'superuser' 也在 meta.auths 中。"
        :closable="false"
        show-icon
      />
    </CxAuth>
  </div>
</template>

<script setup lang="ts">
import { ElAlert } from 'element-plus'
import CxAuth from '../CxAuth.vue'

defineOptions({
  name: 'CxAuthArrayPermission'
})
</script>

<style scoped lang="scss">
.cx-auth-example-array {
  max-width: 640px;
  padding: 16px;

  &__title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
  }

  &__desc {
    margin: 0 0 16px;
    font-size: 13px;
    color: #909399;
    line-height: 1.6;

    b {
      color: #303133;
    }
  }

  .el-alert {
    margin-bottom: 12px;
  }
}
</style>
