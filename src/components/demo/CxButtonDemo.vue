<template>
  <div class="demo-page">
    <el-card header="CxButton 示例" shadow="never">
      <!-- 场景1：不同类型 -->
      <h3>场景1：不同类型</h3>
      <div class="cx-button-demo__section">
        <CxButton type="primary">primary</CxButton>
        <CxButton type="success">success</CxButton>
        <CxButton type="warning">warning</CxButton>
        <CxButton type="danger">danger</CxButton>
        <CxButton type="info">info</CxButton>
      </div>

      <!-- 场景2：不同尺寸 -->
      <h3>场景2：不同尺寸</h3>
      <div class="cx-button-demo__section">
        <CxButton size="large" type="primary">large</CxButton>
        <CxButton size="default" type="primary">default</CxButton>
        <CxButton size="small" type="primary">small</CxButton>
      </div>

      <!-- 场景3：带图标 -->
      <h3>场景3：带图标</h3>
      <div class="cx-button-demo__section">
        <CxButton type="primary" pre-icon="mdi:plus">新增</CxButton>
        <CxButton type="success" post-icon="mdi:arrow-right">下一步</CxButton>
      </div>

      <!-- 场景4：loading 状态 -->
      <h3>场景4：loading 状态</h3>
      <div class="cx-button-demo__section">
        <CxButton type="primary" :loading="loading" @click="toggleLoading">
          {{ loading ? '加载中...' : '点击切换 loading' }}
        </CxButton>
      </div>

      <!-- 场景5：disabled 状态 -->
      <h3>场景5：disabled 状态</h3>
      <div class="cx-button-demo__section">
        <CxButton type="primary" disabled>禁用按钮</CxButton>
        <CxButton type="success" disabled>禁用按钮</CxButton>
      </div>

      <!-- 场景6：圆形按钮 -->
      <h3>场景6：圆形按钮</h3>
      <div class="cx-button-demo__section">
        <CxButton type="primary" circle pre-icon="mdi:check" />
        <CxButton type="success" circle pre-icon="mdi:plus" />
        <CxButton type="danger" circle pre-icon="mdi:close" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxButton } from '@/components/CxButton'

defineOptions({
  name: 'CxButtonDemo'
})

const loading = ref(false)

function toggleLoading() {
  loading.value = !loading.value
}
</script>

<style scoped lang="scss">
.cx-button-demo {
  &__section {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
    flex-wrap: wrap;
  }
}
</style>
