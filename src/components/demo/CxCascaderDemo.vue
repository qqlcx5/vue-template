<template>
  <div class="demo-page">
    <el-card header="CxCascader 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-cascader-demo__section">
        <CxCascader v-model="selected" :options="cascaderOptions" placeholder="请选择省市" />
        <p class="cx-cascader-demo__value">当前选中：{{ selected }}</p>
      </div>

      <!-- 场景2：多选 -->
      <h3>场景2：多选</h3>
      <div class="cx-cascader-demo__section">
        <CxCascader
          v-model="multipleSelected"
          :options="cascaderOptions"
          multiple
          collapse-tags
          placeholder="请选择（多选）"
        />
        <p class="cx-cascader-demo__value">当前选中：{{ multipleSelected }}</p>
      </div>

      <!-- 场景3：可搜索 -->
      <h3>场景3：可搜索</h3>
      <div class="cx-cascader-demo__section">
        <CxCascader
          v-model="filterSelected"
          :options="cascaderOptions"
          filterable
          placeholder="输入关键字搜索"
        />
        <p class="cx-cascader-demo__value">当前选中：{{ filterSelected }}</p>
      </div>

      <!-- 场景4：任意级选中 -->
      <h3>场景4：任意级选中</h3>
      <div class="cx-cascader-demo__section">
        <CxCascader
          v-model="strictSelected"
          :options="cascaderOptions"
          check-strictly
          placeholder="可选中任意级别"
        />
        <p class="cx-cascader-demo__value">当前选中：{{ strictSelected }}</p>
      </div>

      <!-- 场景5：禁用 -->
      <h3>场景5：禁用</h3>
      <div class="cx-cascader-demo__section">
        <CxCascader
          v-model="disabledSelected"
          :options="cascaderOptions"
          disabled
          placeholder="已禁用"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxCascader } from '@/components/CxCascader'

defineOptions({
  name: 'CxCascaderDemo'
})

const cascaderOptions = [
  {
    label: '北京市',
    value: 'beijing',
    children: [
      { label: '朝阳区', value: 'chaoyang' },
      { label: '海淀区', value: 'haidian' },
      { label: '丰台区', value: 'fengtai' }
    ]
  },
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      { label: '广州市', value: 'guangzhou' },
      { label: '深圳市', value: 'shenzhen' },
      { label: '东莞市', value: 'dongguan' }
    ]
  },
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      { label: '杭州市', value: 'hangzhou' },
      { label: '宁波市', value: 'ningbo' }
    ]
  }
]

const selected = ref<string[]>([])
const multipleSelected = ref<string[][]>([])
const filterSelected = ref<string[]>([])
const strictSelected = ref<string[]>([])
const disabledSelected = ref<string[]>([])
</script>

<style scoped lang="scss">
.cx-cascader-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }

  &__value {
    margin: 12px 0 0;
    font-size: 14px;
    color: var(--el-color-primary);
  }
}
</style>
