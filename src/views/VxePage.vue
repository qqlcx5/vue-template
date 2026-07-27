<!-- OrderList.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import ErpProTable from '@/components/smartTable.vue'
import type { ErpColumn } from '@/components/types'
// import { fetchOrderListApi, type OrderItem } from '@/api/order'
import { ElTag, ElButton } from 'element-plus'

const tableRef = ref()
const fetchOrderListApi = async (params: any) => {
  // 模拟接口请求
  console.log('请求参数:', params)
  return new Promise<{ list: any; total: number }>(resolve => {
    setTimeout(() => {
      const total = 100
      const list: any = Array.from({ length: params.pageSize }, (_, index) => ({
        orderNo: `ORD-${params.page}-${index + 1}`,
        status: Math.floor(Math.random() * 3),
        createTime: new Date().toISOString()
      }))
      resolve({ list, total })
    }, 1000)
  })
}

// 仅需通过 Schema 描述列与搜索规则！
const columns: ErpColumn<OrderItem>[] = [
  { type: 'seq', width: 60, title: '序号' },
  {
    field: 'orderNo',
    title: '订单编号',
    minWidth: 160,
    search: { type: 'input', props: { placeholder: '输入单号搜索' } }
  },
  {
    field: 'status',
    title: '订单状态',
    width: 140,
    search: {
      type: 'select',
      options: [
        { label: '待付款', value: 0 },
        { label: '已发货', value: 1 },
        { label: '已完成', value: 2 }
      ]
    },
    slotName: 'statusSlot'
  },
  {
    field: 'createTime',
    title: '创建时间',
    width: 160,
    search: { type: 'date' }
  },
  { field: 'action', title: '操作', width: 120, slotName: 'actionSlot' }
]
</script>

<template>
  <div class="page-container">
    <ErpProTable ref="tableRef" :columns="columns" :api="fetchOrderListApi">
      <!-- 渲染自定义状态槽 -->
      <template #statusSlot="{ row }">
        <el-tag :type="row.status === 2 ? 'success' : 'warning'">
          {{ row.status === 2 ? '已完成' : '进行中' }}
        </el-tag>
      </template>

      <!-- 渲染操作列槽 -->
      <template #actionSlot="{ row }">
        <el-button link type="primary" size="small" @click="console.log(row)">详情</el-button>
      </template>
    </ErpProTable>
  </div>
</template>
