<template>
  <div class="cx-card-example-basic">
    <h3>基础卡片 + 操作区</h3>
    <CxCard title="用户列表">
      <template #header>
        <el-button type="primary" size="small">新增</el-button>
      </template>
      <p>卡片内容区域，可放置表格、表单、图表等任意内容。</p>
    </CxCard>
  </div>
</template>

<script setup lang="ts">
import CxCard from '../CxCard.vue'

defineOptions({ name: 'CxCardExampleBasic' })
</script>
