<template>
  <div class="cx-animate-selector-example-basic">
    <h3 class="cx-animate-selector-example-basic__title">基础用法：选择一个动画</h3>
    <p class="cx-animate-selector-example-basic__value">当前选中：{{ selected || '无' }}</p>
    <CxAnimateSelector v-model="selected" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxAnimateSelector from '../CxAnimateSelector.vue'

defineOptions({
  name: 'CxAnimateSelectorBasicUsage'
})

const selected = ref('')
</script>

<style scoped lang="scss">
.cx-animate-selector-example-basic {
  max-width: 480px;
  padding: 16px;

  &__title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
  }

  &__value {
    margin: 0 0 12px;
    font-size: 14px;
    color: var(--el-color-primary);
  }
}
</style>
