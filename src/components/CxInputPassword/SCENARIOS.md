## 典型场景
- 登录页密码输入
- 注册页密码设置（含强度校验）
- 修改密码表单

## 不适用场景
- 纯数字 PIN 码输入
- 支付密码（需独立键盘）

## 示例

### 1. 基础用法
```vue
<template>
  <CxInputPassword v-model="password" placeholder="请输入密码" />
</template>
```

### 2. 带强度检测
```vue
<template>
  <CxInputPassword v-model="password" show-strength @strengthChange="onStrengthChange" />
</template>
```
说明：开启 showStrength 后，密码框下方会显示强度指示条（弱/一般/强/很强）。
