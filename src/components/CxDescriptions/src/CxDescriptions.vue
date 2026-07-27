<template>
  <div class="cx-descriptions">
    <template v-if="normalizedGroups.length">
      <div
        v-for="(group, gIdx) in normalizedGroups"
        :key="gIdx"
        class="cx-descriptions__group"
      >
        <div v-if="group.title" class="cx-descriptions__group-title">{{ group.title }}</div>
        <el-descriptions
          :column="column"
          :size="size"
          :border="border"
          :label-width="resolvedLabelWidth"
          class="cx-descriptions__table"
        >
          <el-descriptions-item
            v-for="(item, iIdx) in group.items"
            :key="iIdx"
            :span="item.span ?? 1"
            :label="item.label"
          >
            <template v-if="item.render">
              {{ item.render(data) }}
            </template>
            <template v-else-if="item.showTag && item.dictMap">
              <el-tag
                :color="getTagColor(item, data[item.field])"
                size="small"
              >
                {{ getDictLabel(item, data[item.field]) }}
              </el-tag>
            </template>
            <template v-else>
              {{ formatValue(item, data[item.field]) }}
            </template>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </template>
    <el-collapse-transition v-if="collapsible">
      <div v-show="!isCollapsed">
        <slot name="extra" />
      </div>
    </el-collapse-transition>
    <div v-if="collapsible" class="cx-descriptions__toggle" @click="toggle">
      <CxIcon :name="isCollapsed ? 'arrow-down' : 'arrow-up'" :size="14" />
      <span>{{ isCollapsed ? '展开' : '收起' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CxIcon from '../../CxIcon/src/CxIcon.vue'
import type { CxDescriptionsProps, CxDescriptionsEmits, DescriptionGroup } from './types'

defineOptions({ name: 'CxDescriptions' })

const props = withDefaults(defineProps<CxDescriptionsProps>(), {
  data: () => ({}),
  column: 3,
  size: 'default',
  border: false,
  collapsible: false,
  defaultCollapsed: false,
  labelWidth: 'auto',
})

const emit = defineEmits<CxDescriptionsEmits>()

const isCollapsed = ref(props.defaultCollapsed)

const normalizedGroups = computed<DescriptionGroup[]>(() => {
  if (props.groups && props.groups.length) return props.groups
  if (props.schema && props.schema.length) return [{ items: props.schema }]
  return []
})

const resolvedLabelWidth = computed(() => {
  if (typeof props.labelWidth === 'number') return `${props.labelWidth}px`
  return props.labelWidth
})

function getDictLabel(item: DescriptionGroup['items'][number], value: any): string {
  if (item.dictMap && value != null) {
    return item.dictMap[value] ?? String(value)
  }
  return String(value ?? '-')
}

function getTagColor(item: DescriptionGroup['items'][number], value: any): string {
  if (item.dictColorMap && value != null && item.dictColorMap[value]) {
    return item.dictColorMap[value]
  }
  return ''
}

function formatValue(item: DescriptionGroup['items'][number], value: any): string {
  if (value == null || value === '') return '-'
  if (item.dictMap) return getDictLabel(item, value)
  return String(value)
}

function toggle() {
  isCollapsed.value = !isCollapsed.value
  emit('update:collapsed', isCollapsed.value)
}
</script>

<style scoped lang="scss">
.cx-descriptions {
  &__group {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__group-title {
    font-size: 15px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 12px;
    padding-left: 8px;
    border-left: 3px solid #409eff;
  }

  &__table {
    background: #fff;
  }

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 8px 0;
    font-size: 13px;
    color: #909399;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: #409eff;
    }
  }
}
</style>
