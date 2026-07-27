<template>
  <div class="demo-page">
    <el-card header="CxFlop — 翻页时钟组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxFlop 是一个翻页式时钟组件，自动展示当前时间（时:分:秒），纯展示组件无需 props。
      </el-alert>

      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法（直接展示当前时间）</h3>
      <div class="flop-demo light-bg">
        <CxFlop />
      </div>

      <!-- 场景2：与仪表盘组件组合（监控大屏头部） -->
      <h3>场景2：与仪表盘组件组合（监控大屏头部）</h3>
      <div class="dashboard-header">
        <div class="dashboard-header__left">
          <div class="dashboard-header__title">实时监控大屏</div>
          <div class="dashboard-header__subtitle">系统运行状态总览</div>
        </div>
        <div class="dashboard-header__center">
          <CxFlop />
        </div>
        <div class="dashboard-header__right">
          <div class="dashboard-header__date">{{ todayStr }}</div>
          <div class="dashboard-header__week">{{ weekStr }}</div>
        </div>
      </div>

      <!-- 场景3：深色背景场景 -->
      <h3>场景3：深色背景场景</h3>
      <div class="flop-demo dark-bg">
        <CxFlop />
      </div>

      <!-- 场景4：大屏展示 -->
      <h3>场景4：大屏展示（缩放容器）</h3>
      <div class="flop-demo large-screen">
        <CxFlop />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CxFlop from '@/components/CxFlop'

const now = new Date()

const todayStr = computed(() => {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
})

const weekStr = computed(() => {
  const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weeks[now.getDay()]
})
</script>

<style scoped lang="scss">
.demo-page {
  padding: 16px;

  h3 {
    margin: 16px 0 8px;
    font-size: 15px;
    color: var(--el-text-color-primary);
  }
}

.flop-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
}

.light-bg {
  background: #f5f7fa;
  padding: 24px;
  border: 1px solid #e4e7ed;
}

.dark-bg {
  background: #1a1a2e;
  padding: 24px;

  :deep(.cx-flop em) {
    color: #e0e0e0;
  }
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #0c0c1d, #1a1a3e);
  border-radius: 8px;
  padding: 20px 32px;
  margin-bottom: 16px;

  &__left {
    flex-shrink: 0;
  }

  &__title {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }

  &__subtitle {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 4px;
  }

  &__center {
    :deep(.cx-flop em) {
      color: #e0e0e0;
    }
  }

  &__right {
    text-align: right;
    flex-shrink: 0;
  }

  &__date {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
  }

  &__week {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 4px;
  }
}

.large-screen {
  background: radial-gradient(ellipse at center, #0a2a6a, #000);
  padding: 40px;
  transform: scale(1.2);

  :deep(.cx-flop em) {
    color: #00d4ff;
  }
}
</style>
