---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_40c8ca4c86a611f18766525400f8a581
    ReservedCode1: jUlxtEBI0U0BN/CWcXhl/JIPCkPq3mVpWbGr8AWbKb1kTOR9QifGwxvsE4cD/PSLMPmEt2wUEDQpQJiAM3uQyuDEBir9bnZVMtfCroVg4oI08h4HSkox8mnziWulMCRaoLAviFAPD5EDHo6OynmirbWWthrnFQWZqTUERdLCqM0imC6BNiM8Nfz1Co4=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_40c8ca4c86a611f18766525400f8a581
    ReservedCode2: jUlxtEBI0U0BN/CWcXhl/JIPCkPq3mVpWbGr8AWbKb1kTOR9QifGwxvsE4cD/PSLMPmEt2wUEDQpQJiAM3uQyuDEBir9bnZVMtfCroVg4oI08h4HSkox8mnziWulMCRaoLAviFAPD5EDHo6OynmirbWWthrnFQWZqTUERdLCqM0imC6BNiM8Nfz1Co4=
---

# CxSelector 场景说明

## 典型场景

### 1. 基础用法 — 评分选择

```vue
<template>
  <div>
    <p>请选择评分区间</p>
    <CxSelector
      :max="scores"
      @selectedVal="onSelect"
    />
    <p v-if="result">已选: {{ result.left }} ~ {{ result.right }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = ref<{ left: number; right: number } | null>(null)

function onSelect(val: { left: number; right: number; whole: any[] }) {
  result.value = val
}
</script>
```

### 2. 回显已有区间

```vue
<template>
  <CxSelector
    :max="levels"
    :echo="[2, 5]"
    @selectedVal="onSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const levels = [1, 2, 3, 4, 5, 6, 7, 8]

function onSelect(val: { left: number; right: number }) {
  console.log('新选区:', val.left, '~', val.right)
}
</script>
```

### 3. 禁用状态

```vue
<template>
  <CxSelector
    :max="[1, 2, 3, 4, 5]"
    disabled
  />
</template>
```

### 4. 自定义数值范围

```vue
<template>
  <p>选择难度区间（3~15）</p>
  <CxSelector
    :max="[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
    @selectedVal="onSelect"
  />
</template>
```

### 5. 同一页面多个实例

```vue
<template>
  <CxSelector :hsKey="1" :max="range1" @selectedVal="onSelect1" />
  <CxSelector :hsKey="2" :max="range2" @selectedVal="onSelect2" />
</template>

<script setup lang="ts">
const range1 = [0, 1, 2, 3, 4]
const range2 = [10, 20, 30, 40, 50]

function onSelect1(val) { console.log('实例1:', val) }
function onSelect2(val) { console.log('实例2:', val) }
</script>
```

### 6. selectedVal 事件 — 获取完整选择信息

```vue
<template>
  <CxSelector
    :max="options"
    @selectedVal="onSelect"
  />
</template>

<script setup lang="ts">
const options = [100, 200, 300, 400, 500, 600]

function onSelect(val) {
  // val.left: 较小值 → 200
  // val.right: 较大值 → 500
  // val.whole: [{ item: 200, index: 1 }, { item: 500, index: 4 }]
  console.log('区间:', val.left, '~', val.right)
  console.log('选中项:', val.whole)
}
</script>
```

## 不适用场景

- **连续值范围**：如音量 0~100 滑块，应使用 `CxSlider` 或 `CxRangeSlider`
- **大量选项（30+）**：表格布局会横向溢出，应改用下拉或滑块
- **非数值选项**：如 "A~F" 等级，用 `CxCheckboxGroup` 或 `CxSelect`
- **非连续区间**：需要选择不连续的多个数值时不适合
