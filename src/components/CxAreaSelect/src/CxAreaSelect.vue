<template>
  <el-cascader
    v-model="modelValue"
    :options="options"
    :props="{ checkStrictly: true, value: 'value', label: 'label', children: 'children' }"
    :placeholder="placeholder"
    :filterable="filterable"
    :disabled="disabled"
    :clearable="clearable"
    :show-all-levels="true"
    class="cx-area-select"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import type { CxAreaSelectProps, CxAreaSelectEmits } from './types'

defineOptions({ name: 'CxAreaSelect' })

withDefaults(defineProps<CxAreaSelectProps>(), {
  options: () => [],
  level: 3,
  filterable: true,
  placeholder: '请选择省/市/区',
  disabled: false,
  clearable: true,
})

const modelValue = defineModel<(string | number)[]>({ default: () => [] })

const emit = defineEmits<CxAreaSelectEmits>()

function handleChange(value: (string | number)[]) {
  emit('change', value)
}
</script>

<style scoped lang="scss">
.cx-area-select {
  width: 100%;
}
</style>
