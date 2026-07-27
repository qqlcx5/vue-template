<template>
  <el-radio-group
    v-model="modelValue"
    :disabled="disabled"
    :size="size"
    class="cx-button-radio"
    @change="handleChange"
  >
    <el-radio-button
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
      :disabled="opt.disabled"
    >
      {{ opt.label }}
    </el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import type { CxButtonRadioProps, CxButtonRadioEmits } from './types'

defineOptions({ name: 'CxButtonRadio' })

withDefaults(defineProps<CxButtonRadioProps>(), {
  options: () => [],
  size: 'default',
  disabled: false,
})

const modelValue = defineModel<string | number>()

const emit = defineEmits<CxButtonRadioEmits>()

function handleChange(value: string | number) {
  emit('change', value)
}
</script>
