<template>
  <div class="cx-upload">
    <el-upload
      :model-value="modelValue"
      :action="action"
      :accept="accept"
      :multiple="multiple"
      :drag="drag"
      :auto-upload="autoUpload"
      :headers="headers"
      :disabled="disabled"
      :show-file-list="showFileList"
      :limit="maxCount"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      @update:model-value="handleUpdate"
      v-bind="$attrs"
    >
      <slot>
        <el-button type="primary" :disabled="disabled">{{ buttonText }}</el-button>
      </slot>
      <template v-if="drag" #tip>
        <div class="cx-upload__tip">
          支持拖拽上传，单个文件不超过 {{ maxSize }}MB
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import type { CxUploadProps, CxUploadEmits } from './types'

defineOptions({ name: 'CxUpload' })

const props = withDefaults(defineProps<CxUploadProps>(), {
  modelValue: () => [],
  action: '',
  accept: '*',
  maxSize: 10,
  maxCount: 10,
  multiple: false,
  drag: false,
  autoUpload: true,
  headers: () => ({}),
  buttonText: '点击上传',
  disabled: false,
  showFileList: true,
})

const emit = defineEmits<CxUploadEmits>()

function beforeUpload(file: File) {
  const isOverSize = file.size / 1024 / 1024 > props.maxSize
  if (isOverSize) {
    return false
  }
  return true
}

function handleExceed(files: any[], fileList: any[]) {
  emit('exceed', files, fileList)
}

function handleSuccess(response: any, file: any, fileList: any[]) {
  emit('success', response, file, fileList)
}

function handleError(error: any, file: any, fileList: any[]) {
  emit('error', error, file, fileList)
}

function handleUpdate(value: any[]) {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
.cx-upload {
  &__tip {
    font-size: 12px;
    color: #909399;
    margin-top: 6px;
  }
}
</style>
