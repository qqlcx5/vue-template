---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_43d8851986a611f18766525400f8a581
    ReservedCode1: ONheACFkPghQiTPB80OxMwyijskEOwJAfWG1Qsj4974PeNe5CySKHjoIdK5yEFTsakpvTuiNNhOsjEGb1JHNHcgn5nTJ0iDXsLqYSCJCYj+LbxDt8Sz9yJyrAKXXE81TKThaNjReeE2U6Z1AC1jF+3m2Rzhml2hAq8PXj2IW4dcEmvQxYrnP8cw2ZLM=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_43d8851986a611f18766525400f8a581
    ReservedCode2: ONheACFkPghQiTPB80OxMwyijskEOwJAfWG1Qsj4974PeNe5CySKHjoIdK5yEFTsakpvTuiNNhOsjEGb1JHNHcgn5nTJ0iDXsLqYSCJCYj+LbxDt8Sz9yJyrAKXXE81TKThaNjReeE2U6Z1AC1jF+3m2Rzhml2hAq8PXj2IW4dcEmvQxYrnP8cw2ZLM=
---

# CxText 场景说明

## 典型场景

### 1. 基础用法 — 单行省略 + Tooltip

```vue
<template>
  <CxText>
    这是一段非常非常长的文本内容，当容器宽度不足以展示全部内容时，会自动省略并显示 tooltip
  </CxText>
</template>
```

### 2. 多行省略

```vue
<template>
  <CxText :line-clamp="3" style="width: 300px">
    长段落文本内容。当文本超过三行时会被截断，并显示省略号。鼠标悬浮时通过 tooltip 展示完整内容。适用于卡片描述、评论列表等场景。
  </CxText>
</template>
```

### 3. 透传 ElText 属性

```vue
<template>
  <CxText type="primary" size="large" tag="b" style="width: 200px">
    带样式的省略文本：加粗、大号、主色调
  </CxText>
</template>
```

### 4. 自定义 Tooltip 属性

```vue
<template>
  <CxText
    :tooltip-props="{
      placement: 'bottom',
      effect: 'dark',
      showAfter: 500
    }"
    style="width: 200px"
  >
    自定义 tooltip 位置和样式。这里 tooltip 从底部弹出，延迟 500ms 显示。
  </CxText>
</template>
```

### 5. 自定义 Tooltip 内容

```vue
<template>
  <CxText style="width: 200px">
    <template #content>
      <div style="max-width: 300px">
        <strong>提示：</strong>这是一段格式化的 tooltip 内容，与省略文本不同
      </div>
    </template>
    省略显示的文本，但 tooltip 展示更丰富的内容
  </CxText>
</template>
```

### 6. 表格列中使用

```vue
<template>
  <el-table :data="tableData">
    <el-table-column label="名称" width="150">
      <template #default="{ row }">
        <CxText>{{ row.name }}</CxText>
      </template>
    </el-table-column>
    <el-table-column label="描述" width="200">
      <template #default="{ row }">
        <CxText :line-clamp="2">{{ row.description }}</CxText>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
const tableData = [
  { name: '短名称', description: '短描述' },
  { name: '这是一个超长的项目名称会在表格中自动省略', description: '一段很长的描述文本，超过两行后会自动截断并显示省略号，鼠标悬浮可以看到全文' }
]
</script>
```

### 7. 动态行数限制

```vue
<template>
  <div>
    <el-radio-group v-model="lines">
      <el-radio :value="undefined">单行</el-radio>
      <el-radio :value="2">两行</el-radio>
      <el-radio :value="4">四行</el-radio>
    </el-radio-group>
    <CxText :line-clamp="lines" style="width: 300px">
      {{ longText }}
    </CxText>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const lines = ref<number | undefined>(2)
const longText = '长文本内容...'
</script>
```

## 不适用场景

- **"展开/收起"交互**：需要手动点击展开全文的场景，应自行实现状态切换 + CSS 控制
- **富文本内容**：HTML 标签内的省略行为不可预测，不适合
- **需要省略中间而非末尾**：如文件路径省略中间部分（`D:/.../file.txt`），不适合
