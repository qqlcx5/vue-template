<template>
  <div class="cx-count-to-example-emit">
    <h3 class="cx-count-to-example-emit__title">事件监听：mounted 与 callback</h3>
    <p class="cx-count-to-example-emit__desc">
      组件挂载时触发 mounted 事件；动画完成时触发 callback 事件。
    </p>

    <div class="cx-count-to-example-emit__preview">
      <CxCountTo
        :end-val="9999"
        :duration="2500"
        :font-size="'32px'"
        @mounted="onMounted"
        @callback="onCallback"
      />
    </div>

    <div class="cx-count-to-example-emit__log">
      <div
        v-for="(log, idx) in logs"
        :key="idx"
        class="cx-count-to-example-emit__log-item"
      >
        <el-tag
          :type="log.type"
          size="small"
          class="cx-count-to-example-emit__log-tag"
        >
          {{ log.event }}
        </el-tag>
        <span class="cx-count-to-example-emit__log-time">{{ log.time }}</span>
        <span class="cx-count-to-example-emit__log-msg">{{ log.msg }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTag } from 'element-plus'
import CxCountTo from '../CxCountTo.vue'

defineOptions({
  name: 'CxCountToEmitEvents'
})

interface LogEntry {
  event: string
  type: 'success' | 'primary'
  time: string
  msg: string
}

const logs = ref<LogEntry[]>([])

function addLog(event: string, type: 'success' | 'primary', msg: string) {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`
  logs.value.push({ event, type, time, msg })
}

function onMounted() {
  addLog('mounted', 'primary', '组件已挂载，动画即将开始')
}

function onCallback() {
  addLog('callback', 'success', '动画完成，数字已到达目标值')
}
</script>

<style scoped lang="scss">
.cx-count-to-example-emit {
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
    text-align: center;
    margin-bottom: 20px;
    padding: 20px;
    background: #f0fdf4;
    border-radius: 12px;
  }

  &__log {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 180px;
    overflow-y: auto;
    padding: 12px;
    background: #1e1e2e;
    border-radius: 8px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 12px;
  }

  &__log-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__log-tag {
    flex-shrink: 0;
  }

  &__log-time {
    color: #a78bfa;
    flex-shrink: 0;
  }

  &__log-msg {
    color: #e2e8f0;
  }
}
</style>
