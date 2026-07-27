<template>
  <div class="cx-search" :class="{ 'cx-search--bottom': layout === 'bottom' }">
    <el-form :model="formData" :inline="layout === 'inline'">
      <template v-for="item in visibleSchema" :key="item.field">
        <el-form-item :label="item.label">
          <component
            :is="item.component"
            v-model="formData[item.field]"
            v-bind="item.componentProps"
          />
        </el-form-item>
      </template>
      <el-form-item v-if="layout === 'inline'">
        <el-button type="primary" @click="handleSearch">{{ searchText }}</el-button>
        <el-button @click="handleReset">{{ resetText }}</el-button>
        <el-button
          v-if="hasCollapsed"
          text
          type="primary"
          @click="collapsed = !collapsed"
        >
          {{ collapsed ? '展开' : '收起' }}
          <el-icon class="cx-search__collapse-icon">
            <component :is="collapsed ? ArrowDown : ArrowUp" />
          </el-icon>
        </el-button>
      </el-form-item>
    </el-form>
    <div v-if="layout === 'bottom'" class="cx-search__actions">
      <el-button type="primary" @click="handleSearch">{{ searchText }}</el-button>
      <el-button @click="handleReset">{{ resetText }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import type { CxSearchProps, CxSearchEmits } from './types'

defineOptions({ name: 'CxSearch' })

const props = withDefaults(defineProps<CxSearchProps>(), {
  schema: () => [],
  modelValue: () => ({}),
  layout: 'inline',
  collapseThreshold: 3,
  searchText: '查询',
  resetText: '重置',
})

const emit = defineEmits<CxSearchEmits>()

const collapsed = ref(true)
const formData = reactive<Record<string, any>>({ ...props.modelValue })

watch(() => props.modelValue, (val) => {
  Object.assign(formData, val)
}, { deep: true })

const hasCollapsed = computed(() => {
  return props.layout === 'inline' && (props.schema?.length ?? 0) > props.collapseThreshold
})

const visibleSchema = computed(() => {
  if (!hasCollapsed.value || !collapsed.value) return props.schema ?? []
  return (props.schema ?? []).slice(0, props.collapseThreshold)
})

function handleSearch() {
  emit('update:modelValue', { ...formData })
  emit('search', { ...formData })
}

function handleReset() {
  const resetData: Record<string, any> = {}
  for (const item of props.schema ?? []) {
    resetData[item.field] = undefined
  }
  Object.assign(formData, resetData)
  emit('update:modelValue', { ...formData })
  emit('reset', { ...formData })
}
</script>

<style scoped lang="scss">
.cx-search {
  padding: 16px;
  background: #fff;
  border-radius: 4px;

  &--bottom {
    .cx-search__actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #ebeef5;
    }
  }

  &__collapse-icon {
    margin-left: 4px;
    font-size: 12px;
  }
}
</style>
