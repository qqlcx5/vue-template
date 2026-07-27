<template>
  <el-button
    :class="['cx-button', { 'cx-button--icon-only': iconOnly }]"
    :type="type"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :circle="circle"
    :round="round"
    :plain="plain"
    :native-type="nativeType"
    v-bind="$attrs"
    @click="handleClick"
  >
    <CxIcon v-if="preIcon" :name="preIcon" :size="iconSize" class="cx-button__icon cx-button__icon--pre" />
    <span v-if="$slots.default" class="cx-button__text">
      <slot />
    </span>
    <CxIcon v-if="postIcon" :name="postIcon" :size="iconSize" class="cx-button__icon cx-button__icon--post" />
  </el-button>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import CxIcon from '../../CxIcon/src/CxIcon.vue'
import type { CxButtonProps, CxButtonEmits } from './types'

defineOptions({ name: 'CxButton' })

const props = withDefaults(defineProps<CxButtonProps>(), {
  type: 'default',
  size: 'default',
  loading: false,
  disabled: false,
  circle: false,
  round: false,
  plain: false,
  nativeType: 'button',
})

const emit = defineEmits<CxButtonEmits>()

const slots = useSlots()

const iconOnly = computed(() => {
  return (props.preIcon || props.postIcon) && !slots.default
})

function handleClick(event: MouseEvent) {
  if (!props.loading && !props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped lang="scss">
.cx-button {
  &__icon {
    &--pre {
      margin-right: 4px;
    }
    &--post {
      margin-left: 4px;
    }
  }
  &--icon-only {
    .cx-button__icon {
      margin: 0;
    }
  }
}
</style>
