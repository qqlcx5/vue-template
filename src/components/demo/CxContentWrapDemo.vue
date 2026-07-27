<template>
  <div class="demo-page">
    <el-card header="CxContentWrap 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-content-wrap-demo__section">
        <CxContentWrap title="页面标题" message="这是描述信息，用于补充说明当前页面的用途">
          <p>这里是内容区域，可以放置表格、表单等任意内容。</p>
          <el-tag type="success">示例标签</el-tag>
        </CxContentWrap>
      </div>

      <!-- 场景2：仅标题无描述 -->
      <h3>场景2：仅标题无描述</h3>
      <div class="cx-content-wrap-demo__section">
        <CxContentWrap title="纯标题模式">
          <p>没有传入 message，仅显示标题。</p>
        </CxContentWrap>
      </div>

      <!-- 场景3：自定义样式 -->
      <h3>场景3：自定义内容区域样式</h3>
      <div class="cx-content-wrap-demo__section">
        <CxContentWrap
          title="自定义样式"
          message="通过 contentStyle 和 contentClass 控制内容区域"
          :content-style="{ backgroundColor: '#f0f9eb', padding: '20px', borderRadius: '8px' }"
          content-class="custom-content"
        >
          <p>背景色已通过 contentStyle 自定义。</p>
          <p>同时传入了 contentClass 属性。</p>
        </CxContentWrap>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CxContentWrap } from '@/components/CxContentWrap'

defineOptions({
  name: 'CxContentWrapDemo'
})
</script>

<style scoped lang="scss">
.cx-content-wrap-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
