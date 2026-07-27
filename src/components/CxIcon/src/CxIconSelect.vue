<script setup lang="ts">
// ============================================================
// CxIconSelect - 图标选择器
// ============================================================
// 参考ReIcon/Select.vue，支持 mdi 图标库的搜索、分页、选择
// 图标数据从 @iconify-json/mdi 动态加载

import { ref, computed, watch, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { loadIconSet, getIconNames, isIconSetAvailable } from './useIconLoad'
import CxIcon from './CxIcon.vue'

defineOptions({ name: 'CxIconSelect' })

const modelValue = defineModel<string>({ type: String, default: '' })

const props = withDefaults(
  defineProps<{
    /** 占位提示 */
    placeholder?: string
    /** 禁用 */
    disabled?: boolean
    /** 可清除 */
    clearable?: boolean
    /** 弹窗宽度 */
    popoverWidth?: number
    /** 每页图标数 */
    pageSize?: number
    /** 默认图标集前缀 */
    defaultPrefix?: string
  }>(),
  {
    placeholder: '请选择图标',
    disabled: false,
    clearable: false,
    popoverWidth: 400,
    pageSize: 49,
    defaultPrefix: 'mdi',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'change', val: string): void
}>()

// ---- 图标数据 ----
const allIcons = ref<string[]>([])
const loadingIcons = ref(false)
const currentPrefix = ref(props.defaultPrefix)
const filterValue = ref('')
const currentPage = ref(1)
const popoverVisible = ref(false)

// 支持的图标集 tab（仅显示已安装的）
const tabsList = computed(() => {
  const allTabs = [
    { label: 'MDI', name: 'mdi' },
    { label: 'Element Plus', name: 'ep' },
    { label: 'Remix Icon', name: 'ri' },
    { label: 'Simple Icons', name: 'simple-icons' },
  ]
  return allTabs.filter((tab) => isIconSetAvailable(tab.name))
})

// ---- 分页 + 搜索 ----
const filteredIcons = computed(() => {
  if (!filterValue.value) return allIcons.value
  const kw = filterValue.value.toLowerCase()
  return allIcons.value.filter((name) => name.toLowerCase().includes(kw))
})

const totalPages = computed(() =>
  Math.ceil(filteredIcons.value.length / props.pageSize),
)

const pageList = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return filteredIcons.value.slice(start, start + props.pageSize)
})

// 当前选中图标的高亮判断
function isActive(iconName: string) {
  return modelValue.value === `${currentPrefix.value}:${iconName}`
}

// 空状态文案
const emptyText = computed(() =>
  filterValue.value ? `未找到 "${filterValue.value}" 相关图标` : '暂无图标',
)

// 分页切换
function onPageChange(p: number) {
  currentPage.value = p
}

// ---- 加载图标集 ----
async function loadIcons(prefix: string) {
  loadingIcons.value = true
  try {
    await loadIconSet(prefix)
    allIcons.value = await getIconNames(prefix)
  } catch (err) {
    console.warn(`[CxIconSelect] 加载图标集 "${prefix}" 失败:`, err)
    allIcons.value = []
  } finally {
    loadingIcons.value = false
  }
}

// ---- 交互 ----
function onTabChange(name: string | number) {
  handleClickTab(String(name))
}

function handleClickTab(tabName: string) {
  currentPrefix.value = tabName
  currentPage.value = 1
  filterValue.value = ''
  loadIcons(tabName)
}

function onSelectIcon(iconName: string) {
  const full = `${currentPrefix.value}:${iconName}`
  modelValue.value = full
  emit('change', full)
  popoverVisible.value = false
}

function onClear() {
  modelValue.value = ''
  emit('change', '')
}

// 当前输入框显示的图标
const displayIcon = computed(() => modelValue.value || '')

// 打开弹窗前定位到当前图标所在页
function onBeforeEnter() {
  if (!modelValue.value) return
  const { prefix, name } = parsePrefix(modelValue.value)
  currentPrefix.value = prefix
  loadIcons(prefix).then(() => {
    const idx = allIcons.value.indexOf(name)
    if (idx >= 0) {
      currentPage.value = Math.ceil((idx + 1) / props.pageSize)
    }
  })
}

function parsePrefix(val: string) {
  const idx = val.indexOf(':')
  if (idx === -1) return { prefix: 'mdi', name: val }
  return { prefix: val.slice(0, idx), name: val.slice(idx + 1) }
}

watch(
  () => filterValue.value,
  () => {
    currentPage.value = 1
  },
)

onMounted(() => {
  loadIcons(currentPrefix.value)
})
</script>

<template>
  <div class="cx-icon-select">
    <el-input
      v-model="modelValue"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      readonly
    >
      <template #prefix>
        <CxIcon v-if="displayIcon" :icon="displayIcon" :width="16" :height="16" />
      </template>
      <template #append>
        <el-popover
          v-model:visible="popoverVisible"
          :width="popoverWidth"
          trigger="click"
          popper-class="cx-icon-select__popper"
          :disabled="disabled"
          @before-enter="onBeforeEnter"
        >
          <template #reference>
            <el-button :disabled="disabled">
              <el-icon><Search /></el-icon>
            </el-button>
          </template>

          <!-- 搜索 -->
          <el-input
            v-model="filterValue"
            placeholder="搜索图标名称"
            clearable
            size="small"
            style="margin-bottom: 8px"
          />

          <!-- 图标集切换 -->
          <el-tabs
            v-model="currentPrefix"
            @tab-change="onTabChange"
            style="margin-bottom: 4px"
          >
            <el-tab-pane
              v-for="tab in tabsList"
              :key="tab.name"
              :label="tab.label"
              :name="tab.name"
            />
          </el-tabs>

          <!-- 图标网格 -->
          <el-scrollbar height="240px" v-loading="loadingIcons">
            <ul class="cx-icon-select__grid">
              <li
                v-for="name in pageList"
                :key="name"
                :title="`${currentPrefix}:${name}`"
                class="cx-icon-select__item"
                :class="{ 'is-active': isActive(name) }"
                @click="onSelectIcon(name)"
              >
                <CxIcon
                  :icon="`${currentPrefix}:${name}`"
                  :width="20"
                  :height="20"
                />
              </li>
            </ul>
            <el-empty
              v-show="pageList.length === 0"
              :description="emptyText"
              :image-size="60"
            />
          </el-scrollbar>

          <!-- 分页 -->
          <div class="cx-icon-select__footer">
            <el-pagination
              :total="filteredIcons.length"
              :current-page="currentPage"
              :page-size="pageSize"
              :pager-count="5"
              layout="pager"
              background
              size="small"
              @current-change="onPageChange"
            />
            <el-button
              size="small"
              type="danger"
              text
              bg
              @click="onClear"
            >
              清空
            </el-button>
          </div>
        </el-popover>
      </template>
    </el-input>
  </div>
</template>

<style lang="scss" scoped>
.cx-icon-select {
  display: inline-block;
  width: 100%;
}

.cx-icon-select__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.cx-icon-select__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
  border: 1px solid var(--el-border-color-lighter, #e5e7eb);
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
    transform: scale(1.08);
  }

  &.is-active {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
  }
}

.cx-icon-select__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  margin-top: 8px;
  border-top: 1px solid var(--el-border-color-lighter, #e5e7eb);
  padding-top: 4px;
}
</style>
