<template>
  <div class="demo-page">
    <el-card header="CxButtonRadio 示例" shadow="never">
      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法</h3>
      <div class="cx-button-radio-demo__section">
        <CxButtonRadio v-model="selected" :options="options" />
        <p class="cx-button-radio-demo__value">当前选中：{{ selected }}</p>
      </div>

      <!-- 场景2：不同尺寸 -->
      <h3>场景2：不同尺寸</h3>
      <div class="cx-button-radio-demo__section">
        <p class="cx-button-radio-demo__tip">large</p>
        <CxButtonRadio v-model="sizeSelected1" :options="options" size="large" />
        <p class="cx-button-radio-demo__tip">default</p>
        <CxButtonRadio v-model="sizeSelected2" :options="options" size="default" />
        <p class="cx-button-radio-demo__tip">small</p>
        <CxButtonRadio v-model="sizeSelected3" :options="options" size="small" />
      </div>

      <!-- 场景3：禁用 -->
      <h3>场景3：禁用状态</h3>
      <div class="cx-button-radio-demo__section">
        <p class="cx-button-radio-demo__tip">整体禁用</p>
        <CxButtonRadio v-model="disabledSelected" :options="options" disabled />
        <p class="cx-button-radio-demo__tip" style="margin-top: 12px">单项禁用</p>
        <CxButtonRadio v-model="singleDisabledSelected" :options="disabledOptions" />
      </div>

      <!-- 场景4：change 事件 -->
      <h3>场景4：change 事件</h3>
      <div class="cx-button-radio-demo__section">
        <CxButtonRadio v-model="changeSelected" :options="options" @change="handleChange" />
        <p class="cx-button-radio-demo__value">查看控制台输出</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxButtonRadio } from '@/components/CxButtonRadio'

defineOptions({
  name: 'CxButtonRadioDemo'
})

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' }
]

const disabledOptions = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2', disabled: true },
  { label: '选项三', value: '3' }
]

const selected = ref('1')
const sizeSelected1 = ref('1')
const sizeSelected2 = ref('1')
const sizeSelected3 = ref('1')
const disabledSelected = ref('1')
const singleDisabledSelected = ref('1')
const changeSelected = ref('1')

function handleChange(val: string) {
  console.log('[CxButtonRadio] change:', val)
}
</script>

<style scoped lang="scss">
.cx-button-radio-demo {
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

  &__tip {
    margin: 0 0 8px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}
</style>
