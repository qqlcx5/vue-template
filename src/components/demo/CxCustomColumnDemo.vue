<template>
  <div class="demo-page">
    <el-card header="CxCustomColumn 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-custom-column-demo__section">
        <CxCustomColumn :columns="columns" />
        <p style="margin-top: 8px; color: #909399">点击右下角图标打开列配置面板，可勾选需要显示的列。</p>
      </div>

      <!-- 场景2：confirm 事件 -->
      <h3>场景2：监听 confirm 事件</h3>
      <div class="cx-custom-column-demo__section">
        <CxCustomColumn :columns="columns2" @confirm="handleConfirm" />
        <p style="margin-top: 8px; color: #909399">确认后会触发 confirm 事件。</p>
        <div v-if="confirmResult.length" style="margin-top: 8px">
          <p>已选列：</p>
          <el-tag
            v-for="col in confirmResult"
            :key="col.field"
            style="margin-right: 4px; margin-bottom: 4px"
            type="success"
          >
            {{ col.label }}
          </el-tag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxCustomColumn } from '@/components/CxCustomColumn'

defineOptions({
  name: 'CxCustomColumnDemo'
})

const columns = ref([
  { field: 'name', label: '姓名', visible: true },
  { field: 'age', label: '年龄', visible: true },
  { field: 'email', label: '邮箱', visible: true },
  { field: 'phone', label: '电话', visible: false },
  { field: 'address', label: '地址', visible: false },
])

const columns2 = ref([
  { field: 'id', label: 'ID', visible: true },
  { field: 'title', label: '标题', visible: true },
  { field: 'status', label: '状态', visible: true },
  { field: 'createTime', label: '创建时间', visible: false },
  { field: 'updateTime', label: '更新时间', visible: false },
])

const confirmResult = ref<{ field: string; label: string; visible: boolean; fixed?: boolean }[]>([])

function handleConfirm(cols: { field: string; label: string; visible: boolean; fixed?: boolean }[]) {
  confirmResult.value = cols.filter(c => c.visible)
}
</script>

<style scoped lang="scss">
.cx-custom-column-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
