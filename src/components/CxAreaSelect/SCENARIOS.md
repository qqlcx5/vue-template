## 典型场景
- 用户地址填写
- 企业注册地区选择
- 物流配送范围配置

## 不适用场景
- 海外地址选择
- 仅需选择省份（可直接用 el-select）

## 示例

### 1. 基础用法（代码模式）
```vue
<template>
  <CxAreaSelect v-model="areaCodes" @change="onAreaChange" />
</template>

<script setup>
const areaCodes = ref([])
function onAreaChange({ codes, names }) {
  console.log('代码:', codes, '名称:', names) // ['110000','110100','110105'] ['北京市','北京市','朝阳区']
}
</script>
```

### 2. 名称模式（表单回显）
```vue
<CxAreaSelect v-model="areaNames" :code-mode="false" />
```
