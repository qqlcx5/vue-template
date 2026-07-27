<template>
  <div class="cx-count-to-example-basic">
    <h3 class="cx-count-to-example-basic__title">基础用法：自动播放数字动画</h3>
    <p class="cx-count-to-example-basic__desc">
      默认从 0 滚动到 2020，持续 1300ms，自动播放。
    </p>

    <div class="cx-count-to-example-basic__preview">
      <CxCountTo :end-val="2020" />
    </div>

    <el-button
      class="cx-count-to-example-basic__reset"
      type="primary"
      @click="key++"
    >
      重新播放
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import CxCountTo from '../CxCountTo.vue'

defineOptions({
  name: 'CxCountToBasicUsage'
})

const key = ref(0)
</script>

<style scoped lang="scss">
.cx-count-to-example-basic {
  max-width: 500px;
  padding: 16px;

  &__title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
  }

  &__desc {
    margin: 0 0 16px;
    font-size: 13px;
    color: #909399;
    line-height: 1.6;
  }

  &__preview {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  &__reset {
    margin-top: 8px;
  }
}
</style>
