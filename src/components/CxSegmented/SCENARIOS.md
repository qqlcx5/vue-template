---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_3f28e04f86a611f18108525400287e28
    ReservedCode1: G7k8GY21WhwdE6TJ166P515nyIrdVDbEPRo1SfMa9jaRUsHSje8wGUvm8W2zull2Y89bwVpkv3Qbzg2eoTkCCPdUJZHPSjDrldplq3AD3cm3yEEuITLzJLIB9JJvlV9Jv36On7JDHpdw0J2PEAVaN6heD0L2/21jC46Ssc3xDVioj0EoBCGkVrVec5E=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_3f28e04f86a611f18108525400287e28
    ReservedCode2: G7k8GY21WhwdE6TJ166P515nyIrdVDbEPRo1SfMa9jaRUsHSje8wGUvm8W2zull2Y89bwVpkv3Qbzg2eoTkCCPdUJZHPSjDrldplq3AD3cm3yEEuITLzJLIB9JJvlV9Jv36On7JDHpdw0J2PEAVaN6heD0L2/21jC46Ssc3xDVioj0EoBCGkVrVec5E=
---

# CxSegmented 场景说明

## 典型场景

### 1. 基础用法 — 视图切换

```vue
<template>
  <CxSegmented
    v-model="currentView"
    :options="options"
    @change="onViewChange"
  />
  <div class="view-content">
    <component :is="views[currentView]" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentView = ref(0)
const options = [
  { label: '日视图', value: 'day' },
  { label: '周视图', value: 'week' },
  { label: '月视图', value: 'month' }
]
const views = [DayView, WeekView, MonthView]

function onViewChange(payload: { index: number; option: any }) {
  console.log('切换到:', payload.option.label)
}
</script>
```

### 2. Block 模式 — 占满父容器宽度

```vue
<template>
  <CxSegmented
    v-model="activeTab"
    :options="tabs"
    block
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeTab = ref(1)
const tabs = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'in_progress' },
  { label: '已完成', value: 'done' }
]
</script>
```

### 3. 带图标选项

```vue
<template>
  <CxSegmented
    v-model="mode"
    :options="options"
  />
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

const mode = ref('list')

// 用 h() 创建图标组件
const ListIcon = { render: () => h('svg', { /* ... */ }) }
const GridIcon = { render: () => h('svg', { /* ... */ }) }

const options = [
  { label: '列表', value: 'list', icon: ListIcon },
  { label: '网格', value: 'grid', icon: GridIcon }
]
</script>
```

### 4. 禁用特定选项

```vue
<template>
  <CxSegmented
    v-model="timeRange"
    :options="options"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const timeRange = ref('7d')
const options = [
  { label: '实时', value: 'realtime', disabled: true },
  { label: '7天', value: '7d' },
  { label: '30天', value: '30d' }
]
</script>
```

### 5. 全局禁用

```vue
<template>
  <CxSegmented
    v-model="tab"
    :options="options"
    disabled
  />
</template>
```

### 6. 不同尺寸

```vue
<template>
  <CxSegmented v-model="s1" :options="opts" size="small" />
  <CxSegmented v-model="s2" :options="opts" size="default" />
  <CxSegmented v-model="s3" :options="opts" size="large" />
</template>
```

### 7. Expose — 获取当前索引

```vue
<template>
  <CxSegmented ref="segRef" v-model="tab" :options="options" />
  <button @click="logIndex">打印当前索引</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const segRef = ref()
const tab = ref(0)
const options = [
  { label: 'Tab A', value: 'a' },
  { label: 'Tab B', value: 'b' },
  { label: 'Tab C', value: 'c' }
]

function logIndex() {
  console.log('当前索引:', segRef.value.curIndex)
}
</script>
```

### 8. resize — 容器尺寸变化自适应

```vue
<template>
  <div ref="containerRef" :style="{ width: containerWidth + 'px' }">
    <CxSegmented v-model="tab" :options="options" block resize />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const containerWidth = ref(400)
// 当 containerWidth 动态变化时，指示器自动重新定位
</script>
```

## 不适用场景

- **10+ 个选项**：选项过多时应使用 `CxSelect` 下拉选择器
- **多选**：需要同时选中多项时使用 `CxCheckboxGroup`
- **需要内容面板**：标签 + 内容面板的 Tab 模式请使用 `CxTabs`
- **需要拖拽排序**：分段控制器不支持拖拽重排
