<template>
  <div class="demo-page">
    <el-card header="CxIcon — 离线图标组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        基于 `@iconify/vue/offline` + `@iconify-json/mdi`，本地渲染 SVG，不走 Iconify 在线 API。
        图标名格式：`mdi:name`，查询：https://icones.js.org/collection/mdi
      </el-alert>

      <!-- 场景1：基础用法 -->
      <h3>场景1：基础用法（尺寸 / 颜色）</h3>
      <div class="demo-row">
        <div v-for="item in basicIcons" :key="item.icon" class="icon-card">
          <CxIcon :icon="item.icon" :width="item.width" :color="item.color" />
          <span>{{ item.icon }}</span>
        </div>
      </div>

      <!-- 场景2：内联模式 -->
      <h3>场景2：内联模式（与文字混排）</h3>
      <p class="inline-paragraph">
        订单
        <CxIcon icon="mdi:check-circle" inline width="16" color="#67c23a" />
        已支付，预计
        <CxIcon icon="mdi:alarm" inline width="16" color="#e6a23c" />
        3 个工作日内发货。
      </p>
      <ul class="status-list">
        <li>
          <CxIcon icon="mdi:check-circle" inline width="16" color="#67c23a" />
          上传成功
        </li>
        <li>
          <CxIcon icon="mdi:alert" inline width="16" color="#e6a23c" />
          文件过大
        </li>
        <li>
          <CxIcon icon="mdi:close-circle" inline width="16" color="#f56c6c" />
          网络失败
        </li>
      </ul>

      <!-- 场景3：旋转 / 翻转 -->
      <h3>场景3：旋转 / 翻转</h3>
      <div class="demo-row">
        <div class="icon-card">
          <CxIcon icon="mdi:arrow-down" width="24" color="#409eff" />
          <span>默认</span>
        </div>
        <div class="icon-card">
          <CxIcon icon="mdi:arrow-down" width="24" color="#409eff" :rotate="90" />
          <span>rotate=90</span>
        </div>
        <div class="icon-card">
          <CxIcon icon="mdi:arrow-down" width="24" color="#409eff" :rotate="180" />
          <span>rotate=180</span>
        </div>
        <div class="icon-card">
          <CxIcon icon="mdi:arrow-down" width="24" color="#409eff" rotate="45deg" />
          <span>45deg</span>
        </div>
        <div class="icon-card">
          <CxIcon icon="mdi:arrow-right" width="24" color="#67c23a" :horizontal-flip="true" />
          <span>horizontalFlip</span>
        </div>
        <div class="icon-card">
          <CxIcon icon="mdi:arrow-up" width="24" color="#e6a23c" :vertical-flip="true" />
          <span>verticalFlip</span>
        </div>
      </div>

      <!-- 场景4：配合按钮 -->
      <h3>场景4：配合 Element Plus 按钮</h3>
      <div class="demo-row">
        <el-button type="primary">
          <CxIcon icon="mdi:magnify" width="16" />
          <span class="btn-text">搜索</span>
        </el-button>
        <el-button type="success">
          <CxIcon icon="mdi:plus-circle" width="16" />
          <span class="btn-text">新增</span>
        </el-button>
        <el-button type="danger">
          <CxIcon icon="mdi:delete" width="16" />
          <span class="btn-text">删除</span>
        </el-button>
        <el-button type="warning">
          <CxIcon icon="mdi:pencil" width="16" />
          <span class="btn-text">编辑</span>
        </el-button>
      </div>

      <!-- 场景5：动态切换 -->
      <h3>场景5：动态切换图标</h3>
      <div class="demo-row">
        <CxIcon :icon="activeIcon" width="40" color="#409eff" />
        <el-tag type="info">{{ activeIcon }}</el-tag>
      </div>
      <div class="preset-btns">
        <el-button
          v-for="name in presetIcons"
          :key="name"
          size="small"
          :type="activeIcon === name ? 'primary' : 'default'"
          @click="activeIcon = name"
        >
          <CxIcon :icon="name" width="14" style="margin-right: 4px" />
          {{ name }}
        </el-button>
      </div>

      <!-- 场景6：表格预览 -->
      <h3>场景6：菜单配置表格预览</h3>
      <el-table :data="menuList" border style="width: 100%; max-width: 720px">
        <el-table-column label="序号" type="index" width="60" align="center" />
        <el-table-column label="菜单名称" prop="name" width="140" />
        <el-table-column label="图标名" prop="icon" min-width="160" />
        <el-table-column label="预览" width="80" align="center">
          <template #default="{ row }">
            <CxIcon :icon="row.icon" width="20" color="#409eff" />
          </template>
        </el-table-column>
        <el-table-column label="路由" prop="path" min-width="140" />
      </el-table>

      <!-- 场景7：Expose -->
      <h3>场景7：Expose 获取 DOM</h3>
      <div class="demo-row">
        <CxIcon ref="iconRef" icon="mdi:star" width="36" color="#e6a23c" />
        <el-button type="primary" size="small" @click="logEl">打印 DOM</el-button>
        <el-button type="success" size="small" @click="toggleColor">切换颜色</el-button>
        <el-tag v-if="elInfo" type="info">{{ elInfo }}</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CxIcon } from '@/components/CxIcon'

