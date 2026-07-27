<template>
  <div class="cx-upload-example-drag">
    <h3>拖拽上传</h3>
    <CxUpload v-model="files" drag multiple :limit="5" :max-size="10" accept=".pdf,.doc,.docx" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxUpload from '../CxUpload.vue'

defineOptions({ name: 'CxUploadExampleDrag' })

const files = ref<any[]>([])
</script>
