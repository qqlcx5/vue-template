<template>
  <div class="demo-page">
    <el-card header="CxFlicker — 脉冲指示器组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxFlicker 支持三种闪烁模式：pulse（脉冲扩散）、blink（明暗闪烁）、glow（霓虹光晕），可用于状态标识、未读提醒、告警灯等场景。
      </el-alert>

      <!-- 场景1：默认圆形脉冲 -->
      <h3>场景1：默认圆形脉冲</h3>
      <div class="demo-row">
        <div class="flicker-item">
          <CxFlicker />
          <span class="flicker-label">默认（primary 色，12px，圆形）</span>
        </div>
      </div>

      <!-- 场景2：自定义尺寸 -->
      <h3>场景2：自定义尺寸 width/height（小/中/大）</h3>
      <div class="demo-row">
        <div class="flicker-item">
          <CxFlicker width="6px" height="6px" />
          <span class="flicker-label">小（6px）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker width="12px" height="12px" />
          <span class="flicker-label">中（12px）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker width="20px" height="20px" />
          <span class="flicker-label">大（20px）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker width="32px" height="32px" />
          <span class="flicker-label">超大（32px）</span>
        </div>
      </div>

      <!-- 场景3：不同颜色状态 -->
      <h3>场景3：不同颜色状态（在线绿/忙碌橙/离线灰/告警红）</h3>
      <div class="demo-row">
        <div class="flicker-item">
          <CxFlicker background="#67c23a" />
          <span class="flicker-label">在线（绿）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker background="#e6a23c" />
          <span class="flicker-label">忙碌（橙）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker background="#909399" />
          <span class="flicker-label">离线（灰）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker background="#f56c6c" />
          <span class="flicker-label">告警（红）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker background="#409eff" />
          <span class="flicker-label">通知（蓝）</span>
        </div>
      </div>

      <!-- 场景4：方形脉冲 -->
      <h3>场景4：方形脉冲（borderRadius=4 和 borderRadius=0）</h3>
      <div class="demo-row">
        <div class="flicker-item">
          <CxFlicker :border-radius="4" background="#409eff" />
          <span class="flicker-label">圆角方形（borderRadius=4）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker :border-radius="0" background="#f56c6c" width="14px" height="14px" />
          <span class="flicker-label">直角方形（borderRadius=0）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker :border-radius="8" background="#67c23a" width="16px" height="16px" />
          <span class="flicker-label">大圆角方形（borderRadius=8）</span>
        </div>
      </div>

      <!-- 场景5：自定义脉冲扩散幅度 scale -->
      <h3>场景5：自定义脉冲扩散幅度 scale（1.5/2/4）</h3>
      <div class="demo-row">
        <div class="flicker-item">
          <CxFlicker :scale="1.5" background="#409eff" />
          <span class="flicker-label">scale=1.5（小范围）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker :scale="2" background="#67c23a" />
          <span class="flicker-label">scale=2（默认）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker :scale="4" background="#f56c6c" />
          <span class="flicker-label">scale=4（大范围）</span>
        </div>
      </div>

      <!-- 场景6：三种闪烁模式对比 -->
      <h3>场景6：三种闪烁模式 — pulse / blink / glow</h3>
      <div class="demo-row">
        <div class="flicker-item">
          <CxFlicker mode="pulse" background="#409eff" width="16px" height="16px" />
          <span class="flicker-label">pulse（脉冲扩散）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker mode="blink" background="#f56c6c" width="16px" height="16px" />
          <span class="flicker-label">blink（明暗闪烁）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker mode="glow" background="#67c23a" width="16px" height="16px" />
          <span class="flicker-label">glow（霓虹光晕）</span>
        </div>
      </div>

      <!-- 场景7：不同模式 + 方形 -->
      <h3>场景7：blink / glow 模式配合方形（borderRadius=0）</h3>
      <div class="demo-row">
        <div class="flicker-item">
          <CxFlicker mode="blink" :border-radius="0" background="#e6a23c" width="16px" height="16px" />
          <span class="flicker-label">blink 方形（告警灯）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker mode="blink" :border-radius="0" background="#f56c6c" width="20px" height="20px" />
          <span class="flicker-label">blink 大方块（录制中）</span>
        </div>
        <div class="flicker-item">
          <CxFlicker mode="glow" :border-radius="4" background="#409eff" width="18px" height="18px" />
          <span class="flicker-label">glow 圆角方块（在线高亮）</span>
        </div>
      </div>

      <!-- 场景8：未读消息提醒组合 -->
      <h3>场景8：未读消息提醒组合（配合 el-badge）</h3>
      <div class="demo-row">
        <el-badge :value="3" class="badge-item">
          <el-button :icon="Bell" circle />
        </el-badge>
        <el-badge :value="12" class="badge-item">
          <el-button :icon="ChatDotRound" circle />
        </el-badge>
        <el-badge is-dot class="badge-item">
          <el-button :icon="Message" circle />
        </el-badge>
        <div class="flicker-badge-item">
          <CxFlicker width="8px" height="8px" background="#f56c6c" :scale="3" />
          <span class="flicker-label">实时消息提醒</span>
        </div>
      </div>

      <!-- 场景9：列表项状态指示（服务监控场景） -->
      <h3>场景9：列表项状态指示（服务监控场景）</h3>
      <el-table :data="serviceList" border style="width: 100%">
        <el-table-column label="状态" width="80" align="center">
          <template #default="{ row }">
            <div class="tw-size-[20px] tw-flex tw-items-center">
              <CxFlicker
                :width="'10px'"
                :height="'10px'"
                :background="getStatusColor(row.status)"
                :scale="2"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="服务名称" />
        <el-table-column prop="host" label="主机地址" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusTag(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="latency" label="延迟" width="100">
          <template #default="{ row }">
            {{ row.latency }}ms
          </template>
        </el-table-column>
        <el-table-column prop="uptime" label="可用率" width="120">
          <template #default="{ row }">
            <el-progress :percentage="row.uptime" :color="row.uptime > 99 ? '#67c23a' : '#e6a23c'" :stroke-width="6" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Bell, ChatDotRound, Message } from '@element-plus/icons-vue'
