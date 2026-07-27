<template>
  <div ref="typedItRef" class="cx-typeit">
    <slot>
      <span class="cx-typeit__target" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useSlots } from 'vue'
import TypeIt from 'typeit'
import type { CxTypeitProps } from './types'

defineOptions({
  name: 'CxTypeit'
})

const props = withDefaults(defineProps<CxTypeitProps>(), {
  options: () => ({})
})

const slots = useSlots()
const typedItRef = ref<HTMLElement | null>(null)
let typeItInstance: TypeIt | null = null

onMounted(() => {
  const container = typedItRef.value
  if (!container) return

  let target: HTMLElement | null = null

  if (slots.default) {
    // 有 default 插槽时，取插槽根元素作为打字目标
    target = container.firstElementChild as HTMLElement
  } else {
    // 无插槽时，使用默认的 .cx-typeit__target
    target = container.querySelector('.cx-typeit__target') as HTMLElement
  }

  if (!target) {
    throw new TypeError(
      'CxTypeit: 未找到打字目标元素。请提供 default 插槽，或确保默认的 .cx-typeit__target 存在。'
    )
  }

  typeItInstance = new TypeIt(target, props.options).go()
})

defineExpose({
  get typeIt() {
    return typeItInstance
  }
})
</script>

<style scoped lang="scss">
.cx-typeit {
  display: inline-block;
}
</style>
