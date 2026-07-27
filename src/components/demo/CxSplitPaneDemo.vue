<template>
  <div class="demo-page">
    <el-card header="CxSplitPane — 分栏面板组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxSplitPane 是可拖拽调整大小的分割面板组件，支持左右（vertical）和上下（horizontal）两种分割方向，
        提供最小百分比限制、双击重置、程序化控制等能力。
      </el-alert>

      <!-- 场景1：基础左右分栏 -->
      <h3>场景1：基础左右分栏（#left / #right 插槽）</h3>
      <CxSplitPane style="height: 300px; margin-bottom: 24px">
        <template #left>
          <div class="pane-content pane-left">左侧面板内容</div>
        </template>
        <template #right>
          <div class="pane-content pane-right">右侧面板内容</div>
        </template>
      </CxSplitPane>

      <!-- 场景2：上下分栏 -->
      <h3>场景2：上下分栏（split="horizontal"）</h3>
      <CxSplitPane split="horizontal" style="height: 400px; margin-bottom: 24px">
        <template #left>
          <div class="pane-content pane-top">上方面板（编辑区）</div>
        </template>
        <template #right>
          <div class="pane-content pane-bottom">下方面板（预览区）</div>
        </template>
      </CxSplitPane>

      <!-- 场景3：自定义初始比例和最小限制 -->
      <h3>场景3：自定义初始比例和最小限制（defaultPercent / minPercent）</h3>
      <CxSplitPane
        :default-percent="30"
        :min-percent="15"
        style="height: 300px; margin-bottom: 24px"
      >
        <template #left>
          <div class="pane-content pane-left">
            导航面板（初始 30%，最小 15%）
          </div>
        </template>
        <template #right>
          <div class="pane-content pane-right">内容区域</div>
        </template>
      </CxSplitPane>

      <!-- 场景4：禁用拖拽 -->
      <h3>场景4：禁用拖拽（disabled）</h3>
      <CxSplitPane disabled :default-percent="40" style="height: 300px; margin-bottom: 24px">
        <template #left>
          <div class="pane-content pane-left">固定布局 — 不可拖拽调整</div>
        </template>
        <template #right>
          <div class="pane-content pane-right">右侧内容（固定比例）</div>
        </template>
      </CxSplitPane>

      <!-- 场景5：resize 事件监听比例变化 -->
      <h3>场景5：resize 事件监听比例变化</h3>
      <CxSplitPane
        @resize="onResize"
        style="height: 300px; margin-bottom: 24px"
      >
        <template #left>
          <div class="pane-content pane-left">
            左侧面板
            <p>当前比例：{{ currentPercent }}%</p>
          </div>
        </template>
        <template #right>
          <div class="pane-content pane-right">
            右侧面板
            <p>当前比例：{{ 100 - currentPercent }}%</p>
          </div>
        </template>
      </CxSplitPane>

      <!-- 场景6：expose 方法 reset / setPercent -->
      <h3>场景6：expose 方法（reset / setPercent）</h3>
      <el-row :gutter="12" style="margin-bottom: 12px">
        <el-button @click="splitRef?.reset()">重置为默认比例</el-button>
        <el-button @click="splitRef?.setPercent(70)">设为 70%</el-button>
        <el-button @click="splitRef?.setPercent(25)">设为 25%</el-button>
        <el-tag>当前百分比：{{ splitRef?.percent ?? 50 }}%</el-tag>
      </el-row>
      <CxSplitPane
        ref="splitRef"
        :default-percent="50"
        :min-percent="10"
        style="height: 300px; margin-bottom: 24px"
      >
        <template #left>
          <div class="pane-content pane-left">可通过上方按钮控制比例</div>
        </template>
        <template #right>
          <div class="pane-content pane-right">右侧面板</div>
        </template>
      </CxSplitPane>

      <!-- 场景7：嵌套实现三栏布局 -->
      <h3>场景7：嵌套实现三栏布局</h3>
      <CxSplitPane :default-percent="25" style="height: 400px">
        <template #left>
          <div class="pane-content pane-left">导航栏</div>
        </template>
        <template #right>
          <CxSplitPane :default-percent="60" style="height: 100%">
            <template #left>
              <div class="pane-content pane-center">编辑区</div>
            </template>
            <template #right>
              <div class="pane-content pane-right">属性面板</div>
            </template>
          </CxSplitPane>
        </template>
      </CxSplitPane>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxSplitPane from '@/components/CxSplitPane'

// 场景5：监听 resize
const currentPercent = ref(50)
function onResize(percent: number) {
  currentPercent.value = percent
}

// 场景6：expose 控制
const splitRef = ref<InstanceType<typeof CxSplitPane>>()
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

.pane-content {
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  p {
    margin: 8px 0 0;
    font-size: 13px;
    color: var(--el-text-color-secondary);
  }
}

.pane-left {
  background: #f5f7fa;
}

.pane-right {
  background: #fdf6ec;
}

.pane-top {
  background: #f0f9eb;
}

.pane-bottom {
  background: #fef0f0;
}

.pane-center {
  background: #ecf5ff;
}
</style>
