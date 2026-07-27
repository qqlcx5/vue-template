# CxCropper 场景说明

## 典型场景

- 用户头像上传裁剪（配合 `circled` 圆形裁剪模式）
- 图片编辑器中区域裁剪
- 证件照、封面图等需要精确尺寸裁剪的场景
- 需要图片实时预览裁剪结果再提交的表单

## 不适用场景

- 简单的图片尺寸缩放（用 CSS 或 `canvas` API 即可）
- 纯图片查看器（无需裁剪功能）
- 多图拼接 / 拼图场景

---

## 使用示例

### 1. 基础矩形裁剪

```vue
<template>
  <div>
    <CxCropper
      src="https://example.com/photo.jpg"
      @cropper="handleCrop"
      @readied="handleReady"
    />
    <img v-if="result" :src="result.base64" style="max-width: 300px" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxCropper } from '@/components/CxCropper'
import type { CxCropperResult } from '@/components/CxCropper'

const result = ref<CxCropperResult | null>(null)

function handleCrop(res: CxCropperResult) {
  result.value = res
  console.log('裁剪结果:', res.base64, res.blob, res.info)
}

function handleReady(instance: any) {
  console.log('Cropper 实例已就绪')
}
</script>
```

### 2. 圆形头像裁剪

```vue
<template>
  <CxCropper
    src="https://example.com/avatar.jpg"
    :circled="true"
    height="300px"
    @cropper="handleAvatar"
  />
</template>

<script setup lang="ts">
import { CxCropper } from '@/components/CxCropper'
import type { CxCropperResult } from '@/components/CxCropper'

function handleAvatar(result: CxCropperResult) {
  uploadToServer(result.blob)
}

function uploadToServer(blob: Blob) {
  const form = new FormData()
  form.append('avatar', blob, 'avatar.png')
  // fetch('/api/upload', { method: 'POST', body: form })
}
</script>
```

### 3. 关闭实时预览（仅操作完成后获取结果）

```vue
<template>
  <CxCropper
    src="https://example.com/photo.jpg"
    :real-time-preview="false"
    @cropper="handleFinalCrop"
  />
  <el-button @click="getCurrentCrop">获取当前裁剪结果</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxCropper } from '@/components/CxCropper'
import type { CxCropperResult } from '@/components/CxCropper'

const finalResult = ref<CxCropperResult | null>(null)

function handleFinalCrop(result: CxCropperResult) {
  finalResult.value = result
}

function getCurrentCrop() {
  // finalResult 为最后一次裁剪框停止时的结果
}
</script>
```

### 4. 自定义 cropperjs 配置

```vue
<template>
  <CxCropper
    src="https://example.com/photo.jpg"
    :options="cropperOptions"
    @cropper="handleCrop"
  />
</template>

<script setup lang="ts">
import { CxCropper } from '@/components/CxCropper'
import type Cropper from 'cropperjs'

const cropperOptions: Cropper.Options = {
  aspectRatio: 16 / 9,
  minCropBoxWidth: 200,
  minCropBoxHeight: 112,
  guides: true,
  viewMode: 1
}
</script>
```

### 5. 自定义样式与 crossorigin

```vue
<template>
  <CxCropper
    src="https://cross-origin.example.com/photo.jpg"
    crossorigin="anonymous"
    :image-style="{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }"
    :height="400"
    @cropper="handleCrop"
  />
</template>
```

### 6. 处理错误

```vue
<template>
  <CxCropper
    src="https://example.com/broken-image.jpg"
    @error="handleError"
    @cropper="handleCrop"
  />
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

function handleError() {
  ElMessage.error('图片裁剪过程出错，请重试')
}
</script>
```

### 7. 右键菜单功能概览

组件内置右键菜单，在裁剪区域右键单击即可唤出：

| 操作 | 说明 |
| --- | --- |
| 上传 | 选择本地图片替换当前裁剪图片 |
| 下载 | 下载当前裁剪结果为 `cropping.png` |
| 圆形/矩形裁剪 | 切换裁剪框形状 |
| 重置 | 重置裁剪框到初始状态 |
| 移动（上下左右） | 长按持续移动 |
| 翻转（水平/垂直） | 翻转图片方向 |
| 旋转（逆/顺时针） | 每次旋转 45° |
| 缩放（放大/缩小） | 长按持续缩放，步进 0.1 |
