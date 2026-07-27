---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_42490a3886a611f18766525400f8a581
    ReservedCode1: YUnS+DKYRSW5fc0qMy6saN9P8gSsHU0sU2Orb6oe2SCCXf9o59KsHYBMoSQHEpaslL4WDLrKvFX+KN9YtEL/hnd2TS/MIuq3BjPhyXHJwCZf5ckGt38O5juee5R473oX8jstvTCFTXJhAJdUtPZ6lRFv5sbrTsWiUa29kMIymWxztO4Zsj+cwJb7ges=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_42490a3886a611f18766525400f8a581
    ReservedCode2: YUnS+DKYRSW5fc0qMy6saN9P8gSsHU0sU2Orb6oe2SCCXf9o59KsHYBMoSQHEpaslL4WDLrKvFX+KN9YtEL/hnd2TS/MIuq3BjPhyXHJwCZf5ckGt38O5juee5R473oX8jstvTCFTXJhAJdUtPZ6lRFv5sbrTsWiUa29kMIymWxztO4Zsj+cwJb7ges=
---

# CxSplitPane 场景说明

## 典型场景

### 1. 基础用法 — 左右分栏

```vue
<template>
  <CxSplitPane style="height: 400px">
    <template #left>
      <div class="sidebar">侧边栏内容</div>
    </template>
    <template #right>
      <div class="main">主内容区</div>
    </template>
  </CxSplitPane>
</template>

<style scoped>
.sidebar { padding: 16px; background: #f5f5f5; }
.main { padding: 16px; }
</style>
```

### 2. 上下分栏

```vue
<template>
  <CxSplitPane split="horizontal" style="height: 500px">
    <template #left>
      <div class="editor">编辑区</div>
    </template>
    <template #right>
      <div class="preview">预览区</div>
    </template>
  </CxSplitPane>
</template>
```

### 3. 自定义初始比例和最小限制

```vue
<template>
  <CxSplitPane
    :defaultPercent="30"
    :minPercent="15"
    style="height: 400px"
  >
    <template #left>
      <div class="nav">导航面板（初始 30%，最小 15%）</div>
    </template>
    <template #right>
      <div class="content">内容区域</div>
    </template>
  </CxSplitPane>
</template>
```

### 4. 禁用拖拽

```vue
<template>
  <CxSplitPane disabled :defaultPercent="40" style="height: 400px">
    <template #left>
      <div>固定布局 — 不可拖拽调整</div>
    </template>
    <template #right>
      <div>右侧内容</div>
    </template>
  </CxSplitPane>
</template>
```

### 5. resize 事件 — 监听比例变化

```vue
<template>
  <CxSplitPane @resize="onResize" style="height: 400px">
    <template #left><div>左侧</div></template>
    <template #right><div>右侧: {{ currentPercent }}%</div></template>
  </CxSplitPane>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentPercent = ref(50)

function onResize(percent: number) {
  currentPercent.value = percent
}
</script>
```

### 6. Expose — 程序化控制

```vue
<template>
  <div>
    <button @click="splitRef.reset()">重置</button>
    <button @click="splitRef.setPercent(70)">设为 70%</button>
    <span>当前: {{ splitRef?.percent }}%</span>
  </div>
  <CxSplitPane ref="splitRef" style="height: 400px">
    <template #left><div>左侧</div></template>
    <template #right><div>右侧</div></template>
  </CxSplitPane>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const splitRef = ref()
</script>
```

### 7. 嵌套实现三栏布局

```vue
<template>
  <CxSplitPane :defaultPercent="25" style="height: 500px">
    <template #left>
      <div>导航栏</div>
    </template>
    <template #right>
      <CxSplitPane :defaultPercent="60">
        <template #left>
          <div>编辑区</div>
        </template>
        <template #right>
          <div>属性面板</div>
        </template>
      </CxSplitPane>
    </template>
  </CxSplitPane>
</template>
```

## 不适用场景

- **固定等宽多栏**：无拖拽需求的静态布局用 CSS Grid/Flexbox 更简单
- **面板折叠/展开**：需要侧边栏收起功能的，需配合其他组件实现
- **响应式自适应**：移动端/小屏适配建议用媒体查询切换布局
- **带标签页的面板**：在面板内部自行嵌入 Tab 组件
