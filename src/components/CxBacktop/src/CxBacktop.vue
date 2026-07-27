<template>
  <el-backtop
    :target="target"
    :visibility-height="visibilityHeight"
    :right="right"
    :bottom="bottom"
    @click="emit('click')"
  />
</template>

<script setup lang="ts">
import type { CxBacktopProps, CxBacktopEmits } from './types'

defineOptions({ name: 'CxBacktop' })

withDefaults(defineProps<CxBacktopProps>(), {
  visibilityHeight: 200,
  target: '',
  right: 40,
  bottom: 40,
})

const emit = defineEmits<CxBacktopEmits>()
</script>
