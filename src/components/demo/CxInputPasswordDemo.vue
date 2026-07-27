<template>
  <div class="demo-page">
    <el-card header="CxInputPassword 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-input-password-demo__section">
        <CxInputPassword v-model="password" placeholder="请输入密码" />
        <p>当前输入：{{ password }}</p>
      </div>

      <!-- 场景2：显示密码强度 -->
      <h3>场景2：显示密码强度</h3>
      <div class="cx-input-password-demo__section">
        <CxInputPassword v-model="password2" placeholder="请输入密码" show-strength />
      </div>

      <!-- 场景3：最小长度限制 -->
      <h3>场景3：最小长度限制（8位）</h3>
      <div class="cx-input-password-demo__section">
        <CxInputPassword v-model="password3" placeholder="至少8位密码" :min-length="8" />
      </div>

      <!-- 场景4：禁用状态 -->
      <h3>场景4：禁用状态</h3>
      <div class="cx-input-password-demo__section">
        <CxInputPassword v-model="password4" placeholder="禁用状态" disabled />
      </div>

      <!-- 场景5：自定义宽度 -->
      <h3>场景5：自定义宽度</h3>
      <div class="cx-input-password-demo__section">
        <CxInputPassword v-model="password5" placeholder="300px 宽度" width="300px" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxInputPassword } from '@/components/CxInputPassword'

defineOptions({
  name: 'CxInputPasswordDemo'
})

const password = ref('')
const password2 = ref('')
const password3 = ref('')
const password4 = ref('12345678')
const password5 = ref('')
</script>

<style scoped lang="scss">
.cx-input-password-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
