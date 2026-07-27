---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_3d7a261e86a611f18766525400f8a581
    ReservedCode1: BiRhAd1yJMmVFhWzOvvoGbtAzVqrGS0JZhUizxE4pwQKWGOgLCsTf6hdCwexULJLdaLgRb9GXuEnm11k4+xBfx7J+JoDJAYRXyexFVqDROAutuanDdHF2xzPLKdR6rFfPijEjIzopAnSmhrgRpdJsfedL4WvN6qaxpoJpLtyg6Q8IlKrxRDj439M9rI=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_3d7a261e86a611f18766525400f8a581
    ReservedCode2: BiRhAd1yJMmVFhWzOvvoGbtAzVqrGS0JZhUizxE4pwQKWGOgLCsTf6hdCwexULJLdaLgRb9GXuEnm11k4+xBfx7J+JoDJAYRXyexFVqDROAutuanDdHF2xzPLKdR6rFfPijEjIzopAnSmhrgRpdJsfedL4WvN6qaxpoJpLtyg6Q8IlKrxRDj439M9rI=
---

# CxSeamlessScroll 场景说明

## 典型场景

1. 数据大屏中的实时告警/通知滚动列表
2. 公告栏 / 新闻快讯的自动滚动展示
3. 荣誉墙 / 获奖名单的横向无缝轮播
4. 排行榜数据的向上滚动
5. 需要触摸拖拽的移动端滚动展示

## 不适用场景

- 需要分页的列表（应使用 el-table + 分页器）
- 用户可交互的复杂表单列表（无缝滚动会干扰用户操作）
- 数据量极少（< 5 条）的场景（组件会自动停止滚动）

---

## Props 示例

### data — 数据量阈值

```vue
<script setup lang="ts">
const notices = ref([
  '系统升级通知',
  '年度总结报告已发布',
  '请及时更新密码'
])
</script>

<template>
  <CxSeamlessScroll :data="notices">
    <div v-for="(item, i) in notices" :key="i" class="notice-item">
      {{ item }}
    </div>
  </CxSeamlessScroll>
</template>
```

> 当 `notices.length >= 5` 时才启动滚动。不足 5 条时内容静止显示。

### classOption.direction — 四个方向

```vue
<template>
  <!-- 向上滚动（默认） -->
  <CxSeamlessScroll :data="items" :class-option="{ direction: 'top' }">
    <div v-for="item in items" :key="item">{{ item }}</div>
  </CxSeamlessScroll>

  <!-- 向下滚动 -->
  <CxSeamlessScroll :data="items" :class-option="{ direction: 'bottom' }">
    <div v-for="item in items" :key="item">{{ item }}</div>
  </CxSeamlessScroll>

  <!-- 向左滚动 -->
  <CxSeamlessScroll :data="items" :class-option="{ direction: 'left' }">
    <span v-for="item in items" :key="item">{{ item }}</span>
  </CxSeamlessScroll>

  <!-- 向右滚动 -->
  <CxSeamlessScroll :data="items" :class-option="{ direction: 'right' }">
    <span v-for="item in items" :key="item">{{ item }}</span>
  </CxSeamlessScroll>
</template>
```

### classOption.step — 滚动速度

```vue
<template>
  <!-- 慢速 -->
  <CxSeamlessScroll :data="items" :class-option="{ step: 0.5 }">
    ...
  </CxSeamlessScroll>

  <!-- 快速 -->
  <CxSeamlessScroll :data="items" :class-option="{ step: 3 }">
    ...
  </CxSeamlessScroll>
</template>
```

### classOption.hoverStop — 悬停暂停

```vue
<template>
  <CxSeamlessScroll :data="items" :class-option="{ hoverStop: false }">
    <!-- 鼠标悬停也不会暂停 -->
  </CxSeamlessScroll>
</template>
```

### classOption.singleHeight / singleWidth — 单步停顿

```vue
<template>
  <CxSeamlessScroll
    :data="items"
    :class-option="{ singleHeight: 40, waitTime: 2000 }"
  >
    <div
      v-for="item in items"
      :key="item"
      style="height: 40px; line-height: 40px"
    >
      {{ item }}
    </div>
  </CxSeamlessScroll>
</template>
```

> 设置了 `singleHeight` 后 `hoverStop` 自动关闭。每滚动 40px（一条数据高度）停顿 2 秒。

### classOption.navigation — 横向切换按钮

```vue
<template>
  <CxSeamlessScroll
    :data="items"
    :class-option="{
      direction: 'left',
      navigation: true,
      switchSingleStep: 200,
      switchDelay: 300
    }"
  >
    <div
      v-for="item in items"
      :key="item"
      style="display: inline-block; width: 200px"
    >
      {{ item }}
    </div>
  </CxSeamlessScroll>
</template>
```

> navigation 模式下 `autoPlay` 自动关闭，用户通过左右按钮手动切换。

---

## Emits 示例

### scrollEnd

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loopCount = ref(0)

function onScrollEnd() {
  loopCount.value++
  // 可用于触发数据刷新
}
</script>

