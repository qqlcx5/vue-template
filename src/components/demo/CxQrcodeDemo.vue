<template>
  <div class="demo-page">
    <el-card header="CxQrcode — 二维码组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxQrcode 支持 canvas/img 两种渲染模式，canvas 模式支持 Logo 嵌套、过期遮罩、点击事件等。
      </el-alert>

      <!-- 场景1：canvas 模式（支持 Logo） -->
      <h3>场景1：canvas 模式（支持 Logo）</h3>
      <div class="demo-row">
        <CxQrcode
          tag="canvas"
          text="https://example.com/canvas-mode"
          :width="200"
          @done="onDone('canvas')"
        />
        <div class="qr-desc">
          <el-tag type="primary">canvas 模式</el-tag>
          <p>支持 Logo 嵌套、过期遮罩等高级功能</p>
        </div>
      </div>

      <!-- 场景2：img 模式 -->
      <h3>场景2：img 模式</h3>
      <div class="demo-row">
        <CxQrcode
          tag="img"
          text="https://example.com/img-mode"
          :width="200"
          @done="onDone('img')"
        />
        <div class="qr-desc">
          <el-tag type="success">img 模式</el-tag>
          <p>轻量级模式，不支持 Logo 嵌套</p>
        </div>
      </div>

      <!-- 场景3：自定义 width -->
      <h3>场景3：自定义 width</h3>
      <div class="demo-row">
        <div class="qr-size-item">
          <CxQrcode text="width-100" :width="100" />
          <span class="qr-size-label">100px</span>
        </div>
        <div class="qr-size-item">
          <CxQrcode text="width-150" :width="150" />
          <span class="qr-size-label">150px</span>
        </div>
        <div class="qr-size-item">
          <CxQrcode text="width-200" :width="200" />
          <span class="qr-size-label">200px</span>
        </div>
        <div class="qr-size-item">
          <CxQrcode text="width-256" :width="256" />
          <span class="qr-size-label">256px</span>
        </div>
      </div>

      <!-- 场景4：logo 字符串形式 -->
      <h3>场景4：logo 字符串形式</h3>
      <div class="demo-row">
        <CxQrcode
          tag="canvas"
          text="https://example.com/with-logo-string"
          :width="200"
          logo="https://element-plus.org/images/element-plus-logo.svg"
          @done="onDone('logo-string')"
        />
        <div class="qr-desc">
          <el-tag>logo 字符串形式</el-tag>
          <p>直接传入 Logo 图片 URL</p>
        </div>
      </div>

      <!-- 场景5：logo 对象形式 -->
      <h3>场景5：logo 对象形式（logoSize/bgColor/borderRadius/logoRadius）</h3>
      <div class="demo-row">
        <div class="qr-logo-item">
          <CxQrcode
            tag="canvas"
            text="https://example.com/logo-obj-1"
            :width="180"
            :logo="{
              src: 'https://element-plus.org/images/element-plus-logo.svg',
              logoSize: 0.2,
              bgColor: '#ffffff',
              borderRadius: 10
            }"
          />
          <span class="qr-size-label">logoSize=0.2 borderRadius=10</span>
        </div>
        <div class="qr-logo-item">
          <CxQrcode
            tag="canvas"
            text="https://example.com/logo-obj-2"
            :width="180"
            :logo="{
              src: 'https://element-plus.org/images/element-plus-logo.svg',
              logoSize: 0.25,
              bgColor: '#f0f0f0',
              borderRadius: 0,
              logoRadius: 12
            }"
          />
          <span class="qr-size-label">logoSize=0.25 logoRadius=12</span>
        </div>
      </div>

      <!-- 场景6：disabled + disabledText 过期遮罩 -->
      <h3>场景6：disabled + disabledText 过期遮罩</h3>
      <div class="demo-row">
        <CxQrcode
          tag="canvas"
          text="https://example.com/expired"
          :width="200"
          :disabled="qrExpired"
          disabled-text="二维码已过期"
          @disabled-click="onExpiredClick"
          @click="onQrClick"
        />
        <div class="qr-desc">
          <el-tag :type="qrExpired ? 'danger' : 'success'">{{ qrExpired ? '已过期' : '有效' }}</el-tag>
          <el-button size="small" @click="qrExpired = !qrExpired">
            {{ qrExpired ? '恢复' : '过期' }}
          </el-button>
          <p>点击遮罩可触发 disabled-click 事件</p>
        </div>
      </div>

      <!-- 场景7：done emit 获取 Data URL -->
      <h3>场景7：done emit 获取 Data URL</h3>
      <div class="demo-row">
        <CxQrcode
          tag="canvas"
          text="https://example.com/data-url"
          :width="180"
          @done="onDataUrl"
        />
        <div class="qr-desc">
          <el-tag type="info">done 事件返回 Data URL</el-tag>
          <p v-if="dataUrl" class="data-url-text">URL 长度：{{ dataUrl.length }} 字符</p>
        </div>
      </div>

      <!-- 场景8：click emit 点击事件 -->
      <h3>场景8：click emit 点击事件</h3>
      <div class="demo-row">
        <CxQrcode
          tag="canvas"
          text="https://example.com/click-test"
          :width="180"
          @click="onQrClick"
        />
        <div class="qr-desc">
          <el-tag type="warning">点击二维码触发 click 事件</el-tag>
          <p>点击次数：{{ clickCount }}</p>
        </div>
      </div>

      <!-- 场景9：支付二维码 + 自动过期场景 -->
      <h3>场景9：支付二维码 + 自动过期场景</h3>
      <div class="pay-scenario">
        <div class="pay-qr-container">
          <CxQrcode
            ref="payQrRef"
            tag="canvas"
            :text="payQrText"
            :width="220"
            :disabled="payExpired"
            disabled-text="二维码已过期，点击刷新"
            @click="onPayClick"
            @disabled-click="onPayRefresh"
            @done="onPayDone"
          />
        </div>
        <div class="pay-info">
          <div class="pay-amount">￥<span class="pay-amount__num">99.00</span></div>
          <div class="pay-tip">请使用微信/支付宝扫码支付</div>
          <div class="pay-countdown">
            <el-tag :type="payExpired ? 'danger' : 'success'">
              {{ payExpired ? '已过期' : `剩余 ${countdown}s` }}
            </el-tag>
          </div>
          <el-button type="primary" @click="resetPayQr" :disabled="!payExpired">刷新二维码</el-button>
        </div>
      </div>

      <!-- 场景10：带 Logo 分享二维码 + 下载场景 -->
      <h3>场景10：带 Logo 分享二维码 + 下载场景</h3>
      <div class="demo-row">
        <CxQrcode
          tag="canvas"
          text="https://example.com/share?ref=demo"
          :width="220"
          :logo="{
            src: 'https://element-plus.org/images/element-plus-logo.svg',
            logoSize: 0.2,
            bgColor: '#ffffff',
            borderRadius: 12,
            logoRadius: 6
          }"
          @done="onShareDone"
        />
        <div class="qr-desc">
          <el-button type="primary" :disabled="!shareDataUrl" @click="downloadShareQr">
            下载二维码
          </el-button>
          <el-button :disabled="!shareDataUrl" @click="copyShareUrl">复制链接</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { CxQrcode } from '@/components/CxQrcode'

