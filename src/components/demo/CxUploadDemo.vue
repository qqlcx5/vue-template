<template>
  <div class="demo-page">
    <el-card header="CxUpload 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-upload-demo__section">
        <CxUpload
          v-model="uploadValue1"
          action="https://example.com/upload"
          button-text="上传文件"
          @success="handleSuccess"
          @error="handleError"
        />
      </div>

      <!-- 场景2：拖拽上传 -->
      <h3>场景2：拖拽上传</h3>
      <div class="cx-upload-demo__section">
        <CxUpload
          v-model="uploadValue2"
          action="https://example.com/upload"
          drag
          button-text="拖拽或点击上传"
          @success="handleSuccess"
          @error="handleError"
        />
      </div>

      <!-- 场景3：文件限制 -->
      <h3>场景3：文件限制（仅 .jpg/.png，最大 5MB，最多 3 个）</h3>
      <div class="cx-upload-demo__section">
        <CxUpload
          v-model="uploadValue3"
          action="https://example.com/upload"
          accept=".jpg,.png"
          :max-size="5"
          :max-count="3"
          button-text="选择图片"
          @success="handleSuccess"
          @error="handleError"
          @exceed="handleExceed"
        />
      </div>

      <!-- 场景4：多选 -->
      <h3>场景4：多选</h3>
      <div class="cx-upload-demo__section">
        <CxUpload
          v-model="uploadValue4"
          action="https://example.com/upload"
          multiple
          button-text="多选上传"
          @success="handleSuccess"
          @error="handleError"
        />
      </div>

      <!-- 场景5：禁用 -->
      <h3>场景5：禁用</h3>
      <div class="cx-upload-demo__section">
        <CxUpload
          v-model="uploadValue5"
          action="https://example.com/upload"
          disabled
          button-text="已禁用"
        />
      </div>

      <!-- 场景6：隐藏文件列表 -->
      <h3>场景6：隐藏文件列表</h3>
      <div class="cx-upload-demo__section">
        <CxUpload
          v-model="uploadValue6"
          action="https://example.com/upload"
          :show-file-list="false"
          button-text="上传（不显示列表）"
          @success="handleSuccess"
          @error="handleError"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxUpload } from '@/components/CxUpload'

defineOptions({
  name: 'CxUploadDemo'
})

const uploadValue1 = ref([])
const uploadValue2 = ref([])
const uploadValue3 = ref([])
const uploadValue4 = ref([])
const uploadValue5 = ref([])
const uploadValue6 = ref([])

function handleSuccess(response: any, file: any) {
  console.log('[CxUpload] success:', response, file)
}

function handleError(error: any, file: any) {
  console.log('[CxUpload] error:', error, file)
}

function handleExceed() {
  console.log('[CxUpload] exceed: 超出文件数量限制')
}
</script>

<style scoped lang="scss">
.cx-upload-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
