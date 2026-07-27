<template>
  <div class="demo-page">
    <el-card header="CxCropper — 图片裁剪组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxCropper 基于 cropperjs 封装，提供完善的右键上下文菜单，支持上传、下载、圆形裁剪、
        拖拽移动、翻转、旋转和缩放等操作。
      </el-alert>

      <!-- 场景1：基础矩形裁剪 -->
      <h3>场景1：基础矩形裁剪（src + cropper 事件 + readied 事件）</h3>
      <div class="demo-block">
        <CxCropper
          src="https://picsum.photos/id/237/640/400"
          @cropper="handleCrop1"
          @readied="handleReady1"
        />
        <div v-if="result1" class="crop-result">
          <img :src="result1.base64" alt="裁剪结果" class="crop-preview" />
          <el-descriptions :column="1" border size="small" style="max-width: 400px">
            <el-descriptions-item label="文件大小">
              {{ (result1.info.size / 1024).toFixed(2) }} KB
            </el-descriptions-item>
            <el-descriptions-item label="裁剪区域">
              {{ Math.round(result1.info.width) }} × {{ Math.round(result1.info.height) }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <!-- 场景2：圆形头像裁剪 -->
      <h3>场景2：圆形头像裁剪（circled=true）</h3>
      <div class="demo-block">
        <CxCropper
          src="https://picsum.photos/id/237/640/400"
          :circled="true"
          height="300px"
          @cropper="handleCrop2"
        />
        <div v-if="result2" class="crop-result">
          <img :src="result2.base64" alt="头像裁剪结果" class="crop-preview crop-preview--circled" />
        </div>
      </div>

      <!-- 场景3：关闭实时预览 -->
      <h3>场景3：关闭实时预览（real-time-preview=false）</h3>
      <div class="demo-block">
        <el-alert type="info" :closable="false" style="margin-bottom: 8px">
          关闭实时预览后，裁剪结果仅在裁剪框停止移动后（debounce 80ms）触发。
        </el-alert>
        <CxCropper
          src="https://picsum.photos/id/238/640/400"
          :real-time-preview="false"
          @cropper="handleCrop3"
        />
        <el-tag v-if="result3" type="info" style="margin-top: 8px">
          已获取裁剪结果（非实时）
        </el-tag>
      </div>

      <!-- 场景4：自定义 cropperjs 配置 -->
      <h3>场景4：自定义 cropperjs 配置（aspectRatio/minCropBoxWidth/guides/viewMode）</h3>
      <div class="demo-block">
        <CxCropper
          src="https://picsum.photos/id/239/640/400"
          :options="cropperOptions"
          @cropper="handleCrop4"
        />
      </div>

      <!-- 场景5：自定义样式与 crossorigin -->
      <h3>场景5：自定义样式与 crossorigin</h3>
      <div class="demo-block">
        <CxCropper
          src="https://picsum.photos/id/240/640/400"
          crossorigin="anonymous"
          :image-style="{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }"
          :height="400"
          @cropper="handleCrop5"
        />
      </div>

      <!-- 场景6：错误处理 -->
      <h3>场景6：错误处理（error 事件）</h3>
      <div class="demo-block">
        <el-alert
          v-if="scene6Error"
          title="错误处理结果"
          type="error"
          :description="`图片加载失败：${scene6Error}`"
          show-icon
          :closable="false"
          style="margin-bottom: 8px"
        />
        <CxCropper
          src="https://broken-url.example.com/nonexistent-image.jpg"
          @error="handleError"
          @cropper="handleCrop6"
        />
      </div>

      <!-- 场景7：右键菜单功能说明 -->
      <h3>场景7：右键菜单功能说明</h3>
      <el-descriptions :column="1" border style="max-width: 600px">
        <el-descriptions-item label="上传">选择本地图片替换当前裁剪图片</el-descriptions-item>
        <el-descriptions-item label="下载">下载当前裁剪结果为 cropping.png</el-descriptions-item>
        <el-descriptions-item label="圆形/矩形裁剪">切换裁剪框形状</el-descriptions-item>
        <el-descriptions-item label="重置">重置裁剪框到初始状态</el-descriptions-item>
        <el-descriptions-item label="移动（上下左右）">长按持续移动裁剪图片</el-descriptions-item>
        <el-descriptions-item label="翻转（水平/垂直）">翻转图片方向</el-descriptions-item>
        <el-descriptions-item label="旋转（逆/顺时针）">每次旋转 45°</el-descriptions-item>
        <el-descriptions-item label="缩放（放大/缩小）">长按持续缩放，步进 0.1</el-descriptions-item>
      </el-descriptions>
      <el-alert
        type="warning"
        :closable="false"
        show-icon
        style="margin-top: 12px"
      >
        在上方任意裁剪区域右键单击即可唤出功能菜单。
      </el-alert>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CxCropper } from '@/components/CxCropper'
import type { CxCropperResult } from '@/components/CxCropper'
import type Cropper from 'cropperjs'

// 场景1
const result1 = ref<CxCropperResult | null>(null)
function handleCrop1(res: CxCropperResult) {
  result1.value = res
}
function handleReady1(instance: Cropper) {
  console.log('Cropper 实例已就绪', instance)
}

// 场景2
const result2 = ref<CxCropperResult | null>(null)
function handleCrop2(res: CxCropperResult) {
  result2.value = res
}

// 场景3
const result3 = ref<CxCropperResult | null>(null)
function handleCrop3(res: CxCropperResult) {
  result3.value = res
}

// 场景4
const cropperOptions: Cropper.Options = {
  aspectRatio: 16 / 9,
  minCropBoxWidth: 200,
  minCropBoxHeight: 112,
  guides: true,
  viewMode: 1
}
const result4 = ref<CxCropperResult | null>(null)
function handleCrop4(res: CxCropperResult) {
  result4.value = res
}

// 场景5
const result5 = ref<CxCropperResult | null>(null)
function handleCrop5(res: CxCropperResult) {
  result5.value = res
}

// 场景6
const scene6Error = ref('')
function handleError() {
  scene6Error.value = 'https://broken-url.example.com/nonexistent-image.jpg'
  ElMessage.error('图片裁剪过程出错，请重试')
}
function handleCrop6(res: CxCropperResult) {
  // ignored
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

.crop-result {
  margin-top: 16px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.crop-preview {
  max-width: 300px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;

  &--circled {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
}
</style>
