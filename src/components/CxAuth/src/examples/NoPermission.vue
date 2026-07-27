<template>
  <div class="cx-auth-example-noperm">
    <h3 class="cx-auth-example-noperm__title">无权限：静默隐藏</h3>
    <p class="cx-auth-example-noperm__desc">
      当 value 为空字符串或不传时，组件判定为无权限，不渲染任何内容。
    </p>

    <CxAuth value="">
      <el-alert
        title="空字符串权限"
        type="error"
        description="此区域不应渲染。如果可见，说明权限判断逻辑异常。"
        :closable="false"
        show-icon
      />
    </CxAuth>

    <CxAuth>
      <el-alert
        title="未传 value"
        type="error"
        description="此区域同样不应渲染。默认值为空数组。"
        :closable="false"
        show-icon
      />
    </CxAuth>

    <el-alert
      title="提示"
      type="info"
      description="上方两条 Alert 均不可见时，说明 CxAuth 在无权限时正确隐藏了内容。"
      :closable="false"
      show-icon
    />
  </div>
</template>

<script setup lang="ts">
import { ElAlert } from 'element-plus'
import CxAuth from '../CxAuth.vue'

defineOptions({
  name: 'CxAuthNoPermission'
})
</script>

<style scoped lang="scss">
.cx-auth-example-noperm {
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
}
</style>
