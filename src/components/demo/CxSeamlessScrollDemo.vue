<template>
  <div class="demo-page">
    <el-card header="CxSeamlessScroll — 无缝滚动组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxSeamlessScroll 提供四方向无缝滚动，支持悬停暂停、单步停顿、切换按钮等，适用于数据大屏和列表展示。
      </el-alert>

      <!-- 场景1：基础数据展示 -->
      <h3>场景1：基础数据展示（数据量阈值说明：limitMoveNum 默认 5）</h3>
      <div class="scroll-container vertical-scroll">
        <CxSeamlessScroll :data="basicList" :class-option="{ step: 0.5 }">
          <div v-for="(item, index) in basicList" :key="index" class="scroll-item">
            <span class="scroll-item__index">{{ index + 1 }}</span>
            <span class="scroll-item__text">{{ item.text }}</span>
            <span class="scroll-item__time">{{ item.time }}</span>
          </div>
        </CxSeamlessScroll>
      </div>
      <el-tag type="info" size="small">数据量需 ≥ limitMoveNum（默认5）才会滚动</el-tag>

      <!-- 场景2：四个方向滚动 -->
      <h3>场景2：四个方向滚动（top/bottom/left/right）</h3>
      <el-row :gutter="16">
        <el-col :span="12">
          <div class="direction-label">↑ 方向：top（默认）</div>
          <div class="scroll-container vertical-scroll">
            <CxSeamlessScroll :data="directionList" :class-option="{ direction: 'top', step: 0.5 }">
              <div v-for="(item, index) in directionList" :key="index" class="scroll-item">
                <span class="scroll-item__text">{{ item }}</span>
              </div>
            </CxSeamlessScroll>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="direction-label">↓ 方向：bottom</div>
          <div class="scroll-container vertical-scroll">
            <CxSeamlessScroll :data="directionList" :class-option="{ direction: 'bottom', step: 0.5 }">
              <div v-for="(item, index) in directionList" :key="index" class="scroll-item">
                <span class="scroll-item__text">{{ item }}</span>
              </div>
            </CxSeamlessScroll>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="16" style="margin-top: 16px">
        <el-col :span="12">
          <div class="direction-label">← 方向：left</div>
          <div class="scroll-container horizontal-scroll">
            <CxSeamlessScroll :data="horizontalList" :class-option="{ direction: 'left', step: 0.5 }">
              <div v-for="(item, index) in horizontalList" :key="index" class="h-scroll-item">
                {{ item }}
              </div>
            </CxSeamlessScroll>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="direction-label">→ 方向：right</div>
          <div class="scroll-container horizontal-scroll">
            <CxSeamlessScroll :data="horizontalList" :class-option="{ direction: 'right', step: 0.5 }">
              <div v-for="(item, index) in horizontalList" :key="index" class="h-scroll-item">
                {{ item }}
              </div>
            </CxSeamlessScroll>
          </div>
        </el-col>
      </el-row>

      <!-- 场景3：step 滚动速度 -->
      <h3>场景3：step 滚动速度（慢/快）</h3>
      <el-row :gutter="16">
        <el-col :span="12">
          <div class="direction-label">慢速 step=0.3</div>
          <div class="scroll-container vertical-scroll" style="height: 160px">
            <CxSeamlessScroll :data="speedList" :class-option="{ step: 0.3 }">
              <div v-for="(item, index) in speedList" :key="index" class="scroll-item">
                <span class="scroll-item__text">{{ item }}</span>
              </div>
            </CxSeamlessScroll>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="direction-label">快速 step=2</div>
          <div class="scroll-container vertical-scroll" style="height: 160px">
            <CxSeamlessScroll :data="speedList" :class-option="{ step: 2 }">
              <div v-for="(item, index) in speedList" :key="index" class="scroll-item">
                <span class="scroll-item__text">{{ item }}</span>
              </div>
            </CxSeamlessScroll>
          </div>
        </el-col>
      </el-row>

      <!-- 场景4：hoverStop 悬停暂停 -->
      <h3>场景4：hoverStop 悬停暂停（关闭 vs 开启）</h3>
      <el-row :gutter="16">
        <el-col :span="12">
          <div class="direction-label">hoverStop=false（不暂停）</div>
          <div class="scroll-container vertical-scroll" style="height: 160px">
            <CxSeamlessScroll :data="hoverList" :class-option="{ hoverStop: false, step: 0.5 }">
              <div v-for="(item, index) in hoverList" :key="index" class="scroll-item">
                <span class="scroll-item__text">{{ item }}</span>
              </div>
            </CxSeamlessScroll>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="direction-label">hoverStop=true（默认，悬停暂停）</div>
          <div class="scroll-container vertical-scroll" style="height: 160px">
            <CxSeamlessScroll :data="hoverList" :class-option="{ hoverStop: true, step: 0.5 }">
              <div v-for="(item, index) in hoverList" :key="index" class="scroll-item">
                <span class="scroll-item__text">{{ item }}</span>
              </div>
            </CxSeamlessScroll>
          </div>
        </el-col>
      </el-row>

      <!-- 场景5：singleHeight + waitTime 单步停顿 -->
      <h3>场景5：singleHeight + waitTime 单步停顿</h3>
      <div class="scroll-container vertical-scroll" style="height: 200px">
        <CxSeamlessScroll
          :data="stepList"
          :class-option="{ singleHeight: 40, waitTime: 1500, step: 1 }"
        >
          <div v-for="(item, index) in stepList" :key="index" class="scroll-item" style="height: 40px">
            <span class="scroll-item__index">{{ index + 1 }}</span>
            <span class="scroll-item__text">{{ item.text }}</span>
            <span class="scroll-item__time">{{ item.time }}</span>
          </div>
        </CxSeamlessScroll>
      </div>
      <el-tag type="info" size="small">每条高度 40px，停顿 1500ms</el-tag>

      <!-- 场景6：navigation 横向切换按钮 -->
      <h3>场景6：navigation 横向切换按钮</h3>
      <div class="scroll-container horizontal-scroll" style="height: 120px; padding: 0 40px">
        <CxSeamlessScroll
          :data="navList"
          :class-option="{
            navigation: true,
            direction: 'left',
            autoPlay: false,
            switchSingleStep: 120,
            switchDelay: 300
          }"
        >
          <div v-for="(item, index) in navList" :key="index" class="h-scroll-item nav-item">
            {{ item }}
          </div>
        </CxSeamlessScroll>
      </div>

      <!-- 场景7：scrollEnd emit 事件 -->
      <h3>场景7：scrollEnd emit 事件</h3>
      <div class="demo-row">
        <div class="scroll-container vertical-scroll" style="height: 160px; width: 300px">
          <CxSeamlessScroll :data="emitList" :class-option="{ step: 1 }" @scroll-end="onScrollEnd">
            <div v-for="(item, index) in emitList" :key="index" class="scroll-item">
              <span class="scroll-item__text">{{ item }}</span>
            </div>
          </CxSeamlessScroll>
        </div>
        <div class="emit-log">
          <el-tag>scrollEnd 触发次数：{{ scrollEndCount }}</el-tag>
        </div>
      </div>

      <!-- 场景8：left-switch / right-switch 插槽 -->
      <h3>场景8：left-switch / right-switch 插槽</h3>
      <div class="scroll-container horizontal-scroll" style="height: 120px; padding: 0 50px">
        <CxSeamlessScroll
          :data="slotList"
          :class-option="{
            navigation: true,
            direction: 'left',
            autoPlay: false,
            switchSingleStep: 120
          }"
        >
          <template #left-switch>
            <div class="custom-switch">◀</div>
          </template>
          <template #right-switch>
            <div class="custom-switch">▶</div>
          </template>
          <div v-for="(item, index) in slotList" :key="index" class="h-scroll-item">
            {{ item }}
          </div>
        </CxSeamlessScroll>
      </div>

      <!-- 场景9：reset expose 方法 -->
      <h3>场景9：reset expose 方法</h3>
      <div class="demo-row">
        <div class="scroll-container vertical-scroll" style="height: 160px; width: 300px">
          <CxSeamlessScroll ref="resetRef" :data="resetList" :class-option="{ step: 0.5 }">
            <div v-for="(item, index) in resetList" :key="index" class="scroll-item">
              <span class="scroll-item__text">{{ item }}</span>
            </div>
          </CxSeamlessScroll>
        </div>
        <div>
          <el-button type="primary" @click="onReset">reset()</el-button>
        </div>
      </div>

      <!-- 场景10：数据大屏实时告警滚动 -->
      <h3>场景10：数据大屏实时告警滚动场景</h3>
      <div class="dashboard-alert">
        <div class="dashboard-alert__header">
          <span class="dashboard-alert__title">⚡ 实时告警</span>
          <el-tag type="danger" size="small">{{ alertList.length }} 条</el-tag>
        </div>
        <div class="scroll-container" style="height: 220px">
          <CxSeamlessScroll :data="alertList" :class-option="{ step: 0.5, hoverStop: true }">
            <div v-for="(item, index) in alertList" :key="index" class="alert-item">
              <span class="alert-item__level" :class="`alert-level--${item.level}`">
                {{ item.levelText }}
              </span>
              <span class="alert-item__content">{{ item.content }}</span>
              <span class="alert-item__time">{{ item.time }}</span>
            </div>
          </CxSeamlessScroll>
        </div>
      </div>

      <!-- 场景11：横向荣誉墙 navigation 模式 -->
      <h3>场景11：横向荣誉墙 navigation 模式</h3>
      <div class="honor-wall">
        <CxSeamlessScroll
          :data="honorList"
          :class-option="{
            navigation: true,
            direction: 'left',
            autoPlay: false,
            switchSingleStep: 200,
            switchDelay: 400
          }"
        >
          <div v-for="(item, index) in honorList" :key="index" class="honor-card">
            <div class="honor-card__icon">🏆</div>
            <div class="honor-card__title">{{ item.title }}</div>
            <div class="honor-card__year">{{ item.year }}</div>
          </div>
        </CxSeamlessScroll>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import CxSeamlessScroll from '@/components/CxSeamlessScroll'

