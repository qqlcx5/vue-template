<template>
  <div class="demo-page">
    <el-card header="CxPagination 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-pagination-demo__section">
        <CxPagination :total="100" v-model:page="page" v-model:limit="limit" />
        <p>当前第 {{ page }} 页，每页 {{ limit }} 条</p>
      </div>

      <!-- 场景2：自定义布局 -->
      <h3>场景2：自定义布局</h3>
      <div class="cx-pagination-demo__section">
        <CxPagination
          :total="100"
          v-model:page="page2"
          v-model:limit="limit2"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>

      <!-- 场景3：背景色 -->
      <h3>场景3：背景色</h3>
      <div class="cx-pagination-demo__section">
        <CxPagination :total="100" v-model:page="page3" v-model:limit="limit3" background />
      </div>

      <!-- 场景4：小型分页 -->
      <h3>场景4：小型分页</h3>
      <div class="cx-pagination-demo__section">
        <CxPagination :total="100" v-model:page="page4" v-model:limit="limit4" small />
      </div>

      <!-- 场景5：自定义每页条数选项 -->
      <h3>场景5：自定义每页条数选项</h3>
      <div class="cx-pagination-demo__section">
        <CxPagination :total="100" v-model:page="page5" v-model:limit="limit5" :page-sizes="[5, 10, 20]" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxPagination } from '@/components/CxPagination'

defineOptions({
  name: 'CxPaginationDemo'
})

const page = ref(1)
const limit = ref(10)
const page2 = ref(1)
const limit2 = ref(10)
const page3 = ref(1)
const limit3 = ref(10)
const page4 = ref(1)
const limit4 = ref(10)
const page5 = ref(1)
const limit5 = ref(10)
</script>

<style scoped lang="scss">
.cx-pagination-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
