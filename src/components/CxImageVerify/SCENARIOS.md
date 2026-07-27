---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_3472d69986a611f18108525400287e28
    ReservedCode1: WMk53fzuHXKVaCtU9DsSMlwycOHxDxSLMhvITBEsIKfMaqhzeqE/AJ46fE8pzIkU5HSSHo0SqjmH09DKbuqH6UTDVKTq16rE1uGkuTtL9MrG/6AAoGEiy/R8fyaQC97g3nMxm/V5qya31yTyybMmtMnHUWeANyYDpJ4atrdubLI/jIAYAIz/SDPXTM8=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_3472d69986a611f18108525400287e28
    ReservedCode2: WMk53fzuHXKVaCtU9DsSMlwycOHxDxSLMhvITBEsIKfMaqhzeqE/AJ46fE8pzIkU5HSSHo0SqjmH09DKbuqH6UTDVKTq16rE1uGkuTtL9MrG/6AAoGEiy/R8fyaQC97g3nMxm/V5qya31yTyybMmtMnHUWeANyYDpJ4atrdubLI/jIAYAIz/SDPXTM8=
---

# CxImageVerify — 场景说明

## 典型场景

1. **登录表单**：在登录页面的密码输入框旁展示验证码，增加安全性。
2. **注册表单**：新用户注册时进行人机验证。
3. **敏感操作确认**：删除、重置等高风险操作前要求输入验证码。

## 不适用场景

- **需要服务端校验**：CxImageVerify 仅生成前端验证码值，需自行与服务端对接校验逻辑。
- **需要字母或混合验证码**：仅生成 4 位纯数字验证码。
- **需要滑块或行为验证**：不支持滑块、拼图、点击等行为验证。
- **嵌入式使用（不通过 v-model 读取值）**：必须通过 `v-model:code` 读取验证码值以做比对。

## 完整示例

### `code` prop — v-model 双向绑定

**初始为空**

```vue
<template>
  <CxImageVerify v-model:code="verifyCode" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxImageVerify from '@/components/CxImageVerify'
const verifyCode = ref('')
</script>
```

**外部预设值**

```vue
<template>
  <CxImageVerify v-model:code="verifyCode" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxImageVerify from '@/components/CxImageVerify'
const verifyCode = ref('1234')
</script>
```

### `update:code` emit — 监听验证码变化

```vue
<template>
  <div>
    <CxImageVerify v-model:code="verifyCode" />
    <p>当前验证码: {{ verifyCode }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CxImageVerify from '@/components/CxImageVerify'

const verifyCode = ref('')

watch(verifyCode, (newCode) => {
  console.log('新验证码:', newCode)
})
</script>
```

### `getImgCode` expose — 程序化刷新验证码

```vue
<template>
  <div>
    <CxImageVerify ref="verifyRef" v-model:code="verifyCode" />
    <el-button @click="refreshCode">刷新验证码</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxImageVerify from '@/components/CxImageVerify'

const verifyRef = ref<InstanceType<typeof CxImageVerify>>()
const verifyCode = ref('')

function refreshCode() {
  verifyRef.value?.getImgCode()
}
</script>
```

### 登录表单完整示例

```vue
<template>
  <el-form :model="loginForm" label-width="0" class="login-form">
    <el-form-item>
      <el-input v-model="loginForm.username" placeholder="用户名" />
    </el-form-item>
    <el-form-item>
      <el-input v-model="loginForm.password" type="password" placeholder="密码" />
    </el-form-item>
    <el-form-item>
      <div class="verify-row">
        <el-input
          v-model="loginForm.inputCode"
          placeholder="验证码"
          style="flex: 1"
        />
        <CxImageVerify
          ref="verifyRef"
          v-model:code="verifyCode"
        />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 100%" @click="handleLogin">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import CxImageVerify from '@/components/CxImageVerify'
import { ElMessage } from 'element-plus'

const loginForm = reactive({
  username: '',
  password: '',
  inputCode: ''
})

const verifyCode = ref('')
const verifyRef = ref<InstanceType<typeof CxImageVerify>>()

function handleLogin() {
  if (loginForm.inputCode.toLowerCase() !== verifyCode.value.toLowerCase()) {
    ElMessage.error('验证码错误')
    verifyRef.value?.getImgCode()
    loginForm.inputCode = ''
    return
  }
  ElMessage.success('登录成功')
}
</script>

<style scoped>
.login-form {
  width: 360px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
}
.verify-row {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
```

## 注意事项

- 验证码比较建议忽略大小写（纯数字场景无影响，但预留扩展空间）。
- `getImgCode()` 调用后会触发 `update:code` 事件，注意避免在 watch 中造成循环触发。
- Canvas 尺寸固定为 120×40，通过 `useImageVerify(width, height)` 可调整，但组件模板中写死了 width="120" height="40"。
