<template>
  <div class="cx-upload-example-basic">
    <h3>图片上传</h3>
    <CxUpload v-model="images" list-type="picture-card" :limit="3" accept="image/*" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxUpload from '../CxUpload.vue'

defineOptions({ name: 'CxUploadExampleBasic' })

const images = ref<any[]>([])
</script>
