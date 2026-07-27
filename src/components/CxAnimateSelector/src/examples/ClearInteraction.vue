<template>
  <div class="cx-animate-selector-example-clear">
    <h3 class="cx-animate-selector-example-clear__title">清空交互</h3>
    <p class="cx-animate-selector-example-clear__desc">
      选择一个动画后，点击清除按钮或下拉面板中重新选择，观察 v-model 的变化。
    </p>
    <CxAnimateSelector v-model="selected" placeholder="选择一个动画后尝试清空" />
    <div class="cx-animate-selector-example-clear__panel">
      <el-tag v-if="selected" type="success" size="large">
        当前动画：{{ selected }}
      </el-tag>
      <el-tag v-else type="info" size="large">未选择动画（v-model 为空字符串）</el-tag>
    </div>
    <el-button
      class="cx-animate-selector-example-clear__reset"
      @click="selected = ''"
    >
      手动重置
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTag, ElButton } from 'element-plus'
import CxAnimateSelector from '../CxAnimateSelector.vue'

defineOptions({
  name: 'CxAnimateSelectorClearInteraction'
})

const selected = ref('')
</script>

<style scoped lang="scss">
.cx-animate-selector-example-clear {
  max-width: 520px;
  padding: 16px;

  &__title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
  }

  &__desc {
    margin: 0 0 12px;
    font-size: 13px;
    color: #909399;
    line-height: 1.6;
  }

  &__panel {
    margin-top: 16px;
  }

  &__reset {
    margin-top: 12px;
  }
}
</style>
