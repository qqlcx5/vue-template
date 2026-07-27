<template>
  <div class="demo-page">
    <el-card header="CxCard 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-card-demo__section">
        <CxCard title="卡片标题">
          <p>这是卡片的内容区域，可以放置任意内容。</p>
        </CxCard>
      </div>

      <!-- 场景2：不同阴影 -->
      <h3>场景2：不同阴影</h3>
      <div class="cx-card-demo__section">
        <CxCard title="always 阴影" shadow="always" style="margin-bottom: 12px">
          <p>shadow="always" — 总是显示阴影</p>
        </CxCard>
        <CxCard title="hover 阴影" shadow="hover" style="margin-bottom: 12px">
          <p>shadow="hover" — 鼠标悬浮时显示阴影</p>
        </CxCard>
        <CxCard title="never 阴影" shadow="never">
          <p>shadow="never" — 从不显示阴影</p>
        </CxCard>
      </div>

      <!-- 场景3：自定义样式 -->
      <h3>场景3：自定义样式</h3>
      <div class="cx-card-demo__section">
        <CxCard title="自定义样式" :body-style="{ color: '#409eff', fontSize: '16px' }">
          <p>bodyStyle 设置了蓝色字体和 16px 字号。</p>
        </CxCard>
      </div>

      <!-- 场景4：点击事件 -->
      <h3>场景4：点击事件</h3>
      <div class="cx-card-demo__section">
        <CxCard title="可点击卡片（查看控制台）" @click="handleCardClick">
          <p>点击此卡片，控制台会输出日志。</p>
        </CxCard>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CxCard } from '@/components/CxCard'

defineOptions({
  name: 'CxCardDemo'
})

function handleCardClick() {
  console.log('[CxCard] 卡片被点击')
}
</script>

<style scoped lang="scss">
.cx-card-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
