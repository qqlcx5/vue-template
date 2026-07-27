<template>
  <div class="demo-page">
    <el-card header="CxCropperPreview — 头像裁剪预览组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxCropperPreview 基于 CxCropper 封装，在裁剪区域右侧弹出 Popover 浮层，
        实时展示圆形裁剪后的头像预览效果及图片信息。
      </el-alert>

      <!-- 场景1：基础头像裁剪预览 -->
      <h3>场景1：基础头像裁剪预览（imgSrc + cropper 事件）</h3>
      <div class="demo-block">
        <CxCropperPreview
          img-src="https://picsum.photos/id/237/640/400"
          @cropper="handleCrop1"
        />
        <div v-if="result1" style="margin-top: 16px">
          <el-tag type="success">已获取裁剪结果</el-tag>
          <el-descriptions :column="1" border size="small" style="max-width: 400px; margin-top: 8px">
            <el-descriptions-item label="图像大小">
              {{ Math.round(result1.info.width) }} × {{ Math.round(result1.info.height) }} 像素
            </el-descriptions-item>
            <el-descriptions-item label="文件大小">
              {{ result1.info.size }} 字节（{{ (result1.info.size / 1024).toFixed(2) }} KB）
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <!-- 场景2：处理 cropper 事件获取 blob 并上传 -->
      <h3>场景2：处理 cropper 事件获取 blob 并上传</h3>
      <div class="demo-block">
        <CxCropperPreview
          img-src="https://picsum.photos/id/238/640/400"
          @cropper="onCropForUpload"
        />
        <div style="margin-top: 16px">
          <el-button
            type="primary"
            :disabled="!croppedBlob"
            @click="uploadAvatar"
          >
            提交头像
          </el-button>
          <el-tag v-if="croppedBlob" type="info" style="margin-left: 8px">
            已裁剪，大小：{{ (croppedBlob.size / 1024).toFixed(2) }} KB
          </el-tag>
          <el-tag v-else type="warning" style="margin-left: 8px">
            请先裁剪图片
          </el-tag>
        </div>
      </div>

      <!-- 场景3：hidePopover expose 方法 -->
      <h3>场景3：hidePopover expose 方法（手动关闭 Popover）</h3>
      <div class="demo-block">
        <el-row :gutter="12" style="margin-bottom: 12px">
          <el-button @click="closePreview">关闭预览浮层</el-button>
          <el-button type="primary" @click="openPreview">重新裁剪</el-button>
        </el-row>
        <CxCropperPreview
          ref="previewRef"
          img-src="https://picsum.photos/id/239/640/400"
          @cropper="onCrop3"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CxCropperPreview } from '@/components/CxCropperPreview'

// 场景1
const result1 = ref<{ base64: string; blob: Blob; info: any } | null>(null)
function handleCrop1(result: { base64: string; blob: Blob; info: any }) {
  result1.value = result
  console.log('裁剪结果 Base64:', result.base64)
  console.log('图片尺寸:', result.info.width, 'x', result.info.height)
  console.log('文件大小:', result.info.size, 'bytes')
}

// 场景2：上传
const croppedBlob = ref<Blob | null>(null)
function onCropForUpload(result: { base64: string; blob: Blob; info: any }) {
  croppedBlob.value = result.blob
}

function uploadAvatar() {
  if (!croppedBlob.value) return
  const form = new FormData()
  form.append('avatar', croppedBlob.value, 'avatar.png')
  // 模拟上传
  ElMessage.success('头像已提交上传（模拟）')
  console.log('上传 FormData:', form.get('avatar'))
}

// 场景3：hidePopover
const previewRef = ref<InstanceType<typeof CxCropperPreview>>()

function closePreview() {
  previewRef.value?.hidePopover()
  ElMessage.info('预览浮层已关闭')
}

function openPreview() {
  // 重新触发裁剪即可显示 Popover
  ElMessage.info('请重新裁剪图片以显示预览')
}

function onCrop3(result: { base64: string; blob: Blob; info: any }) {
  console.log('场景3 裁剪结果:', result.info.width, 'x', result.info.height)
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
}
</style>
