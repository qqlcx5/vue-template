---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_46d6614e86a611f18108525400287e28
    ReservedCode1: Sdz1ydh/mZ0xy/3TVd/s9CgGjW5T2AL7cMU+nBFx8sLBfg8scgxwyuv46mni8mFiBzrhjFs9VoEl7Y2XZW8CwNLATeqvkw4GbFtXVW7azEvuH5VwPmHEX58UfA5jYW6F63cl5jXJdr8nShkQFVlbSPfSBwSCMJ+ySxM0iQqta+/JklboEqkyv/AKHIc=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_46d6614e86a611f18108525400287e28
    ReservedCode2: Sdz1ydh/mZ0xy/3TVd/s9CgGjW5T2AL7cMU+nBFx8sLBfg8scgxwyuv46mni8mFiBzrhjFs9VoEl7Y2XZW8CwNLATeqvkw4GbFtXVW7azEvuH5VwPmHEX58UfA5jYW6F63cl5jXJdr8nShkQFVlbSPfSBwSCMJ+ySxM0iQqta+/JklboEqkyv/AKHIc=
---

# CxTypeit 场景说明

## 典型场景

- 首页 Hero 区域逐字打印标语
- 对话式 UI 中模拟打字回复效果
- 引导页/教程页逐行展示说明文字
- 终端模拟器中逐字输出命令结果

## 不适用场景

- 需要多个独立打字目标同时播放 → 使用多个 CxTypeit 实例
- 需要高度自定义的文本动画（逐字淡入/弹跳等）→ 使用 CSS 动画或 GSAP
- 纯静态文本展示 → 直接使用 `<span>` / `<p>` 标签

## Props 示例

### `options` — 基础打字动画

```vue
<template>
  <CxTypeit :options="typeItOptions" />
</template>

<script setup lang="ts">
import CxTypeit from '@/components/CxTypeit'

const typeItOptions = {
  strings: ['Hello, World!', 'Welcome to CxTypeit.'],
  speed: 80,
  waitUntilVisible: true,
  loop: true,
  loopDelay: 2000
}
</script>
```

### `options` — 带删除效果的单行打字

```vue
<template>
  <CxTypeit :options="typeItOptions" />
</template>

<script setup lang="ts">
import CxTypeit from '@/components/CxTypeit'

const typeItOptions = {
  strings: ['前端开发工程师', 'Vue 3 技术栈', 'TypeScript 爱好者'],
  speed: 100,
  deleteSpeed: 50,
  breakLines: false,
  loop: true
}
</script>
```

## Slot 示例

### `default` 插槽 — 自定义打字目标

```vue
<template>
  <CxTypeit :options="options">
    <h2 class="custom-title" />
  </CxTypeit>
</template>

<script setup lang="ts">
import CxTypeit from '@/components/CxTypeit'

const options = {
  strings: ['这是一段自定义标题的打字效果'],
  speed: 60
}
</script>

<style scoped>
.custom-title {
  font-size: 24px;
  color: #409eff;
}
</style>
```

注意事项：默认插槽内必须包含一个带 `cx-typeit__target` class 的元素，否则会抛出 TypeError。若不提供插槽，组件内部会自动渲染 `<span class="cx-typeit__target" />`。

## Expose 示例

### `typeIt` — 获取 TypeIt 实例并手动控制

```vue
<template>
  <div>
    <CxTypeit ref="typeitRef" :options="options" />
    <button @click="pause">暂停</button>
    <button @click="resume">继续</button>
    <button @click="restart">重新开始</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxTypeit from '@/components/CxTypeit'

const typeitRef = ref<InstanceType<typeof CxTypeit> | null>(null)

const options = {
  strings: ['这是一段可以手动控制的打字动画。'],
  speed: 80
}

function pause() {
  typeitRef.value?.typeIt?.freeze()
}

function resume() {
  typeitRef.value?.typeIt?.unfreeze()
}

function restart() {
  typeitRef.value?.typeIt?.destroy()
  // 注意：destroy 后实例已不可用，需通过刷新页面或重新挂载组件来重启
}
</script>
```

注意事项：`typeIt` 实例在 `onMounted` 之后才可用。调用 `destroy()` 后实例将被销毁，无法通过 `unfreeze()` 等方法恢复，请谨慎使用。
