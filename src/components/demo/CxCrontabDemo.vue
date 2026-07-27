<template>
  <div class="demo-page">
    <el-card header="CxCrontab 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-crontab-demo__section">
        <CxCrontab v-model="cron1" />
        <p style="margin-top: 8px">当前值：<el-tag>{{ cron1 || '未设置' }}</el-tag></p>
      </div>

      <!-- 场景2：隐藏秒 -->
      <h3>场景2：隐藏秒</h3>
      <div class="cx-crontab-demo__section">
        <CxCrontab v-model="cron2" :hide-second="true" />
        <p style="margin-top: 8px">当前值：<el-tag>{{ cron2 || '未设置' }}</el-tag></p>
      </div>

      <!-- 场景3：显示年 -->
      <h3>场景3：显示年</h3>
      <div class="cx-crontab-demo__section">
        <CxCrontab v-model="cron3" :hide-year="false" />
        <p style="margin-top: 8px">当前值：<el-tag>{{ cron3 || '未设置' }}</el-tag></p>
      </div>

      <!-- 场景4：隐藏周 -->
      <h3>场景4：隐藏周</h3>
      <div class="cx-crontab-demo__section">
        <CxCrontab v-model="cron4" :hide-week="true" />
        <p style="margin-top: 8px">当前值：<el-tag>{{ cron4 || '未设置' }}</el-tag></p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxCrontab } from '@/components/CxCrontab'

defineOptions({
  name: 'CxCrontabDemo'
})

const cron1 = ref('')
const cron2 = ref('')
const cron3 = ref('')
const cron4 = ref('')
</script>

<style scoped lang="scss">
.cx-crontab-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
