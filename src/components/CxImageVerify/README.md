---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_338caf1b86a611f18108525400287e28
    ReservedCode1: 8GhwnG/b0V2jrQbEbjdMng32Ngb/61KT+gIrUA5aOs7F5zc9iXySO7QfcWaragZRQwdCTRGBakObQ/dHM/lhrtFFrMVlFuNAcl/zuMEWUsQkYquPjfbEfDlb1J53cfWzwSX9s0078NlHb3QDEo3nucVywavtO9ReplVQKzVXGWliudKNof2Tw1QLuHg=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_338caf1b86a611f18108525400287e28
    ReservedCode2: 8GhwnG/b0V2jrQbEbjdMng32Ngb/61KT+gIrUA5aOs7F5zc9iXySO7QfcWaragZRQwdCTRGBakObQ/dHM/lhrtFFrMVlFuNAcl/zuMEWUsQkYquPjfbEfDlb1J53cfWzwSX9s0078NlHb3QDEo3nucVywavtO9ReplVQKzVXGWliudKNof2Tw1QLuHg=
---

# CxImageVerify

图形验证码组件，在 Canvas 上绘制随机 4 位数字验证码，支持点击刷新。

## 设计意图

CxImageVerify 通过 Canvas 2D API 动态绘制含干扰线/干扰点的数字验证码图片。每次调用 `getImgCode()` 或在挂载时自动生成新验证码。通过 `useImageVerify` hook 封装绘制逻辑与状态管理。

- **Canvas 绘制**：随机字体大小、旋转角度、颜色，配合干扰线和干扰点增强防识别能力。
- **点击刷新**：Canvas 绑定了 `click` 事件，点击即可刷新验证码。
- **双向绑定**：验证码值通过 `v-model:code` 双向绑定，外部可读取或预设验证码值。
- **Expose 暴露方法**：提供 `getImgCode()` 供外部程序化刷新。

## 功能边界

| 范围 | 说明 |
| --- | --- |
| **包含** | Canvas 绘制 4 位数字验证码、干扰线/干扰点、点击刷新、v-model 双向绑定、程序化刷新 |
| **不包含** | 字母验证码、算术验证码、滑块验证码、验证码输入框、服务端校验 |

## 依赖

- `useImageVerify` (hooks)：封装 Canvas 绘制逻辑，返回 `domRef` / `imgCode` / `setImgCode` / `getImgCode`。

## API

### Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `code` | `string` | `''` | 双向绑定的验证码值，4 位数字字符串 |

### Emits

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `update:code` | `(code: string)` | 验证码值更新时触发 |

### Slots

无。

### Expose

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| `getImgCode` | `() => void` | 重新生成验证码并在 Canvas 上绘制 |

## 使用示例

```vue
<template>
  <div class="verify-row">
    <el-input v-model="inputCode" placeholder="请输入验证码" style="width: 160px" />
    <CxImageVerify v-model:code="verifyCode" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CxImageVerify from '@/components/CxImageVerify'

const inputCode = ref('')
const verifyCode = ref('')

watch(verifyCode, (val) => {
  console.log('当前验证码:', val)
})
</script>

<style scoped>
.verify-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
```