<template>
  <p>已完成 {{ loopCount }} 轮滚动</p>
  <CxSeamlessScroll :data="items" @scroll-end="onScrollEnd">
    <div v-for="item in items" :key="item">{{ item }}</div>
  </CxSeamlessScroll>
</template>
```

---

## Slots 示例

### left-switch / right-switch

```vue
<template>
  <CxSeamlessScroll
    :data="items"
    :class-option="{ direction: 'left', navigation: true }"
  >
    <template #left-switch>
      <el-button circle><el-icon><ArrowLeft /></el-icon></el-button>
    </template>
    <template #right-switch>
      <el-button circle><el-icon><ArrowRight /></el-icon></el-button>
    </template>

    <div
      v-for="item in items"
      :key="item"
      style="display: inline-block; width: 200px"
    >
      {{ item }}
    </div>
  </CxSeamlessScroll>
</template>
```

---

## Expose 示例

### reset — 重置滚动状态

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CxSeamlessScroll } from '@/components/CxSeamlessScroll'

const scrollRef = ref<InstanceType<typeof CxSeamlessScroll>>()
const items = ref(['A', 'B', 'C', 'D', 'E'])

watch(items, () => {
  // 数据更新后重置滚动（避免内容高度变化导致错位）
  scrollRef.value?.reset()
})
</script>

<template>
  <CxSeamlessScroll ref="scrollRef" :data="items">
    <div v-for="item in items" :key="item">{{ item }}</div>
  </CxSeamlessScroll>
</template>
```

---

## 复杂场景

### 数据大屏实时告警滚动

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const alerts = ref<{ id: number; level: string; message: string; time: string }[]>([
  { id: 1, level: '严重', message: '服务器 CPU 使用率超过 90%', time: '14:32:01' },
  { id: 2, level: '警告', message: '磁盘空间不足 10%', time: '14:31:45' },
  { id: 3, level: '提示', message: '系统备份完成', time: '14:30:00' },
  { id: 4, level: '严重', message: '数据库连接池耗尽', time: '14:29:30' },
  { id: 5, level: '警告', message: 'API 响应时间超过阈值', time: '14:28:15' },
  { id: 6, level: '提示', message: '新版本已发布 v2.3.1', time: '14:25:00' }
])

const loopCount = ref(0)

function onScrollEnd() {
  loopCount.value++
  // 模拟实时推送新告警
  if (loopCount.value % 3 === 0) {
    alerts.value.unshift({
      id: Date.now(),
      level: '提示',
      message: `第 ${loopCount.value} 轮滚动完成`,
      time: new Date().toLocaleTimeString()
    })
  }
}
</script>

<template>
  <div class="alert-board">
    <h3>实时告警</h3>
    <CxSeamlessScroll
      :data="alerts"
      :class-option="{ step: 1, limitMoveNum: 3, hoverStop: true }"
      style="height: 200px"
      @scroll-end="onScrollEnd"
    >
      <div
        v-for="alert in alerts"
        :key="alert.id"
        class="alert-item"
        :class="`alert-${alert.level}`"
      >
        <span class="alert-tag">{{ alert.level }}</span>
        <span class="alert-msg">{{ alert.message }}</span>
        <span class="alert-time">{{ alert.time }}</span>
      </div>
    </CxSeamlessScroll>
  </div>
</template>

<style scoped>
.alert-board {
  width: 400px;
  background: #0a1628;
  color: #fff;
  border-radius: 8px;
  padding: 12px;
}
.alert-item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  gap: 8px;
  font-size: 13px;
}
.alert-tag {
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: 2px;
  font-size: 11px;
}
.alert-严重 .alert-tag { background: #ff4d4f; color: #fff; }
.alert-警告 .alert-tag { background: #faad14; color: #fff; }
.alert-提示 .alert-tag { background: #1890ff; color: #fff; }
.alert-time { flex-shrink: 0; color: #a0a0a0; font-size: 11px; }
</style>
```

### 横向荣誉墙（navigation 模式）

```vue
<script setup lang="ts">
const honors = ref([
  '张三 - 最佳员工',
  '李四 - 技术先锋',
  '王五 - 服务之星',
  '赵六 - 创新达人',
  '钱七 - 销售冠军',
  '孙八 - 进步最快',
  '周九 - 优秀导师',
  '吴十 - 团队协作奖'
])
</script>

<template>
  <div class="honor-wall">
    <CxSeamlessScroll
      :data="honors"
      :class-option="{
        direction: 'left',
        navigation: true,
        switchSingleStep: 300,
        switchDelay: 500
      }"
      style="height: 80px; background: #f5f5f5; border-radius: 6px"
    >
      <template #left-switch>
        <span style="font-size: 20px">←</span>
      </template>
      <template #right-switch>
        <span style="font-size: 20px">→</span>
      </template>

      <div
        v-for="item in honors"
        :key="item"
        style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 300px;
          height: 80px;
          font-size: 18px;
          font-weight: bold;
          color: #333;
        "
      >
        {{ item }}
      </div>
    </CxSeamlessScroll>
  </div>
</template>
```
