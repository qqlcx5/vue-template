<template>
  <div class="cx-descriptions-example-slot">
    <h3>自定义插槽渲染</h3>
    <CxDescriptions :schema="schema" :data="order">
      <template #products="{ row }">
        <el-tag v-for="p in row.products" :key="p" size="small" style="margin-right: 6px">{{ p }}</el-tag>
      </template>
    </CxDescriptions>
  </div>
</template>

<script setup lang="ts">
import CxDescriptions from '../CxDescriptions.vue'

defineOptions({ name: 'CxDescriptionsExampleSlot' })

const order = {
  id: 'ORD-20240001',
  amount: 299.0,
  products: ['商品A', '商品B', '商品C'],
}

const schema = [
  { field: 'id', label: '订单号' },
  { field: 'amount', label: '金额', formatter: (val: number) => `¥${val.toFixed(2)}` },
  { field: 'products', label: '商品列表' },
]
</script>
