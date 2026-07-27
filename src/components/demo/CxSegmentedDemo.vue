<template>
  <div class="demo-page">
    <el-card header="CxSegmented — 分段控制器组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxSegmented 是一个分段选择器，支持 v-model 绑定索引、图标选项、禁用、多种尺寸、block 布局等。
      </el-alert>

      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法 v-model + options + change 事件</h3>
      <div class="demo-row">
        <CxSegmented
          v-model="basicValue"
          :options="basicOptions"
          @change="onBasicChange"
        />
        <el-tag type="info">当前索引：{{ basicValue }}</el-tag>
        <el-tag type="success">选中：{{ basicOptions[basicValue]?.label }}</el-tag>
      </div>

      <!-- 场景2：block 占满父容器宽度 -->
      <h3>场景2：block 占满父容器宽度</h3>
      <div style="width: 100%; margin-bottom: 16px">
        <CxSegmented
          v-model="blockValue"
          :options="blockOptions"
          block
        />
      </div>
      <el-tag type="info">当前索引：{{ blockValue }}</el-tag>

      <!-- 场景3：带图标选项 -->
      <h3>场景3：带图标选项</h3>
      <div class="demo-row">
        <CxSegmented
          v-model="iconValue"
          :options="iconOptions"
          @change="onIconChange"
        />
        <el-tag type="info">当前索引：{{ iconValue }}</el-tag>
      </div>

      <!-- 场景4：禁用特定选项 -->
      <h3>场景4：禁用特定选项（disabled: true）</h3>
      <div class="demo-row">
        <CxSegmented
          v-model="disableOptionValue"
          :options="disableOptions"
        />
        <el-tag type="info">当前索引：{{ disableOptionValue }}</el-tag>
        <el-tag type="warning">"已归档" 选项被禁用</el-tag>
      </div>

      <!-- 场景5：全局禁用 -->
      <h3>场景5：全局禁用（disabled prop）</h3>
      <div class="demo-row">
        <CxSegmented
          v-model="globalDisabledValue"
          :options="basicOptions"
          disabled
        />
        <el-tag type="danger">整个控件被禁用</el-tag>
      </div>

      <!-- 场景6：不同尺寸 -->
      <h3>场景6：不同尺寸 small/default/large</h3>
      <div class="size-row">
        <div class="size-item">
          <span class="size-label">small</span>
          <CxSegmented v-model="sizeValue" :options="basicOptions" size="small" />
        </div>
        <div class="size-item">
          <span class="size-label">default</span>
          <CxSegmented v-model="sizeValue" :options="basicOptions" size="default" />
        </div>
        <div class="size-item">
          <span class="size-label">large</span>
          <CxSegmented v-model="sizeValue" :options="basicOptions" size="large" />
        </div>
      </div>

      <!-- 场景7：expose 获取当前索引 curIndex -->
      <h3>场景7：expose 获取当前索引 curIndex</h3>
      <div class="demo-row">
        <CxSegmented
          ref="exposeRef"
          v-model="exposeValue"
          :options="basicOptions"
        />
        <el-button size="small" @click="getCurIndex">获取 curIndex</el-button>
        <el-tag type="info">expose 返回：{{ exposedCurIndex }}</el-tag>
      </div>

      <!-- 场景8：resize 容器尺寸变化自适应 -->
      <h3>场景8：resize 容器尺寸变化自适应</h3>
      <div class="demo-row">
        <div class="resize-container" :style="{ width: containerWidth + 'px' }">
          <CxSegmented
            v-model="resizeValue"
            :options="resizeOptions"
            block
            resize
          />
        </div>
        <el-button size="small" @click="toggleWidth">切换容器宽度 ({{ containerWidth }}px)</el-button>
      </div>

      <!-- 场景9：综合场景 - 视图切换 -->
      <h3>场景9：综合场景 — 视图切换（列表/卡片/表格）</h3>
      <div class="demo-row">
        <CxSegmented
          v-model="viewMode"
          :options="viewModeOptions"
        />
      </div>
      <div class="view-content">
        <template v-if="viewMode === 0">
          <el-table :data="viewData" border>
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="status" label="状态" width="100" />
            <el-table-column prop="date" label="日期" width="120" />
          </el-table>
        </template>
        <template v-else-if="viewMode === 1">
          <el-row :gutter="12">
            <el-col :span="6" v-for="item in viewData" :key="item.name">
              <el-card shadow="hover">
                <div style="font-weight: bold; margin-bottom: 4px">{{ item.name }}</div>
                <el-tag size="small">{{ item.status }}</el-tag>
                <div style="font-size: 12px; color: #999; margin-top: 4px">{{ item.date }}</div>
              </el-card>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <div class="list-view">
            <div v-for="item in viewData" :key="item.name" class="list-view__item">
              <span class="list-view__name">{{ item.name }}</span>
              <el-tag size="small">{{ item.status }}</el-tag>
              <span class="list-view__date">{{ item.date }}</span>
            </div>
          </div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { ElMessage } from 'element-plus'
