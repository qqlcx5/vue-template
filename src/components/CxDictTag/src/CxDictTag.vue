<template>
  <span class="cx-dict-tag">
    <template v-if="displayValues.length === 0">
      <span class="cx-dict-tag__empty">-</span>
    </template>
    <template v-else>
      <el-tag
        v-for="(item, idx) in displayValues"
        :key="idx"
        :size="size"
        :effect="effect"
        :color="item.color"
        :closable="closable"
        :disable-transitions="false"
        class="cx-dict-tag__item"
        @close="handleClose(item.value)"
      >
        {{ item.label }}
      </el-tag>
      <el-tooltip
        v-if="overflowValues.length > 0"
        placement="top"
      >
        <template #content>
          <div class="cx-dict-tag__tooltip">
            <el-tag
              v-for="(item, idx) in overflowValues"
              :key="idx"
              :size="size"
              :effect="effect"
              :color="item.color"
              class="cx-dict-tag__tooltip-item"
            >
              {{ item.label }}
            </el-tag>
          </div>
        </template>
        <el-tag :size="size" class="cx-dict-tag__more">
          +{{ overflowValues.length }}
        </el-tag>
      </el-tooltip>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CxDictTagProps, CxDictTagEmits, DictOption } from './types'

defineOptions({ name: 'CxDictTag' })

const props = withDefaults(defineProps<CxDictTagProps>(), {
  dictData: () => [],
  value: undefined,
  size: 'default',
  effect: 'light',
  closable: false,
  max: 0,
  separator: ',',
})

const emit = defineEmits<CxDictTagEmits>()

const normalizedValues = computed<string[]>(() => {
  if (props.value == null) return []
  if (Array.isArray(props.value)) return props.value.map(String)
  if (typeof props.value === 'string' && props.separator && props.value.includes(props.separator)) {
    return props.value.split(props.separator).map(v => v.trim()).filter(Boolean)
  }
  return [String(props.value)]
})

const matchedOptions = computed<DictOption[]>(() => {
  if (!props.dictData.length) return []
  const map = new Map(props.dictData.map(d => [String(d.value), d]))
  return normalizedValues.value
    .map(v => map.get(v))
    .filter((d): d is DictOption => d != null)
})

const hasOverflow = computed(() => props.max > 0 && matchedOptions.value.length > props.max)

const displayValues = computed(() => {
  if (!hasOverflow.value) return matchedOptions.value
  return matchedOptions.value.slice(0, props.max)
})

const overflowValues = computed(() => {
  if (!hasOverflow.value) return []
  return matchedOptions.value.slice(props.max)
})

function handleClose(value: string | number) {
  emit('close', value)
}
</script>

<style scoped lang="scss">
.cx-dict-tag {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  &__empty {
    color: #c0c4cc;
  }

  &__item {
    margin: 0;
  }

  &__more {
    cursor: pointer;
  }

  &__tooltip {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  &__tooltip-item {
    margin: 0;
  }
}
</style>
