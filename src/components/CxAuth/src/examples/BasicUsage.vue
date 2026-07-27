<template>
  <div class="cx-auth-example-basic">
    <h3 class="cx-auth-example-basic__title">基础用法：单个权限标识</h3>
    <p class="cx-auth-example-basic__desc">
      当前路由 meta.auths 包含 'admin' 时，下方内容可见；否则隐藏。
    </p>

    <!-- 单权限字符串 -->
    <CxAuth value="admin">
      <el-alert
        title="权限验证通过"
        type="success"
        description="当前用户拥有 admin 权限，此内容区域已渲染。"
        :closable="false"
        show-icon
      />
    </CxAuth>

    <!-- 不存在的权限 -->
    <CxAuth value="nonexistent-permission">
      <el-alert
        title="无权限不可见"
        type="warning"
        description="如果你能看到这条消息，说明权限验证未生效。"
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
  name: 'CxAuthBasicUsage'
})
</script>

<style scoped lang="scss">
.cx-auth-example-basic {
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
  }

  .el-alert {
    margin-bottom: 12px;
  }
}
</style>
