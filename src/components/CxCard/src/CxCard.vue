<template>
  <el-card
    :shadow="shadow"
    :class="['cx-card', bodyClass]"
    :body-style="mergedBodyStyle"
    @click="emit('click')"
  >
    <template v-if="title || $slots.header" #header>
      <div class="cx-card__header">
        <span v-if="title" class="cx-card__title">{{ title }}</span>
        <div v-if="$slots.header" class="cx-card__header-extra">
          <slot name="header" />
        </div>
      </div>
    </template>
    <slot />
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CxCardProps, CxCardEmits } from './types'

defineOptions({ name: 'CxCard' })

const props = withDefaults(defineProps<CxCardProps>(), {
  title: '',
  shadow: 'always',
  padding: '',
  bodyClass: '',
  bodyStyle: () => ({}),
})

const emit = defineEmits<CxCardEmits>()

const mergedBodyStyle = computed(() => {
  const style: Record<string, any> = { ...props.bodyStyle }
  if (props.padding) {
    style.padding = typeof props.padding === 'number' ? `${props.padding}px` : props.padding
  }
  return style
})
</script>

<style scoped lang="scss">
.cx-card {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  }

  &__header-extra {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
