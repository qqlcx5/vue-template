# CxInputPassword

## 设计意图
增强密码输入框，支持显示/隐藏密码切换、密码强度实时检测，适用于登录、注册、修改密码等场景。

## 功能边界
- 支持：显示/隐藏切换、密码强度指示条、强度校验规则
- 不支持：短信验证码输入（应使用 el-input + 倒计时）

## 依赖
- Element Plus `el-input`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| modelValue | `string` | `''` | 否 | 密码值（v-model） |
| placeholder | `string` | `'请输入密码'` | 否 | 占位文本 |
| showStrength | `boolean` | `false` | 否 | 显示密码强度指示 |
| strengthRules | `{ min: number; regex: RegExp; label: string }[]` | 内置规则 | 否 | 强度校验规则 |
| disabled | `boolean` | `false` | 否 | 禁用 |

### Emits
| 事件名 | 参数 | 说明 |
|---|---|---|
| update:modelValue | `value: string` | 值变化 |
| strengthChange | `score: number` | 强度评分变化（0-4） |
