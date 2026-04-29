<template>
  <div style="padding: 10px;">
    <!-- 引入封装好的组件 -->
    <ErpProTable
      ref="tableRef"
      :requestApi="fetchMockData"
      :columns="tableColumns"
    >
      <!-- 插槽：自定义操作列的内容 -->
      <template #action="{ row }">
        <!-- 还原图片中的蓝色小图标按钮 -->
        <el-icon color="#409EFF" style="cursor: pointer; margin-right: 8px;" size="16"><Edit /></el-icon>
        <el-icon color="#409EFF" style="cursor: pointer;" size="16"><CircleClose /></el-icon>
      </template>

      <!-- 插槽：将报告编号变成蓝色链接 -->
      <template #reportNo="{ row }">
        <a href="#" style="color: #409EFF; text-decoration: none;">{{ row.reportNo }}</a>
      </template>

      <!-- 插槽：试穿任务编号也是蓝色链接 -->
      <template #taskNo="{ row }">
        <a href="#" style="color: #409EFF; text-decoration: none;">{{ row.taskNo }}</a>
      </template>
    </ErpProTable>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import ErpProTable from '../components/ErpProTable.vue';
// import { Edit, CircleClose } from 'unocss';

// 【核心】：根据你的图片配置出的 columns
const tableColumns = [
  // 1. 序列号（上方会自动留白）
  { type: 'index', width: '50', align: 'center' },

  // 2. 复选框（上方会自动留白）
  { type: 'selection', width: '50', align: 'center' },

  // 3. 操作列（上方会自动留白）
  { label: '操作', prop: 'action', width: '80', align: 'center' },

  // 4. 报告编号（配置 search: { type: 'input' }，第一行会自动出现输入框）
  { label: '报告编号', prop: 'reportNo', width: '140', search: { type: 'input' } },

  // 5. 试穿任务编号
  { label: '试穿任务编号', prop: 'taskNo', width: '140', search: { type: 'input' } },

  // 6. 数量
  { label: '数量', prop: 'quantity', width: '80', search: { type: 'input' } },

  // 7. 尺码
  { label: '尺码', prop: 'size', width: '120', search: { type: 'input' } },

  // 8. 货号
  { label: '货号', prop: 'itemNo', width: '100', search: { type: 'input' } },

  // 9. 品牌
  { label: '品牌', prop: 'brand', width: '120', search: { type: 'input' } },

  // 10. 开发供应商
  { label: '开发供应商', prop: 'supplier', width: '120', search: { type: 'input' } },

  // 11. 开发供应商编码
  { label: '开发供应商编码', prop: 'supplierCode', width: '140', search: { type: 'input' } },

  // 12. 季度
  { label: '季度', prop: 'season', width: '80', search: { type: 'input' } },

  // 13. 中类
  { label: '中类', prop: 'category', minWidth: '100', search: { type: 'input' } }
];

// 模拟 API 请求（根据你在图片里提供的数据构造的 Mock）
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
