<template>
  <div class="cx-infotip-example-basic">
    <h3>帮助提示</h3>
    <div class="cx-infotip-example-basic__row">
      <span>密码</span>
      <CxInfotip content="密码长度 8-20 位，需包含字母和数字" />
    </div>
    <CxInputPassword v-model="password" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxInfotip from '../CxInfotip.vue'
import CxInputPassword from '../../CxInputPassword/src/CxInputPassword.vue'

defineOptions({ name: 'CxInfotipExampleBasic' })

const password = ref('')
</script>

<style scoped lang="scss">
.cx-infotip-example-basic {
  &__row {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 8px;
    font-size: 14px;
    color: #606266;
  }
}
</style>
