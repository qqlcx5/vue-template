<template>
  <div class="demo-page">
    <el-card header="CxContentDetailWrap 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-content-detail-wrap-demo__section">
        <CxContentDetailWrap title="详情页">
          <p>这里是详情页的主体内容区域。</p>
          <p>可以放置任意的 HTML 内容或组件。</p>
        </CxContentDetailWrap>
      </div>

      <!-- 场景2：自定义返回文字 -->
      <h3>场景2：自定义返回文字</h3>
      <div class="cx-content-detail-wrap-demo__section">
        <CxContentDetailWrap title="详情页" back-text="返回列表">
          <p>backText 设置为 "返回列表"。</p>
        </CxContentDetailWrap>
      </div>

      <!-- 场景3：隐藏返回按钮 -->
      <h3>场景3：隐藏返回按钮</h3>
      <div class="cx-content-detail-wrap-demo__section">
        <CxContentDetailWrap title="无返回按钮" :show-back="false">
          <p>showBack 设为 false，返回按钮已隐藏。</p>
        </CxContentDetailWrap>
      </div>

      <!-- 场景4：监听返回事件 -->
      <h3>场景4：监听返回事件</h3>
      <div class="cx-content-detail-wrap-demo__section">
        <CxContentDetailWrap title="事件监听" @back="handleBack">
          <p>点击返回按钮，控制台将输出日志。</p>
          <p v-if="backMsg" style="color: #67c23a">{{ backMsg }}</p>
        </CxContentDetailWrap>
      </div>

      <!-- 场景5：右侧插槽 -->
      <h3>场景5：右侧插槽</h3>
      <div class="cx-content-detail-wrap-demo__section">
        <CxContentDetailWrap title="带操作按钮">
          <template #right>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
          <p>通过 #right 插槽在标题栏右侧放置操作按钮。</p>
        </CxContentDetailWrap>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxContentDetailWrap } from '@/components/CxContentDetailWrap'

defineOptions({
  name: 'CxContentDetailWrapDemo'
})

const backMsg = ref('')

function handleBack() {
  backMsg.value = '已触发 back 事件（' + new Date().toLocaleTimeString() + '）'
}
</script>

<style scoped lang="scss">
.cx-content-detail-wrap-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
