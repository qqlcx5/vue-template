<template>
  <div class="cx-count-to-example-manual">
    <h3 class="cx-count-to-example-manual__title">手动控制：Expose API</h3>
    <p class="cx-count-to-example-manual__desc">
      通过 ref 访问组件暴露的 start / pause / resume / pauseResume / reset 方法。
    </p>

    <!-- 注意：autoplay=false -->
    <div class="cx-count-to-example-manual__preview">
      <CxCountTo
        ref="countToRef"
        :start-val="0"
        :end-val="8888"
        :duration="4000"
        :font-size="'36px'"
        :autoplay="false"
        :color="'#7c3aed'"
      />
    </div>

    <div class="cx-count-to-example-manual__controls">
      <el-button type="primary" @click="handleStart">start</el-button>
      <el-button @click="handlePause">pause</el-button>
      <el-button @click="handleResume">resume</el-button>
      <el-button @click="handlePauseResume">pauseResume</el-button>
      <el-button type="warning" @click="handleReset">reset</el-button>
    </div>

    <div class="cx-count-to-example-manual__state">
      <el-tag :type="statusType">{{ statusText }}</el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElTag } from 'element-plus'
import CxCountTo from '../CxCountTo.vue'

defineOptions({
  name: 'CxCountToManualControl'
})

const countToRef = ref<InstanceType<typeof CxCountTo> | null>(null)

const statusType = ref<'info' | 'warning' | 'success' | 'danger'>('info')
const statusText = ref('等待启动')

function handleStart() {
  countToRef.value?.start()
  statusType.value = 'success'
  statusText.value = '动画运行中'
}

function handlePause() {
  countToRef.value?.pause()
  statusType.value = 'warning'
  statusText.value = '已暂停'
}

function handleResume() {
  countToRef.value?.resume()
  statusType.value = 'success'
  statusText.value = '已恢复'
}

function handlePauseResume() {
  countToRef.value?.pauseResume()
  statusType.value = statusType.value === 'warning' ? 'success' : 'warning'
  statusText.value = statusText.value === '已暂停' ? '已恢复' : '已暂停'
}

function handleReset() {
  countToRef.value?.reset()
  statusType.value = 'info'
  statusText.value = '已重置'
}
</script>

<style scoped lang="scss">
.cx-count-to-example-manual {
  max-width: 560px;
  padding: 16px;

  &__title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
  }

  &__desc {
    margin: 0 0 16px;
    font-size: 13px;
    color: #909399;
    line-height: 1.6;
  }

  &__preview {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
    padding: 24px;
    background: #f5f3ff;
    border-radius: 12px;
  }

  &__controls {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 16px;
  }

  &__state {
    text-align: center;
  }
}
</style>
