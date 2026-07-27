<template>
  <el-col
    :span="value"
    v-bind="$attrs"
  >
    <slot />
  </el-col>
</template>

<script setup lang="ts">
import { ElCol } from 'element-plus'
import type { CxColProps } from './types'

// ============================================================
// Options
// ============================================================

defineOptions({
  name: 'CxCol',
  inheritAttrs: false
})

// ============================================================
// Props
// ============================================================

withDefaults(defineProps<CxColProps>(), {
  value: 24
})
</script>
