# CxAnimateSelector 场景说明

## 典型场景

- 低代码平台中，用户为某个页面元素配置进入/退出动画效果。
- 表单场景中需要选择动画类型（如弹窗出现动画、列表项动画）。

## 不适用场景

- 需要同时选择多个动画的场景（不支持多选）。
- 需要自定义动画列表（动画列表硬编码自 animate.css 全部效果，不可增减）。
- 不需要预览、仅需要文本输入动画名称的场景。

---

## 示例

### 基础用法：v-model 双向绑定

```vue
<template>
  <CxAnimateSelector v-model="animateName" />
  <p>当前选中动画：{{ animateName }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxAnimateSelector from '@/components/CxAnimateSelector'

const animateName = ref('')
</script>
```

### 自定义 placeholder

```vue
<template>
  <CxAnimateSelector v-model="animate" placeholder="选择入场动画" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxAnimateSelector from '@/components/CxAnimateSelector'

const animate = ref('')
</script>
```

### 完整表单场景：结合 el-form

```vue
<template>
  <el-form :model="form" label-width="100px">
    <el-form-item label="入场动画">
      <CxAnimateSelector v-model="form.enterAnimation" placeholder="请选择入场动画" />
    </el-form-item>
    <el-form-item label="出场动画">
      <CxAnimateSelector v-model="form.leaveAnimation" placeholder="请选择出场动画" />
    </el-form-item>
  </el-form>
  <el-button @click="preview">预览动画</el-button>

  <div v-if="showPreview" class="preview-box animate__animated" :class="previewClass">
    动画预览区域
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CxAnimateSelector from '@/components/CxAnimateSelector'

const form = ref({
  enterAnimation: '',
  leaveAnimation: ''
})

const showPreview = ref(false)

const previewClass = computed(() => {
  if (!form.value.enterAnimation) return ''
  return `animate__${form.value.enterAnimation}`
})

function preview() {
  showPreview.value = false
  setTimeout(() => {
    showPreview.value = true
  }, 50)
}
</script>

<style scoped>
.preview-box {
  margin-top: 16px;
  padding: 40px;
  text-align: center;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 18px;
}
</style>
```

### 搜索过滤

在下拉面板展开后，直接在 el-select 输入框键入关键词，组件会根据关键词过滤动画列表。例如输入 `fade` 会显示所有包含 `fade` 的动画（`fadeIn`、`fadeOut`、`fadeInDown` 等）。

```vue
<!-- filterable 已内置开启，用户无需额外配置 -->
<CxAnimateSelector v-model="animate" />
```

### 鼠标悬停预览

在下拉面板中将鼠标移动到某个动画卡片上时，该卡片上的动画名称会以 `animate__infinite` 循环播放，方便用户预览效果。

> 注意：此预览仅在悬停期间生效，鼠标移开后动画停止。

### 清空选择

选择器自带 `clearable`，点击选择框右侧的清除图标可清空当前选中值，`v-model` 绑定的变量会被设为空字符串。
