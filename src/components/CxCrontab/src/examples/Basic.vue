<template>
  <div class="cx-crontab-example-basic">
    <h3>Cron 表达式生成器</h3>
    <CxCrontab v-model="cron" />
    <p class="cx-crontab-example-basic__value">生成的表达式: <code>{{ cron }}</code></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxCrontab from '../CxCrontab.vue'

defineOptions({ name: 'CxCrontabExampleBasic' })

const cron = ref('0 0 8 * * ?')
</script>

<style scoped lang="scss">
.cx-crontab-example-basic {
  &__value {
    margin-top: 16px;
    font-size: 14px;

    code {
      padding: 2px 8px;
      background: #f0f2f5;
      border-radius: 3px;
      font-family: monospace;
    }
  }
}
</style>