import { CxFlicker } from '@/components/CxFlicker'

interface ServiceItem {
  name: string
  host: string
  status: 'online' | 'busy' | 'offline' | 'alert'
  latency: number
  uptime: number
}

const serviceList: ServiceItem[] = [
  { name: 'API Gateway', host: '192.168.1.10:8080', status: 'online', latency: 12, uptime: 99.9 },
  { name: 'MySQL Primary', host: '192.168.1.20:3306', status: 'online', latency: 3, uptime: 99.99 },
  { name: 'Redis Cache', host: '192.168.1.30:6379', status: 'busy', latency: 45, uptime: 98.5 },
  { name: 'Elasticsearch', host: '192.168.1.40:9200', status: 'alert', latency: 120, uptime: 95.2 },
  { name: 'RabbitMQ', host: '192.168.1.50:5672', status: 'offline', latency: 0, uptime: 0 }
]

function getStatusColor(status: ServiceItem['status']): string {
  const map: Record<ServiceItem['status'], string> = {
    online: '#67c23a',
    busy: '#e6a23c',
    offline: '#909399',
    alert: '#f56c6c'
  }
  return map[status]
}

function getStatusText(status: ServiceItem['status']): string {
  const map: Record<ServiceItem['status'], string> = {
    online: '运行中',
    busy: '繁忙',
    offline: '离线',
    alert: '告警'
  }
  return map[status]
}

function getStatusTag(status: ServiceItem['status']): 'success' | 'warning' | 'info' | 'danger' {
  const map: Record<ServiceItem['status'], 'success' | 'warning' | 'info' | 'danger'> = {
    online: 'success',
    busy: 'warning',
    offline: 'info',
    alert: 'danger'
  }
  return map[status]
}
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
  gap: 24px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.flicker-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.flicker-label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.badge-item {
  margin-right: 16px;
}

.flicker-badge-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
