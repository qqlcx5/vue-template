# CxCropperPreview 场景说明

## 典型场景

- 用户头像上传裁剪 + 实时预览（如个人信息设置页）
- 圆形头像裁剪并即时查看效果
- 需要展示裁剪后的图片尺寸和文件大小信息

## 不适用场景

- 非圆形裁剪（CxCropperPreview 内部固定 `circled` 模式）
- 仅需裁剪不需要预览浮层（直接使用 CxCropper）
- 批处理多张图片裁剪（组件每次只能处理单张）

---

## 使用示例

### 1. 基础头像裁剪预览（prop: imgSrc）

```vue
<template>
  <CxCropperPreview
    img-src="https://picsum.photos/400/400"
    @cropper="handleCropResult"
  />
</template>

<script setup lang="ts">
import { CxCropperPreview } from '@/components/CxCropperPreview'

function handleCropResult(result: { base64: string; blob: Blob; info: any }) {
  console.log('裁剪结果 Base64:', result.base64)
  console.log('图片尺寸:', result.info.width, 'x', result.info.height)
  console.log('文件大小:', result.info.size, 'bytes')
}
</script>
```

### 2. 处理 cropper 事件（emit: cropper）

```vue
<template>
  <div>
    <CxCropperPreview
      img-src="https://example.com/photo.jpg"
      @cropper="onCrop"
    />
    <el-button
      v-if="croppedBlob"
      type="primary"
      @click="uploadAvatar"
    >
      提交头像
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxCropperPreview } from '@/components/CxCropperPreview'

const croppedBlob = ref<Blob | null>(null)

function onCrop(result: { base64: string; blob: Blob; info: any }) {
  croppedBlob.value = result.blob
}

function uploadAvatar() {
  if (!croppedBlob.value) return
  const form = new FormData()
  form.append('avatar', croppedBlob.value, 'avatar.png')
  // fetch('/api/avatar', { method: 'POST', body: form })
}
</script>
```

### 3. 手动关闭 Popover（expose: hidePopover）

```vue
<template>
  <div>
    <CxCropperPreview
      ref="previewRef"
      img-src="https://example.com/photo.jpg"
      @cropper="onCrop"
    />
    <el-button @click="closePreview">关闭预览</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxCropperPreview } from '@/components/CxCropperPreview'

const previewRef = ref<InstanceType<typeof CxCropperPreview>>()

function closePreview() {
  previewRef.value?.hidePopover()
}
</script>
```
