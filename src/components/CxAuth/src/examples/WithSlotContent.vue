<template>
  <div class="cx-auth-example-slot">
    <h3 class="cx-auth-example-slot__title">Slot 插槽：复杂内容渲染</h3>
    <p class="cx-auth-example-slot__desc">
      权限通过后，默认插槽内的任意内容（包括组件、表单等）都会按需渲染。
    </p>

    <CxAuth value="admin">
      <div class="cx-auth-example-slot__content">
        <el-card shadow="hover">
          <template #header>
            <span>受权限保护的操作面板</span>
          </template>
          <el-form label-width="100px">
            <el-form-item label="用户名">
              <el-input value="admin" disabled />
            </el-form-item>
            <el-form-item label="角色">
              <el-tag type="primary">管理员</el-tag>
            </el-form-item>
          </el-form>
          <div class="cx-auth-example-slot__actions">
            <el-button type="primary">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </div>
        </el-card>
      </div>
    </CxAuth>

    <CxAuth value="viewer">
      <el-empty description="viewer 权限内容（不可见则无权限）" />
    </CxAuth>
  </div>
</template>

<script setup lang="ts">
import {
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElTag,
  ElButton,
  ElEmpty
} from 'element-plus'
import CxAuth from '../CxAuth.vue'

defineOptions({
  name: 'CxAuthWithSlotContent'
})
</script>

<style scoped lang="scss">
.cx-auth-example-slot {
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

  &__content {
    margin-bottom: 16px;
  }

  &__actions {
    margin-top: 16px;
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }
}
</style>
