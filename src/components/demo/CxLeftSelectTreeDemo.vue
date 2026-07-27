<template>
  <div class="demo-page">
    <el-card header="CxLeftSelectTree 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法（三层组织架构）</h3>
      <div class="cx-left-select-tree-demo__section">
        <CxLeftSelectTree v-model="selectedValue" :data="treeData" placeholder="请选择组织" />
        <p>选中值：{{ selectedValue }}</p>
      </div>

      <!-- 场景2：可搜索 -->
      <h3>场景2：可搜索</h3>
      <div class="cx-left-select-tree-demo__section">
        <CxLeftSelectTree v-model="selectedValue2" :data="treeData" placeholder="请输入关键词搜索" filterable />
      </div>

      <!-- 场景3：自定义面板宽度 -->
      <h3>场景3：自定义面板宽度（300px）</h3>
      <div class="cx-left-select-tree-demo__section">
        <CxLeftSelectTree v-model="selectedValue3" :data="treeData" placeholder="请选择" panel-width="300" />
      </div>

      <!-- 场景4：change 事件 -->
      <h3>场景4：change 事件</h3>
      <div class="cx-left-select-tree-demo__section">
        <CxLeftSelectTree v-model="selectedValue4" :data="treeData" placeholder="请选择，控制台查看 change 事件" @change="handleChange" />
        <p>最近一次 change：{{ lastChange }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxLeftSelectTree } from '@/components/CxLeftSelectTree'
import type { TreeData } from '@/components/CxLeftSelectTree'

defineOptions({
  name: 'CxLeftSelectTreeDemo'
})

const treeData: TreeData[] = [
  {
    label: '总公司',
    value: '1',
    children: [
      {
        label: '技术部',
        value: '1-1',
        children: [
          { label: '前端组', value: '1-1-1' },
          { label: '后端组', value: '1-1-2' },
          { label: '测试组', value: '1-1-3' }
        ]
      },
      {
        label: '产品部',
        value: '1-2',
        children: [
          { label: '产品一组', value: '1-2-1' },
          { label: '产品二组', value: '1-2-2' }
        ]
      },
      {
        label: '市场部',
        value: '1-3',
        children: [
          { label: '市场一组', value: '1-3-1' },
          { label: '市场二组', value: '1-3-2' }
        ]
      }
    ]
  }
]

const selectedValue = ref('')
const selectedValue2 = ref('')
const selectedValue3 = ref('')
const selectedValue4 = ref('')
const lastChange = ref('')

function handleChange(val: any) {
  lastChange.value = JSON.stringify(val)
}
</script>

<style scoped lang="scss">
.cx-left-select-tree-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }
}
</style>
