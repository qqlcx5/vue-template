<template>
  <div class="demo-page">
    <el-card header="CxBacktop 示例" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        向下滚动页面查看返回顶部按钮效果。
      </el-alert>

      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-backtop-demo__section">
        <p class="cx-backtop-demo__tip">向下滚动此页面，右下角会出现返回顶部按钮</p>
        <CxBacktop />
      </div>

      <!-- 场景2：自定义位置 -->
      <h3>场景2：自定义位置</h3>
      <div class="cx-backtop-demo__section">
        <p class="cx-backtop-demo__tip">right="80" bottom="80"</p>
        <CxBacktop :right="80" :bottom="80" />
      </div>

      <!-- 场景3：监听点击事件 -->
      <h3>场景3：监听点击事件</h3>
      <div class="cx-backtop-demo__section">
        <p class="cx-backtop-demo__tip">点击返回顶部后，控制台会输出日志</p>
        <CxBacktop @click="handleClick" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CxBacktop } from '@/components/CxBacktop'

defineOptions({
  name: 'CxBacktopDemo'
})

function handleClick() {
  console.log('[CxBacktop] 点击返回顶部')
}
</script>

<style scoped lang="scss">
.cx-backtop-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }

  &__tip {
    margin: 0 0 8px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}
</style>
