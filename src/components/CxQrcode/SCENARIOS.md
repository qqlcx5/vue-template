---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_3bf1a5a486a611f18108525400287e28
    ReservedCode1: e4uX/77B6+GN1XN4x7wWznk1l/0E0OOPcHIf8vdVejMEeHQeeMTmGhQjHuTZ2oZzKaL8bRNA2w+NvEGQ4Zpbb2+ai6nkrkyL70XZZpcCM4n1wwaQm/3ovGnudCyIOyCfpRvqpiPAizXEc1F1FmtdKYkPoihW/eHKuPaqpH8PFQTuaV5a9OW61RlnjsM=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_3bf1a5a486a611f18108525400287e28
    ReservedCode2: e4uX/77B6+GN1XN4x7wWznk1l/0E0OOPcHIf8vdVejMEeHQeeMTmGhQjHuTZ2oZzKaL8bRNA2w+NvEGQ4Zpbb2+ai6nkrkyL70XZZpcCM4n1wwaQm/3ovGnudCyIOyCfpRvqpiPAizXEc1F1FmtdKYkPoihW/eHKuPaqpH8PFQTuaV5a9OW61RlnjsM=
---

# CxQrcode 场景说明

## 典型场景

1. 分享页面生成当前 URL 的二维码（如活动分享、邀请注册）
2. 设备绑定/激活时生成设备码二维码
3. 支付场景生成收款二维码
4. 固定二维码失效后的过期提示（如活动结束）

## 不适用场景

- 需要批量生成大量二维码（应直接调用 `qrcode` 库在后端或 Worker 中处理）
- 需要高度自定义二维码样式（如圆点、渐变、自定义眼图案等，超出了 `qrcode` 基础配置范围）

---

## Props 示例

### tag — canvas 模式（支持 Logo）

```vue
<template>
  <CxQrcode tag="canvas" text="https://example.com" />
</template>
```

### tag — img 模式

```vue
<template>
  <CxQrcode tag="img" text="https://example.com" />
</template>
```

> img 模式不支持 Logo，适合不需要 Logo 的纯二维码场景。

### text

```vue
<template>
  <!-- 简单字符串 -->
  <CxQrcode text="WIFI:T:WPA;S:mynetwork;P:mypass;;" />

  <!-- 会自动转为字符串 -->
  <CxQrcode :text="[{ name: 'John', id: 42 }]" />
</template>
```

### width

```vue
<template>
  <CxQrcode text="https://example.com" :width="128" />
  <CxQrcode text="https://example.com" :width="400" />
</template>
```

### logo — 字符串形式

```vue
<template>
  <CxQrcode
    text="https://example.com"
    logo="https://example.com/logo.png"
  />
</template>
```

### logo — 对象形式（细粒度控制）

```vue
<template>
  <CxQrcode
    text="https://example.com"
    :logo="{
      src: 'https://example.com/logo.png',
      logoSize: 0.2,
      bgColor: '#f0f0f0',
      borderRadius: 12,
      logoRadius: 6
    }"
  />
</template>
```

### disabled + disabledText

```vue
<template>
  <CxQrcode
    text="https://example.com"
    :disabled="isExpired"
    disabled-text="二维码已过期，点击刷新"
  />
</template>
```

---

## Emits 示例

### done — 获取二维码 Data URL

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CxQrcode } from '@/components/CxQrcode'

const qrcodeUrl = ref('')

function onDone(url: string) {
  qrcodeUrl.value = url
  // 可用于下载或保存
}
</script>

<template>
  <CxQrcode text="https://example.com" @done="onDone" />
  <p v-if="qrcodeUrl">二维码已生成</p>
</template>
```

### click — 点击二维码

```vue
<script setup lang="ts">
import { ElMessage } from 'element-plus'

function onQrcodeClick() {
  ElMessage.success('已复制链接到剪贴板')
}
</script>

<template>
  <CxQrcode text="https://example.com" @click="onQrcodeClick" />
</template>
```

### disabled-click — 点击过期遮罩

```vue
<script setup lang="ts">
const expired = ref(true)

function onDisabledClick() {
  // 刷新二维码
  expired.value = false
  setTimeout(() => (expired.value = true), 60000)
}
</script>

<template>
  <CxQrcode
    text="https://example.com?t=123"
    :disabled="expired"
    disabled-text="点击刷新"
    @disabled-click="onDisabledClick"
  />
</template>
```

---

## 复杂场景

### 支付二维码 + 自动过期

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CxQrcode } from '@/components/CxQrcode'

const qrText = ref('')
const expired = ref(false)
let timer: ReturnType<typeof setTimeout>

async function generatePayCode() {
  expired.value = false
  // 模拟获取支付码
  qrText.value = `pay://order/${Date.now()}`
  // 30 秒后过期
  timer = setTimeout(() => {
    expired.value = true
  }, 30000)
}

onMounted(() => generatePayCode())
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <div class="pay-qrcode">
    <CxQrcode
      :text="qrText"
      :width="260"
      :disabled="expired"
      disabled-text="二维码已失效，点击刷新"
      @disabled-click="generatePayCode"
    />
    <p>请使用 App 扫码支付</p>
  </div>
</template>

<style scoped>
.pay-qrcode {
  text-align: center;
  padding: 24px;
}
</style>
```

### 带 Logo 的分享二维码

```vue
<script setup lang="ts">
import { ref } from 'vue'

const shareUrl = ref(`https://example.com/share/${Date.now()}`)
const qrcodeUrl = ref('')

function onDone(url: string) {
  qrcodeUrl.value = url
}

function downloadQR() {
  const a = document.createElement('a')
  a.href = qrcodeUrl.value
  a.download = 'share-qrcode.png'
  a.click()
}
</script>

<template>
  <div class="share-card">
    <CxQrcode
      :text="shareUrl"
      :width="220"
      :logo="{
        src: '/logo.png',
        logoSize: 0.18,
        bgColor: '#ffffff',
        borderRadius: 10
      }"
      @done="onDone"
    />
    <p>扫码分享给好友</p>
    <el-button v-if="qrcodeUrl" @click="downloadQR">保存二维码</el-button>
  </div>
</template>
```
