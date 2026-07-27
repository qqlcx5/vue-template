<template>
  <div class="cx-content-detail-wrap-example-basic">
    <h3>详情页包裹</h3>
    <p class="cx-content-detail-wrap-example-basic__desc">自动计算剩余高度填充可视区域</p>
    <CxContentDetailWrap :offset="60">
      <p>这里是详情内容，容器会自动撑满剩余高度。</p>
      <p>即使内容很少也不会出现底部大面积留白。</p>
    </CxContentDetailWrap>
  </div>
</template>

<script setup lang="ts">
import CxContentDetailWrap from '../CxContentDetailWrap.vue'

defineOptions({ name: 'CxContentDetailWrapExampleBasic' })
</script>

<style scoped lang="scss">
.cx-content-detail-wrap-example-basic {
  &__desc {
    color: #909399;
    font-size: 13px;
    margin-bottom: 12px;
  }
}
</style>
