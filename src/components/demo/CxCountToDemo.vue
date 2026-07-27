<template>
  <div class="demo-page">
    <el-card header="CxCountTo — 数字动画组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxCountTo 提供平滑的数字递增/递减动画，支持自定义格式化、缓动函数、手动控制等。
      </el-alert>

      <!-- 场景1：基础递增动画 -->
      <h3>场景1：基础递增动画（startVal=0, endVal=9527）</h3>
      <div class="demo-row">
        <CxCountTo :start-val="0" :end-val="9527" :duration="2000" font-size="36px" color="#409eff" />
      </div>

      <!-- 场景2：递减动画 -->
      <h3>场景2：递减动画（倒计时 9999→0）</h3>
      <div class="demo-row">
        <CxCountTo :start-val="9999" :end-val="0" :duration="3000" font-size="36px" color="#f56c6c" />
      </div>

      <!-- 场景3：格式化 -->
      <h3>场景3：格式化（千分位、小数、前缀后缀、颜色、字号）</h3>
      <div class="demo-row format-row">
        <div class="format-item">
          <span class="format-label">千分位：</span>
          <CxCountTo :start-val="0" :end-val="1234567" :duration="2000" separator="," font-size="28px" color="#67c23a" />
        </div>
        <div class="format-item">
          <span class="format-label">两位小数：</span>
          <CxCountTo :start-val="0" :end-val="3141.59" :duration="2000" :decimals="2" font-size="28px" color="#e6a23c" />
        </div>
        <div class="format-item">
          <span class="format-label">前缀后缀：</span>
          <CxCountTo :start-val="0" :end-val="8888" :duration="2000" prefix="￥" suffix="元" font-size="28px" color="#f56c6c" />
        </div>
        <div class="format-item">
          <span class="format-label">自定义分隔符：</span>
          <CxCountTo :start-val="0" :end-val="987654" :duration="2000" separator=" " font-size="28px" color="#909399" />
        </div>
      </div>

      <!-- 场景4：关闭自动播放手动触发 -->
      <h3>场景4：关闭自动播放 + 手动触发（autoplay=false + ref.start()）</h3>
      <div class="demo-row">
        <CxCountTo
          ref="manualRef"
          :start-val="0"
          :end-val="6789"
          :duration="2000"
          :autoplay="false"
          font-size="36px"
          color="#409eff"
        />
        <div class="manual-btns">
          <el-button type="primary" @click="manualStart">开始</el-button>
          <el-button @click="manualPauseResume">暂停/继续</el-button>
          <el-button type="danger" @click="manualReset">重置</el-button>
        </div>
      </div>

      <!-- 场景5：expose 方法演示 -->
      <h3>场景5：expose 方法（start / pauseResume / reset）</h3>
      <div class="demo-row">
        <CxCountTo
          ref="exposeRef"
          :start-val="0"
          :end-val="100000"
          :duration="5000"
          :autoplay="false"
          separator=","
          font-size="32px"
          color="#9b59b6"
        />
        <div class="manual-btns">
          <el-button type="primary" size="small" @click="exposeStart">start()</el-button>
          <el-button size="small" @click="exposePauseResume">pauseResume()</el-button>
          <el-button type="danger" size="small" @click="exposeReset">reset()</el-button>
        </div>
      </div>

      <!-- 场景6：自定义缓动函数 -->
      <h3>场景6：自定义缓动函数（easeInQuad）</h3>
      <div class="demo-row">
        <div class="easing-item">
          <span class="easing-label">easeInQuad：</span>
          <CxCountTo
            :start-val="0"
            :end-val="5000"
            :duration="3000"
            :use-easing="true"
            :easing-fn="easeInQuad"
            font-size="28px"
            color="#409eff"
          />
        </div>
        <div class="easing-item">
          <span class="easing-label">线性（useEasing=false）：</span>
          <CxCountTo
            :start-val="0"
            :end-val="5000"
            :duration="3000"
            :use-easing="false"
            font-size="28px"
            color="#67c23a"
          />
        </div>
      </div>

      <!-- 场景7：emit 回调 -->
      <h3>场景7：emit 回调（mounted / callback）</h3>
      <div class="demo-row">
        <CxCountTo
          :start-val="0"
          :end-val="2024"
          :duration="2500"
          font-size="32px"
          color="#e6a23c"
          @mounted="onMountedCallback"
          @callback="onCallback"
        />
        <div class="callback-log">
          <el-tag :type="mountedTag" style="margin-right: 8px">mounted 事件已触发</el-tag>
          <el-tag :type="callbackTag">callback 事件已触发（动画结束）</el-tag>
        </div>
      </div>

      <!-- 场景8：数据大屏仪表盘场景 -->
      <h3>场景8：数据大屏仪表盘场景（4 个卡片并排）</h3>
      <el-row :gutter="16">
        <el-col :span="6" v-for="(card, index) in dashboardCards" :key="index">
          <div class="dashboard-card" :style="{ background: card.bg }">
            <div class="dashboard-card__title">{{ card.title }}</div>
            <CxCountTo
              :start-val="0"
              :end-val="card.value"
              :duration="2000"
              separator=","
              :prefix="card.prefix"
              :suffix="card.suffix"
              font-size="36px"
              color="#fff"
            />
            <div class="dashboard-card__desc">{{ card.desc }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import CxCountTo from '@/components/CxCountTo'
import type { EasingFn } from '@/components/CxCountTo'

// 场景4：手动控制
const manualRef = ref<InstanceType<typeof CxCountTo> | null>(null)

function manualStart() {
  manualRef.value?.start()
}

function manualPauseResume() {
  manualRef.value?.pauseResume()
}

function manualReset() {
  manualRef.value?.reset()
}

// 场景5：expose 方法
const exposeRef = ref<InstanceType<typeof CxCountTo> | null>(null)

function exposeStart() {
  exposeRef.value?.start()
}

function exposePauseResume() {
  exposeRef.value?.pauseResume()
}

function exposeReset() {
  exposeRef.value?.reset()
}

// 场景6：自定义缓动函数 easeInQuad
const easeInQuad: EasingFn = (t, b, c, d) => {
  return c * (t / d) * (t / d) + b
}

// 场景7：emit 回调
const mountedTag = ref<'info' | 'success'>('info')
const callbackTag = ref<'info' | 'success'>('info')

function onMountedCallback() {
  mountedTag.value = 'success'
  ElMessage.info('mounted 事件触发')
}

function onCallback() {
  callbackTag.value = 'success'
  ElMessage.success('callback 事件触发：动画结束')
}

// 场景8：仪表盘数据
const dashboardCards = [
  { title: '今日访问量', value: 18642, prefix: '', suffix: '次', desc: '较昨日 ↑ 12.5%', bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { title: '订单总数', value: 3689, prefix: '', suffix: '单', desc: '较昨日 ↑ 8.3%', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { title: '交易金额', value: 528600, prefix: '￥', suffix: '', desc: '较昨日 ↑ 15.7%', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { title: '在线用户', value: 9527, prefix: '', suffix: '人', desc: '实时在线', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)' }
]
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

.demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.format-row {
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.format-item,
.easing-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.format-label,
.easing-label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  min-width: 120px;
}

.manual-btns {
  display: flex;
  gap: 8px;
}

.callback-log {
  display: flex;
  align-items: center;
}

.dashboard-card {
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  color: #fff;

  &__title {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 12px;
    opacity: 0.8;
    margin-top: 8px;
  }
}
</style>