// 场景7：Data URL
const dataUrl = ref('')

function onDataUrl(url: string) {
  dataUrl.value = url
}

// 场景8：click 事件
const clickCount = ref(0)

function onQrClick() {
  clickCount.value++
  ElMessage.info('二维码被点击')
}

function onDone(mode: string) {
  // 生成完成回调
}

// 场景6：过期遮罩
const qrExpired = ref(false)

function onExpiredClick() {
  ElMessage.warning('点击了过期遮罩，可在此刷新二维码')
  qrExpired.value = false
}

// 场景9：支付二维码
const payQrRef = ref<InstanceType<typeof CxQrcode> | null>(null)
const payQrText = ref('https://example.com/pay?order=202401010001')
const payExpired = ref(false)
const countdown = ref(60)
let payTimer: ReturnType<typeof setInterval> | null = null

function onPayClick() {
  ElMessage.info('点击了支付二维码')
}

function onPayRefresh() {
  ElMessage.warning('支付二维码已过期，正在刷新...')
  resetPayQr()
}

function onPayDone(url: string) {
  // 支付二维码生成完成
}

function resetPayQr() {
  payExpired.value = false
  countdown.value = 60
  payQrText.value = `https://example.com/pay?order=${Date.now()}`
  startCountdown()
}

function startCountdown() {
  if (payTimer) clearInterval(payTimer)
  payTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      payExpired.value = true
      if (payTimer) {
        clearInterval(payTimer)
        payTimer = null
      }
    }
  }, 1000)
}

onMounted(() => {
  startCountdown()
})

onUnmounted(() => {
  if (payTimer) clearInterval(payTimer)
})

// 场景10：分享二维码下载
const shareDataUrl = ref('')

function onShareDone(url: string) {
  shareDataUrl.value = url
}

function downloadShareQr() {
  if (!shareDataUrl.value) return
  const link = document.createElement('a')
  link.href = shareDataUrl.value
  link.download = 'share-qrcode.png'
  link.click()
  ElMessage.success('二维码已下载')
}

function copyShareUrl() {
  navigator.clipboard.writeText('https://example.com/share?ref=demo')
  ElMessage.success('链接已复制')
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

.demo-row {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.qr-desc {
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    font-size: 13px;
    color: var(--el-text-color-secondary);
    margin: 0;
  }
}

.qr-size-item,
.qr-logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.qr-size-label {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.data-url-text {
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.pay-scenario {
  display: flex;
  gap: 32px;
  align-items: center;
  padding: 24px;
  background: #f5f7fa;
  border-radius: 8px;
  margin-bottom: 16px;
}

.pay-qr-container {
  flex-shrink: 0;
}

.pay-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pay-amount {
  font-size: 14px;
  color: var(--el-text-color-secondary);

  &__num {
    font-size: 32px;
    font-weight: bold;
    color: #f56c6c;
  }
}

.pay-tip {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
</style>
