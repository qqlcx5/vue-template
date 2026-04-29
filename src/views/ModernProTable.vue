<template>
  <div style="padding: 24px; background: #F3F4F6; min-height: 100vh;">
    <!-- 增加一点外层灰色背景，更能衬托表格的纯洁感 -->
    <ModernErpTable
      ref="tableRef"
      :requestApi="fetchMockData"
      :columns="tableColumns"
    >
      <!-- 【精美的图标操作列】使用 Tabler 替换 Element Icon -->
      <template #action="{ row }">
        <div class="action-group">
          <!-- 悬停变蓝的编辑 -->
          <button class="action-btn edit-btn" title="编辑">
            <i class="i-tabler-pencil"></i>
          </button>
          <!-- 悬停变红的删除/作废 -->
          <button class="action-btn delete-btn" title="作废">
            <i class="i-tabler-circle-x"></i>
          </button>
        </div>
      </template>

      <!-- 链接态：去除土气的下划线，使用品牌蓝 + hover加深 -->
      <template #reportNo="{ row }">
        <span class="modern-link">{{ row.reportNo }}</span>
      </template>
      <template #taskNo="{ row }">
        <span class="modern-link">{{ row.taskNo }}</span>
      </template>

      <!-- 数字量级右对齐（在 columns 配置了 align: 'right'）-->
    </ModernErpTable>
  </div>
</template>

<script setup lang="ts">
import ModernErpTable from '@/components/ModernProTable.vue';

// Columns 结构没有变，但是配置更加考究
const tableColumns = [
  { type: 'index', width: '50', align: 'center' },
  { type: 'selection', width: '50', align: 'center' },
  { label: '操作', prop: 'action', width: '90', align: 'center' }, // 操作列放前放后视业务重要性定
  { label: '报告编号', prop: 'reportNo', width: '150', search: { type: 'input' } },
  { label: '试穿任务编号', prop: 'taskNo', width: '150', search: { type: 'input' } },
  { label: '报告编号', prop: 'reportNo', width: '150', search: { type: 'input' } },
  { label: '试穿任务编号', prop: 'taskNo', width: '150', search: { type: 'input' } },
  { label: '报告编号', prop: 'reportNo', width: '150', search: { type: 'input' } },
  { label: '试穿任务编号', prop: 'taskNo', width: '150', search: { type: 'input' } },
  { label: '报告编号', prop: 'reportNo', width: '150', search: { type: 'input' } },
  { label: '试穿任务编号', prop: 'taskNo', width: '150', search: { type: 'input' } },
  // 【设计细节】：数字或与金额相关的一律右对齐，符合人类潜意识对齐小数点/位数的直觉
  { label: '数量', prop: 'quantity', width: '110', align: 'right', search: { type: 'input' } },
  { label: '尺码', prop: 'size', minWidth: '120', search: { type: 'input' } },
  // ... 其他字段保持原样
];

const fetchMockData = (params) => {
  console.log('触发搜索请求，参数为：', params);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          list: [
            {
              reportNo: 'SCN260311001',
              taskNo: 'SCN260311001',
              quantity: 7,
              size: '1,11,2,4,6',
              itemNo: '123',
              brand: '安踏成人-大货',
              supplier: '泉州安大',
              supplierCode: '100021',
              season: '17Q1',
              category: '足球鞋'
            },
            {
              reportNo: 'SCN251223001',
              taskNo: 'SCN251223001',
              quantity: 2,
              size: '12,1',
              itemNo: '',
              brand: '',
              supplier: '乐骏',
              supplierCode: '101641',
              season: '',
              category: ''
            }
          ],
          total: 2
        }
      });
    }, 300);
  });
};
</script>

<style scoped>
/* 业务层的微交互样式 */
.action-group {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.action-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #94A3B8; /* 常态冷灰色 */
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.action-btn i { font-size: 18px; }

/* 悬停时赋予灵魂色彩与微底色 */
.edit-btn:hover { color: #3B82F6; background: #EFF6FF; }
.delete-btn:hover { color: #EF4444; background: #FEF2F2; }

.modern-link {
  color: #2563EB;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}
.modern-link:hover {
  color: #1D4ED8;
  text-decoration: underline; /* 仅在 hover 时出现下划线 */
}
</style>
