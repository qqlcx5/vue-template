<template>
  <div class="cx-button-example-loading">
    <h3>Loading 状态</h3>
    <CxButton type="primary" :loading="loading" loadingText="保存中..." @click="startLoading">
      保存
    </CxButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxButton from '../CxButton.vue'

defineOptions({ name: 'CxButtonExampleLoading' })

const loading = ref(false)

function startLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
