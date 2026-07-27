<template>
  <div class="cx-backtop-example-basic">
    <h3>回到顶部</h3>
    <p class="cx-backtop-example-basic__desc">向下滚动页面，右下角会出现回到顶部按钮</p>
    <div v-for="i in 30" :key="i" class="cx-backtop-example-basic__item">
      第 {{ i }} 行
    </div>
    <CxBacktop />
  </div>
</template>

<script setup lang="ts">
import CxBacktop from '../CxBacktop.vue'

defineOptions({ name: 'CxBacktopExampleBasic' })
</script>

<style scoped lang="scss">
.cx-backtop-example-basic {
  &__desc {
    color: #909399;
    font-size: 13px;
    margin-bottom: 12px;
  }

  &__item {
    padding: 16px;
    border-bottom: 1px solid #ebeef5;
  }
}
</style>
