<template>
  <div class="cx-custom-column-example-basic">
    <h3>自定义列显隐</h3>
    <CxCustomColumn v-model="columns" storage-key="demo-table" @change="onChange" />
    <div class="cx-custom-column-example-basic__list">
      <p v-for="col in visibleColumns" :key="col.prop">{{ col.label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CxCustomColumn from '../CxCustomColumn.vue'

defineOptions({ name: 'CxCustomColumnExampleBasic' })

const columns = ref([
  { label: '姓名', prop: 'name', visible: true },
  { label: '年龄', prop: 'age', visible: true },
  { label: '邮箱', prop: 'email', visible: false },
  { label: '地址', prop: 'address', visible: true },
])

const visibleColumns = computed(() => columns.value.filter(c => c.visible))

function onChange(cols: typeof columns.value) {
  columns.value = cols
}
</script>

<style scoped lang="scss">
.cx-custom-column-example-basic {
  &__list {
    margin-top: 12px;
    padding: 12px;
    background: #f5f7fa;
    border-radius: 4px;
    line-height: 2;
  }
}
</style>
