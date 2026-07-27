<template>
  <el-popover placement="bottom-end" :width="240" trigger="click">
    <template #reference>
      <el-button size="small" plain>列设置</el-button>
    </template>
    <div class="cx-custom-column">
      <el-checkbox
        :model-value="allChecked"
        :indeterminate="indeterminate"
        @change="handleCheckAll"
      >
        全选
      </el-checkbox>
      <el-divider style="margin: 8px 0" />
      <draggable
        v-if="localColumns.length"
        :list="localColumns"
        item-key="field"
        handle=".cx-custom-column__drag"
        class="cx-custom-column__list"
      >
        <template #item="{ element }">
          <div class="cx-custom-column__item">
            <span class="cx-custom-column__drag">::</span>
            <el-checkbox v-model="element.visible" :disabled="element.fixed">{{ element.label }}</el-checkbox>
          </div>
        </template>
      </draggable>
      <div class="cx-custom-column__footer">
        <el-button size="small" @click="handleReset">重置</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CxCustomColumnProps, CxCustomColumnEmits } from './types'

defineOptions({ name: 'CxCustomColumn' })

const props = withDefaults(defineProps<CxCustomColumnProps>(), {
  columns: () => [],
})

const emit = defineEmits<CxCustomColumnEmits>()

const localColumns = ref<{ field: string; label: string; visible: boolean; fixed?: boolean }[]>([])

watch(() => props.columns, (val) => {
  localColumns.value = val ? val.map(c => ({ ...c })) : []
}, { immediate: true })

const allChecked = computed(() => {
  return localColumns.value.length > 0 && localColumns.value.every(c => c.visible)
})

const indeterminate = computed(() => {
  const visibleCount = localColumns.value.filter(c => c.visible).length
  return visibleCount > 0 && visibleCount < localColumns.value.length
})

function handleCheckAll(val: boolean) {
  localColumns.value.forEach(c => {
    if (!c.fixed) c.visible = val
  })
}

function handleReset() {
  localColumns.value.forEach(c => {
    if (!c.fixed) c.visible = true
  })
}

function handleConfirm() {
  emit('confirm', [...localColumns.value])
}
</script>

<style scoped lang="scss">
.cx-custom-column {
  &__list {
    max-height: 300px;
    overflow-y: auto;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
  }

  &__drag {
    cursor: grab;
    color: #c0c4cc;
    font-size: 14px;
    user-select: none;

    &:active {
      cursor: grabbing;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
  }
}
</style>
