<template>
  <el-cascader
    :model-value="modelValue"
    :options="computedOptions"
    :props="cascaderProps"
    :placeholder="placeholder"
    :clearable="clearable"
    :show-all-levels="showAllLevels"
    :collapse-tags="collapseTags"
    :max-collapse-tags="maxCollapseTags"
    :disabled="disabled"
    :separator="separator"
    @update:model-value="handleChange"
    v-bind="$attrs"
    class="cx-cascader"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CxCascaderProps, CxCascaderEmits, CascaderOption } from './types'

defineOptions({ name: 'CxCascader' })

const props = withDefaults(defineProps<CxCascaderProps>(), {
  options: () => [],
  modelValue: undefined,
  multiple: false,
  filterable: false,
  placeholder: '请选择',
  clearable: true,
  showAllLevels: true,
  allChecked: false,
  allCheckedLabel: '全部',
  collapseTags: false,
  maxCollapseTags: 1,
  checkStrictly: false,
  separator: ' / ',
  disabled: false,
})

const emit = defineEmits<CxCascaderEmits>()

const computedOptions = computed(() => {
  if (!props.allChecked || !props.options?.length) return props.options
  const allOption: CascaderOption = {
    value: 'all',
    label: props.allCheckedLabel,
    children: props.options as CascaderOption[],
  }
  return [allOption]
})

const cascaderProps = computed(() => ({
  multiple: props.multiple,
  checkStrictly: props.checkStrictly,
  lazy: !!props.lazyLoad,
  lazyLoad: props.lazyLoad,
  value: 'value',
  label: 'label',
  children: 'children',
}))

function handleChange(value: any) {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped lang="scss">
.cx-cascader {
  width: 100%;
}
</style>