// 场景1：基础数据
const basicList = ref(
  Array.from({ length: 8 }, (_, i) => ({
    text: `这是第 ${i + 1} 条数据，展示无缝滚动效果`,
    time: `2024-01-${String(i + 1).padStart(2, '0')} 10:${String(i * 5).padStart(2, '0')}:00`
  }))
)

// 场景2：方向
const directionList = ref(
  Array.from({ length: 6 }, (_, i) => `方向滚动测试 ${i + 1}`)
)
const horizontalList = ref(
  Array.from({ length: 8 }, (_, i) => `横向项 ${i + 1}`)
)

// 场景3：速度
const speedList = ref(
  Array.from({ length: 6 }, (_, i) => `速度测试项 ${i + 1}`)
)

// 场景4：hover
const hoverList = ref(
  Array.from({ length: 6 }, (_, i) => `悬停暂停测试 ${i + 1}`)
)

// 场景5：单步停顿
const stepList = ref(
  Array.from({ length: 8 }, (_, i) => ({
    text: `单步停顿项 ${i + 1}`,
    time: `12:${String(i * 3).padStart(2, '0')}:00`
  }))
)

// 场景6：navigation
const navList = ref(
  Array.from({ length: 10 }, (_, i) => `Nav ${i + 1}`)
)