defineOptions({
  name: 'CxIconDemo'
})

// 场景1
const basicIcons = [
  { icon: 'mdi:pencil', width: 24, color: undefined },
  { icon: 'mdi:delete', width: 28, color: '#f56c6c' },
  { icon: 'mdi:magnify', width: 32, color: '#67c23a' },
  { icon: 'mdi:home', width: 24, color: '#409eff' },
  { icon: 'mdi:cog', width: 24, color: '#e6a23c' },
  { icon: 'mdi:account', width: 24, color: '#909399' }
]

// 场景5
const activeIcon = ref('mdi:home')
const presetIcons = [
  'mdi:home',
  'mdi:account',
  'mdi:bell',
  'mdi:magnify',
  'mdi:pencil',
  'mdi:delete',
  'mdi:cog',
  'mdi:star'
]

// 场景6
const menuList = [
  { name: '首页', icon: 'mdi:home', path: '/home' },
  { name: '用户管理', icon: 'mdi:account-group', path: '/users' },
  { name: '系统设置', icon: 'mdi:cog', path: '/settings' },
  { name: '数据统计', icon: 'mdi:chart-bar', path: '/stats' }
]

// 场景7
const iconRef = ref<InstanceType<typeof CxIcon>>()
const elInfo = ref('')

function logEl() {
  const el = iconRef.value?.el()
  if (!el) {
    ElMessage.warning('未获取到 DOM')
    return
  }
  console.log('CxIcon DOM:', el)
  elInfo.value = `${el.tagName}.${el.className}`
  ElMessage.success('已输出到控制台')
}

function toggleColor() {
  const el = iconRef.value?.el()
  const svg = el?.querySelector('svg')
  if (!svg) return
  const current = svg.getAttribute('color') || svg.style.color
  const next = current === '#e6a23c' || current === 'rgb(230, 162, 60)' ? '#409eff' : '#e6a23c'
  svg.setAttribute('color', next)
  ;(svg as SVGElement).style.color = next
}
</script>

<style scoped lang="scss">
.demo-page {
  padding: 16px;

  h3 {
    margin: 20px 0 10px;
    font-size: 15px;
    color: var(--el-text-color-primary);
  }
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  padding: 12px 16px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;

  span {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    text-align: center;
    word-break: break-all;
  }
}

.inline-paragraph {
  margin: 0 0 12px;
  padding: 12px 16px;
  background: var(--el-fill-color-light);
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.8;
}

.status-list {
  margin: 0 0 8px;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    font-size: 14px;
    border-bottom: 1px dashed var(--el-border-color-lighter);

    &:last-child {
      border-bottom: none;
    }
  }
}

.btn-text {
  margin-left: 4px;
}

.preset-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
</style>
