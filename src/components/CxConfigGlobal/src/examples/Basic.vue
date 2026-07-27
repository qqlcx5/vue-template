<template>
  <div class="cx-config-global-example-basic">
    <h3>全局配置注入</h3>
    <CxConfigGlobal :config="config">
      <div class="cx-config-global-example-basic__content">
        <p>projectName: {{ config.projectName }}</p>
        <p>dictApi: {{ config.dictApi }}</p>
      </div>
    </CxConfigGlobal>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import CxConfigGlobal from '../CxConfigGlobal.vue'

defineOptions({ name: 'CxConfigGlobalExampleBasic' })

const config = reactive({
  projectName: '管理系统',
  dictApi: '/api/dict',
  uploadUrl: '/api/upload',
})
</script>

<style scoped lang="scss">
.cx-config-global-example-basic {
  &__content {
    padding: 16px;
    background: #f5f7fa;
    border-radius: 4px;
    line-height: 2;
  }
}
</style>
