<template>
  <div class="demo-page">
    <el-card header="CxTypeit — 打字机效果组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxTypeit 基于 TypeIt 库封装，提供声明式打字动画能力，
        支持 strings、speed、loop、deleteSpeed 等全部 TypeIt 配置项。
      </el-alert>

      <!-- 场景1：基础打字动画 -->
      <h3>场景1：基础打字动画（strings/speed/waitUntilVisible/loop/loopDelay）</h3>
      <div class="demo-block">
        <CxTypeit :options="basicOptions" />
      </div>

      <!-- 场景2：带删除效果的单行打字 -->
      <h3>场景2：带删除效果的单行打字（deleteSpeed/breakLines=false）</h3>
      <div class="demo-block">
        <CxTypeit :options="deleteOptions" />
      </div>

      <!-- 场景3：default 插槽自定义打字目标 -->
      <h3>场景3：default 插槽自定义打字目标</h3>
      <div class="demo-block">
        <CxTypeit :options="slotOptions">
          <h2 class="custom-title" />
        </CxTypeit>
      </div>

      <!-- 场景4：expose 获取 typeIt 实例（freeze/unfreeze/destroy） -->
      <h3>场景4：expose 获取 typeIt 实例（freeze/unfreeze/destroy）</h3>
      <div class="demo-block">
        <el-row :gutter="12" style="margin-bottom: 12px">
          <el-button @click="pause">暂停（freeze）</el-button>
          <el-button type="primary" @click="resume">继续（unfreeze）</el-button>
          <el-button type="danger" @click="destroy">销毁（destroy）</el-button>
          <el-tag>状态：{{ statusLabel }}</el-tag>
        </el-row>
        <CxTypeit ref="typeitRef" :options="controlOptions" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CxTypeit from '@/components/CxTypeit'

// 场景1：基础打字动画
const basicOptions = {
  strings: ['Hello, World!', 'Welcome to CxTypeit.', 'Enjoy typing animations!'],
  speed: 80,
  waitUntilVisible: true,
  loop: true,
  loopDelay: 2000
}

// 场景2：带删除效果
const deleteOptions = {
  strings: ['前端开发工程师', 'Vue 3 技术栈', 'TypeScript 爱好者'],
  speed: 100,
  deleteSpeed: 50,
  breakLines: false,
  loop: true
}

// 场景3：自定义打字目标
const slotOptions = {
  strings: ['这是一段自定义标题的打字效果'],
  speed: 60
}

// 场景4：expose 控制
const typeitRef = ref<InstanceType<typeof CxTypeit>>()
const status = ref<'running' | 'paused' | 'destroyed'>('running')

const statusLabel = computed(() => {
  const map = { running: '运行中', paused: '已暂停', destroyed: '已销毁' }
  return map[status.value]
})

const controlOptions = {
  strings: ['这是一段可以手动控制的打字动画。试试上方的按钮来暂停、继续或销毁。'],
  speed: 80,
  loop: true,
  loopDelay: 3000
}

function pause() {
  typeitRef.value?.typeIt?.freeze()
  status.value = 'paused'
}

function resume() {
  typeitRef.value?.typeIt?.unfreeze()
  status.value = 'running'
}

function destroy() {
  typeitRef.value?.typeIt?.destroy()
  status.value = 'destroyed'
}
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

.demo-block {
  margin-bottom: 24px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 4px;
}

.custom-title {
  margin: 0;
  font-size: 24px;
  color: #409eff;
}
</style>
