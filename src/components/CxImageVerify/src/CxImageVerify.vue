<template>
  <canvas
    ref="domRef"
    width="120"
    height="40"
    class="cx-image-verify"
    @click="getImgCode"
  />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useImageVerify } from './hooks'
import type { CxImageVerifyProps, CxImageVerifyEmits } from './types'

defineOptions({
  name: 'CxImageVerify'
})

const props = withDefaults(defineProps<CxImageVerifyProps>(), {
  code: ''
})

const emit = defineEmits<CxImageVerifyEmits>()

const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify()

watch(
  () => props.code,
  (newValue) => {
    setImgCode(newValue)
  }
)

watch(imgCode, (newValue) => {
  emit('update:code', newValue)
})

defineExpose({ getImgCode })
</script>

<style scoped lang="scss">
.cx-image-verify {
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid var(--el-border-color, #dcdfe6);

  &:hover {
    border-color: var(--el-color-primary);
  }
}
</style>
