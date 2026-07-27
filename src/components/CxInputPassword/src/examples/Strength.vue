<template>
  <div class="cx-input-password-example-strength">
    <h3>密码强度检测</h3>
    <CxInputPassword v-model="password" show-strength @strengthChange="onStrengthChange" />
    <p class="cx-input-password-example-strength__score">
      强度评分: {{ score }} / 4
      <el-tag v-if="score <= 1" type="danger" size="small">弱</el-tag>
      <el-tag v-else-if="score === 2" type="warning" size="small">一般</el-tag>
      <el-tag v-else-if="score === 3" type="success" size="small">强</el-tag>
      <el-tag v-else type="success" size="small">很强</el-tag>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxInputPassword from '../CxInputPassword.vue'

defineOptions({ name: 'CxInputPasswordExampleStrength' })

const password = ref('')
const score = ref(0)

function onStrengthChange(s: number) {
  score.value = s
}
</script>

<style scoped lang="scss">
.cx-input-password-example-strength {
  &__score {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #606266;
  }
}
</style>
