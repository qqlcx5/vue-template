<template>
  <div class="cx-input-password-example-basic">
    <h3>基础密码输入</h3>
    <CxInputPassword v-model="password" placeholder="请输入密码" />
    <p class="cx-input-password-example-basic__value">当前值: {{ password }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxInputPassword from '../CxInputPassword.vue'

defineOptions({ name: 'CxInputPasswordExampleBasic' })

const password = ref('')
</script>

<style scoped lang="scss">
.cx-input-password-example-basic {
  &__value {
    margin-top: 12px;
    color: #909399;
    font-size: 13px;
  }
}
</style>
