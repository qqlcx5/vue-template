<template>
  <div class="cx-sticky-example-basic">
    <h3>粘性定位演示</h3>
    <p class="cx-sticky-example-basic__desc">向下滚动查看粘性效果</p>
    <div class="cx-sticky-example-basic__spacer" />
    <CxSticky ref="stickyRef">
      <div class="cx-sticky-example-basic__bar" :class="{ 'cx-sticky-example-basic__bar--active': isSticky }">
        导航栏（{{ isSticky ? '已吸附' : '未吸附' }}）
      </div>
    </CxSticky>
    <div class="cx-sticky-example-basic__content">
      <p v-for="i in 20" :key="i">第 {{ i }} 行内容</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxSticky from '../CxSticky.vue'

defineOptions({ name: 'CxStickyExampleBasic' })

const stickyRef = ref()
const isSticky = ref(false)
</script>

<style scoped lang="scss">
.cx-sticky-example-basic {
  &__desc {
    color: #909399;
    font-size: 13px;
    margin-bottom: 8px;
  }

  &__spacer {
    height: 40px;
  }

  &__bar {
    padding: 12px 16px;
    background: #ecf5ff;
    border-radius: 4px;
    transition: background 0.3s, box-shadow 0.3s;

    &--active {
      background: #409eff;
      color: #fff;
      box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
    }
  }

  &__content {
    margin-top: 12px;
    line-height: 2;
  }
}
</style>
