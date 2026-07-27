<template>
  <div class="cx-animate-selector-example-placeholder">
    <h3 class="cx-animate-selector-example-placeholder__title">自定义占位文本</h3>
    <CxAnimateSelector
      v-model="selected"
      placeholder="搜索并选择一个动画效果..."
    />
    <p class="cx-animate-selector-example-placeholder__hint">
      已选择：{{ selected || '未选择任何动画' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxAnimateSelector from '../CxAnimateSelector.vue'

defineOptions({
  name: 'CxAnimateSelectorCustomPlaceholder'
})

const selected = ref('')
</script>

<style scoped lang="scss">
.cx-animate-selector-example-placeholder {
  max-width: 480px;
  padding: 16px;

  &__title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
  }

  &__hint {
    margin: 12px 0 0;
    font-size: 13px;
    color: #909399;
  }
}
</style>
