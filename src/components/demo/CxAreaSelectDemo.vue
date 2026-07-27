<template>
  <div class="demo-page">
    <el-card header="CxAreaSelect 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法（省市二级联动）</h3>
      <div class="cx-area-select-demo__section">
        <p class="cx-area-select-demo__value">当前选中值：{{ areaValue1 }}</p>
        <CxAreaSelect v-model="areaValue1" :options="areaOptions" placeholder="请选择地区" />
      </div>

      <!-- 场景2：三级联动 -->
      <h3>场景2：三级联动</h3>
      <div class="cx-area-select-demo__section">
        <p class="cx-area-select-demo__value">当前选中值：{{ areaValue2 }}</p>
        <CxAreaSelect v-model="areaValue2" :options="areaOptions" level="3" placeholder="请选择地区" @change="handleChange" />
      </div>

      <!-- 场景3：可搜索 -->
      <h3>场景3：可搜索</h3>
      <div class="cx-area-select-demo__section">
        <CxAreaSelect v-model="areaValue3" :options="areaOptions" filterable placeholder="可搜索地区" />
      </div>

      <!-- 场景4：禁用 -->
      <h3>场景4：禁用</h3>
      <div class="cx-area-select-demo__section">
        <CxAreaSelect v-model="areaValue4" :options="areaOptions" disabled placeholder="已禁用" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxAreaSelect } from '@/components/CxAreaSelect'
import type { AreaOption } from '@/components/CxAreaSelect'

defineOptions({
  name: 'CxAreaSelectDemo'
})

const areaValue1 = ref([])
const areaValue2 = ref([])
const areaValue3 = ref([])
const areaValue4 = ref([])

const areaOptions: AreaOption[] = [
  {
    value: '110000',
    label: '北京市',
    children: [
      { value: '110101', label: '东城区' },
      { value: '110102', label: '西城区' },
      { value: '110105', label: '朝阳区' }
    ]
  },
  {
    value: '310000',
    label: '上海市',
    children: [
      { value: '310101', label: '黄浦区' },
      { value: '310104', label: '徐汇区' },
      { value: '310105', label: '长宁区' }
    ]
  },
  {
    value: '440000',
    label: '广东省',
    children: [
      {
        value: '440100',
        label: '广州市',
        children: [
          { value: '440103', label: '荔湾区' },
          { value: '440104', label: '越秀区' }
        ]
      },
      {
        value: '440300',
        label: '深圳市',
        children: [
          { value: '440303', label: '罗湖区' },
          { value: '440304', label: '福田区' }
        ]
      }
    ]
  }
]

function handleChange(value: any) {
  console.log('[CxAreaSelect] change:', value)
}
</script>

<style scoped lang="scss">
.cx-area-select-demo {
  &__section {
    margin-bottom: 24px;
    padding: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
  }

  &__value {
    margin: 0 0 8px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}
</style>
