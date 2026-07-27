<template>
  <div class="demo-page">
    <el-card header="CxEmpty 示例" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        空状态占位组件，用于无数据时的占位展示。
      </el-alert>

      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-empty-demo__section">
        <CxEmpty />
      </div>

      <!-- 场景2：自定义描述 -->
      <h3>场景2：自定义描述</h3>
      <div class="cx-empty-demo__section">
        <CxEmpty description="暂无数据" />
      </div>

      <!-- 场景3：自定义图片大小 -->
      <h3>场景3：自定义图片大小（:imageSize="200"）</h3>
      <div class="cx-empty-demo__section">
        <CxEmpty :image-size="200" description="大尺寸占位图" />
      </div>

      <!-- 场景4：default 插槽 -->
      <h3>场景4：default 插槽 — 操作按钮</h3>
      <div class="cx-empty-demo__section">
        <CxEmpty description="暂无内容，点击添加">
          <template #default>
            <el-button type="primary" @click="handleAdd">添加数据</el-button>
          </template>
        </CxEmpty>
      </div>

      <!-- 场景5：image 插槽自定义占位图 -->
      <h3>场景5：image 插槽自定义占位图</h3>
      <div class="cx-empty-demo__section">
        <CxEmpty description="自定义占位图">
          <template #image>
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="20" y="30" width="60" height="45" rx="4" stroke="#C0C4CC" stroke-width="2" fill="#F2F3F5" />
              <path d="M20 38 L50 20 L80 38" stroke="#C0C4CC" stroke-width="2" fill="#E4E7ED" />
              <circle cx="40" cy="55" r="8" stroke="#C0C4CC" stroke-width="2" fill="none" />
              <line x1="46" y1="60" x2="60" y2="60" stroke="#C0C4CC" stroke-width="2" />
            </svg>
          </template>
        </CxEmpty>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CxEmpty } from '@/components/CxEmpty'

defineOptions({
  name: 'CxEmptyDemo'
})

function handleAdd() {
  console.log('[CxEmpty] 点击添加数据')
}
</script>

<style scoped lang="scss">
.cx-empty-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