// 场景7：scrollEnd
const emitList = ref(
  Array.from({ length: 6 }, (_, i) => `Emit 测试 ${i + 1}`)
)
const scrollEndCount = ref(0)

function onScrollEnd() {
  scrollEndCount.value++
}

// 场景8：插槽
const slotList = ref(
  Array.from({ length: 10 }, (_, i) => `插槽项 ${i + 1}`)
)

// 场景9：reset
const resetRef = ref<InstanceType<typeof CxSeamlessScroll> | null>(null)
const resetList = ref(
  Array.from({ length: 6 }, (_, i) => `Reset 测试 ${i + 1}`)
)

function onReset() {
  resetRef.value?.reset()
  ElMessage.success('已调用 reset()')
}

// 场景10：告警
const alertList = ref([
  { level: 'danger', levelText: '严重', content: '服务器 CPU 使用率超过 90%', time: '23:15:01' },
  { level: 'warning', levelText: '警告', content: '数据库连接池接近上限', time: '23:14:22' },
  { level: 'danger', levelText: '严重', content: 'API Gateway 响应超时', time: '23:13:45' },
  { level: 'info', levelText: '通知', content: '定时任务执行完成', time: '23:12:30' },
  { level: 'warning', levelText: '警告', content: 'Redis 内存使用率 85%', time: '23:11:15' },
  { level: 'danger', levelText: '严重', content: '磁盘空间不足 5%', time: '23:10:08' },
  { level: 'info', levelText: '通知', content: '日志文件已自动轮转', time: '23:09:00' }
])

// 场景11：荣誉墙
const honorList = ref([
  { title: '最佳产品奖', year: '2024' },
  { title: '技术创新奖', year: '2023' },
  { title: '行业领军企业', year: '2023' },
  { title: '用户满意奖', year: '2022' },
  { title: '优秀开源项目', year: '2022' },
  { title: '年度成长之星', year: '2021' },
  { title: '质量认证奖', year: '2021' },
  { title: '生态贡献奖', year: '2020' }
])
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

.scroll-container {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  padding: 8px;
  overflow: hidden;
}

.vertical-scroll {
  height: 240px;
  width: 100%;
}

.horizontal-scroll {
  height: 80px;
  width: 100%;
}

.direction-label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-bottom: 6px;
}

.scroll-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  font-size: 13px;

  &__index {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background: var(--el-color-primary);
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    flex-shrink: 0;
  }

  &__text {
    flex: 1;
    color: var(--el-text-color-primary);
  }

  &__time {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    flex-shrink: 0;
  }
}

.h-scroll-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 60px;
  margin-right: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
}

.nav-item {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.custom-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: var(--el-color-primary);
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
}

.emit-log {
  display: flex;
  gap: 8px;
}

.dashboard-alert {
  background: #1a1a2e;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  &__title {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }
}

.alert-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);

  &__level {
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 12px;
    font-weight: bold;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
  }

  &__time {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    flex-shrink: 0;
  }
}

.alert-level--danger {
  background: rgba(245, 108, 108, 0.2);
  color: #f56c6c;
}

.alert-level--warning {
  background: rgba(230, 162, 60, 0.2);
  color: #e6a23c;
}

.alert-level--info {
  background: rgba(144, 147, 153, 0.2);
  color: #909399;
}

.honor-wall {
  padding: 0 40px;
  height: 140px;
  display: flex;
  align-items: center;
}

.honor-card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 110px;
  margin-right: 16px;
  background: linear-gradient(135deg, #f6d365, #fda085);
  border-radius: 8px;
  color: #fff;
  text-align: center;

  &__icon {
    font-size: 28px;
    margin-bottom: 4px;
  }

  &__title {
    font-size: 14px;
    font-weight: bold;
  }

  &__year {
    font-size: 12px;
    opacity: 0.8;
    margin-top: 4px;
  }
}
</style>