import {
  List,
  Grid,
  Menu as MenuIcon,
  Document,
  FolderOpened,
  Folder
} from '@element-plus/icons-vue'
import CxSegmented from '@/components/CxSegmented'
import type { SegmentedOption } from '@/components/CxSegmented'

// 场景1：基础用法
const basicValue = ref(0)
const basicOptions: SegmentedOption[] = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'running' },
  { label: '已完成', value: 'done' },
  { label: '已取消', value: 'cancelled' }
]

function onBasicChange(payload: { index: number; option: SegmentedOption }) {
  ElMessage.info(`切换到：${payload.option.label}（索引 ${payload.index}）`)
}

// 场景2：block
const blockValue = ref(0)
const blockOptions: SegmentedOption[] = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' },
  { label: '年', value: 'year' }
]

// 场景3：带图标
const iconValue = ref(0)
const iconOptions: SegmentedOption[] = [
  { label: '列表', value: 'list', icon: markRaw(List) },
  { label: '网格', value: 'grid', icon: markRaw(Grid) },
  { label: '菜单', value: 'menu', icon: markRaw(MenuIcon) },
  { label: '文档', value: 'doc', icon: markRaw(Document) }
]

function onIconChange(payload: { index: number; option: SegmentedOption }) {
  ElMessage.info(`切换到：${payload.option.label}`)
}

// 场景4：禁用特定选项
const disableOptionValue = ref(0)
const disableOptions: SegmentedOption[] = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'running' },
  { label: '已完成', value: 'done' },
  { label: '已归档', value: 'archived', disabled: true }
]

// 场景5：全局禁用
const globalDisabledValue = ref(0)

// 场景6：尺寸
const sizeValue = ref(0)

// 场景7：expose
const exposeRef = ref<InstanceType<typeof CxSegmented> | null>(null)
const exposeValue = ref(0)
const exposedCurIndex = ref<number | null>(null)

function getCurIndex() {
  if (exposeRef.value) {
    exposedCurIndex.value = exposeRef.value.curIndex
    ElMessage.success(`当前 curIndex: ${exposeRef.value.curIndex}`)
  }
}

// 场景8：resize
const resizeValue = ref(0)
const resizeOptions: SegmentedOption[] = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' }
]
const containerWidth = ref(400)

function toggleWidth() {
  containerWidth.value = containerWidth.value === 400 ? 600 : 400
}

// 场景9：视图切换
const viewMode = ref(0)
const viewModeOptions: SegmentedOption[] = [
  { label: '表格', value: 'table', icon: markRaw(FolderOpened) },
  { label: '卡片', value: 'card', icon: markRaw(Grid) },
  { label: '列表', value: 'list', icon: markRaw(Folder) }
]

const viewData = [
  { name: '项目 Alpha', status: '进行中', date: '2024-01-15' },
  { name: '项目 Beta', status: '已完成', date: '2024-01-10' },
  { name: '项目 Gamma', status: '进行中', date: '2024-01-20' },
  { name: '项目 Delta', status: '已取消', date: '2024-01-05' }
]
</script>

<style scoped lang="scss">
.demo-page {
  padding: 16px;

  h3 {
    margin: 16px 0 8px;
    font-size: 15px;
    color: var(--el-text-color-primary);
  }
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.size-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.size-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.size-label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  min-width: 60px;
}

.resize-container {
  transition: width 0.3s ease;
}

.view-content {
  margin-top: 12px;
}

.list-view {
  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  &__name {
    flex: 1;
    font-size: 14px;
  }

  &__date {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
}
</style>
