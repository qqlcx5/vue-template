# CxCol 场景说明

## 典型场景

- 表单行内需要等宽的多列布局，所有断点均使用同一占比。
- 快速搭建响应式栅格布局，不想为每个断点重复写相同数值。
- 与 `el-row` 配合使用的常规栅格布局。

## 不适用场景

- 需要不同断点使用不同占位值（如 PC 端 6 列、移动端 24 列），应直接使用 `el-col`。
- 不需要栅格布局的纯 flex / grid 场景。

---

## 示例

### 基础用法：等分三列

```vue
<template>
  <el-row :gutter="16">
    <CxCol :value="8">
      <div class="demo-box">列 1</div>
    </CxCol>
    <CxCol :value="8">
      <div class="demo-box">列 2</div>
    </CxCol>
    <CxCol :value="8">
      <div class="demo-box">列 3</div>
    </CxCol>
  </el-row>
</template>

<script setup lang="ts">
import CxCol from '@/components/CxCol'
</script>

<style scoped>
.demo-box {
  background: #ecf5ff;
  border-radius: 4px;
  padding: 16px;
  text-align: center;
}
</style>
```

### 默认占满全宽（value=24）

```vue
<template>
  <el-row>
    <CxCol>
      <div class="demo-box">占满整行</div>
    </CxCol>
  </el-row>
</template>

<script setup lang="ts">
import CxCol from '@/components/CxCol'
</script>
```

### 透传 el-col 原生属性：offset

```vue
<template>
  <el-row>
    <CxCol :value="8" :offset="8">
      <div class="demo-box">居中偏移 8 列</div>
    </CxCol>
  </el-row>
</template>

<script setup lang="ts">
import CxCol from '@/components/CxCol'
</script>
```

### 透传 el-col 原生属性：push / pull

```vue
<template>
  <el-row>
    <CxCol :value="18" :push="6">
      <div class="demo-box">内容在后，视觉在前</div>
    </CxCol>
    <CxCol :value="6" :pull="18">
      <div class="demo-box">内容在前，视觉在后</div>
    </CxCol>
  </el-row>
</template>

<script setup lang="ts">
import CxCol from '@/components/CxCol'
</script>
```

### 固定 span 覆盖 value

```vue
<!-- span 会通过 $attrs 透传到 el-col，覆盖 value 统一设置的断点 -->
<template>
  <el-row>
    <CxCol :value="6" :span="12">
      <div class="demo-box">span=12 覆盖了 value 的断点设置</div>
    </CxCol>
  </el-row>
</template>

<script setup lang="ts">
import CxCol from '@/components/CxCol'
</script>
```

### 复杂场景：搜索表单栅格布局

```vue
<template>
  <el-form :model="query" inline>
    <el-row :gutter="16">
      <CxCol :value="8">
        <el-form-item label="名称">
          <el-input v-model="query.name" />
        </el-form-item>
      </CxCol>
      <CxCol :value="8">
        <el-form-item label="状态">
          <el-select v-model="query.status">
            <el-option label="全部" value="" />
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
      </CxCol>
      <CxCol :value="8">
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </CxCol>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxCol from '@/components/CxCol'

const query = ref({ name: '', status: '' })
</script>
```
