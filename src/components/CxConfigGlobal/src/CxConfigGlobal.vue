<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
    <slot />
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { CxConfigGlobalProps, CxConfigGlobalEmits } from './types'

defineOptions({ name: 'CxConfigGlobal' })

withDefaults(defineProps<CxConfigGlobalProps>(), {
  size: 'default',
  zIndex: 3000,
})

const emit = defineEmits<CxConfigGlobalEmits>()

onMounted(() => {
  emit('ready')
})
</script>
