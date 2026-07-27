<template>
  <div class="cx-left-select-tree" :style="{ width: panelWidthStyle }">
    <CxTree
      :data="data"
      :model-value="selectedKeys"
      :filterable="filterable"
      :filter-placeholder="placeholder"
      :highlight-current="true"
      :node-key="nodeKey"
      class="cx-left-select-tree__tree"
      @update:model-value="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CxTree from '../../CxTree/src/CxTree.vue'
import type { CxLeftSelectTreeProps, CxLeftSelectTreeEmits } from './types'

defineOptions({ name: 'CxLeftSelectTree' })

const props = withDefaults(defineProps<CxLeftSelectTreeProps>(), {
  data: () => [],
  treeProps: () => ({}),
  modelValue: null,
  placeholder: '输入关键词搜索',
  filterable: true,
  panelWidth: '240px',
  nodeWidth: '220px',
})

const emit = defineEmits<CxLeftSelectTreeEmits>()

const nodeKey = computed(() => props.treeProps?.value || 'id')

const panelWidthStyle = computed(() => {
  return typeof props.panelWidth === 'number' ? `${props.panelWidth}px` : props.panelWidth
})

const selectedKeys = computed(() => {
  if (props.modelValue == null) return []
  if (Array.isArray(props.modelValue)) return props.modelValue
  return [props.modelValue]
})

function handleSelect(value: any) {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped lang="scss">
.cx-left-select-tree {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 12px;
  background: #fff;
  overflow: auto;

  &__tree {
    height: 100%;
  }
}
</style>
