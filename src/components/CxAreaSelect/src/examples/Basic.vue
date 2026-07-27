<template>
  <div class="cx-area-select-example-basic">
    <h3>省市区三级联动</h3>
    <CxAreaSelect v-model="areaCodes" @change="onChange" />
    <p class="cx-area-select-example-basic__value">选中代码: {{ areaCodes }}</p>
    <p class="cx-area-select-example-basic__value">选中名称: {{ areaNames }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxAreaSelect from '../CxAreaSelect.vue'

defineOptions({ name: 'CxAreaSelectExampleBasic' })

const areaCodes = ref<string[]>([])
const areaNames = ref<string[]>([])

function onChange({ codes, names }: { codes: string[]; names: string[] }) {
  areaCodes.value = codes
  areaNames.value = names
}
</script>

<style scoped lang="scss">
.cx-area-select-example-basic {
  &__value {
    margin-top: 8px;
    color: #909399;
    font-size: 13px;
  }
}
</style>
