<template>
  <div v-loading="!showPopover" class="cx-cropper-preview" element-loading-background="transparent">
    <el-popover
      ref="popoverRef"
      :visible="showPopover"
      placement="right"
      :width="300"
    >
      <template #reference>
        <div class="cx-cropper-preview__crop-area">
          <CxCropper
            ref="refCropper"
            :src="imgSrc"
            circled
            height="280px"
            @cropper="onCropper"
            @readied="showPopover = true"
          />
          <p v-show="showPopover" class="cx-cropper-preview__tip">
            温馨提示：右键上方裁剪区可开启功能菜单
          </p>
        </div>
      </template>

      <!-- Preview popover content -->
      <div class="cx-cropper-preview__popover">
        <el-image
          v-if="cropperImg"
          :src="cropperImg"
          :preview-src-list="[cropperImg]"
          fit="cover"
          class="cx-cropper-preview__img"
        />
        <div v-if="infos" class="cx-cropper-preview__info">
          <p>图像大小：{{ Math.round(infos.width) }} × {{ Math.round(infos.height) }} 像素</p>
          <p>文件大小：{{ formatSize(infos.size) }}（{{ infos.size }} 字节）</p>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElPopover, ElImage, vLoading } from 'element-plus'
import CxCropper from '../../CxCropper'
import type { CxCropperPreviewProps, CxCropperPreviewEmits } from './types'

defineOptions({
  name: 'CxCropperPreview'
})

const props = defineProps<CxCropperPreviewProps>()

const emit = defineEmits<CxCropperPreviewEmits>()

const infos = ref<any>(null)
const popoverRef = ref<InstanceType<typeof ElPopover>>()
const showPopover = ref(false)
const cropperImg = ref('')

function onCropper(result: { base64: string; blob: Blob; info: any }) {
  infos.value = result.info
  cropperImg.value = result.base64
  emit('cropper', result)
}

function hidePopover() {
  ;(popoverRef.value as any)?.hide?.()
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

defineExpose({ hidePopover })
</script>

<style scoped lang="scss">
.cx-cropper-preview {
  &__crop-area {
    width: 280px;
  }

  &__tip {
    margin-top: 4px;
    text-align: center;
    font-size: 12px;
    color: #909399;
  }

  &__popover {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
  }

  &__img {
    max-width: 100%;
    border-radius: 50%;
  }

  &__info {
    margin-top: 4px;
    font-size: 12px;
    color: #606266;

    p {
      margin: 2px 0;
    }
  }
}
</style>
