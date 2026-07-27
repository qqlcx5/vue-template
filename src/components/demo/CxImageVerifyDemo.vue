<template>
  <div class="demo-page">
    <el-card header="CxImageVerify — 图片验证码组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxImageVerify 是一个 Canvas 绘制的图片验证码组件，支持 v-model:code 双向绑定，点击可刷新。
      </el-alert>

      <!-- 场景1：v-model:code 双向绑定（初始空值） -->
      <h3>场景1：v-model:code 双向绑定（初始空值）</h3>
      <div class="demo-row">
        <CxImageVerify v-model:code="verifyCode1" />
        <el-tag type="info">当前验证码：{{ verifyCode1 || '(空)' }}</el-tag>
        <el-button size="small" @click="verifyCode1 = ''">清空</el-button>
      </div>

      <!-- 场景2：外部预设值 -->
      <h3>场景2：外部预设值</h3>
      <div class="demo-row">
        <CxImageVerify v-model:code="verifyCode2" />
        <el-tag type="success">当前验证码：{{ verifyCode2 }}</el-tag>
        <el-button size="small" @click="presetCode">预设值</el-button>
      </div>

      <!-- 场景3：监听 update:code 变化 -->
      <h3>场景3：监听 update:code 变化</h3>
      <div class="demo-row">
        <CxImageVerify v-model:code="verifyCode3" @update:code="onCodeChange" />
        <div class="change-log">
          <el-tag>变更次数：{{ codeChangeCount }}</el-tag>
          <el-tag type="warning">最新值：{{ verifyCode3 }}</el-tag>
        </div>
      </div>

      <!-- 场景4：getImgCode expose 方法（程序化刷新） -->
      <h3>场景4：getImgCode expose 方法（程序化刷新）</h3>
      <div class="demo-row">
        <CxImageVerify ref="verifyRef" v-model:code="verifyCode4" />
        <el-button type="primary" size="small" @click="refreshCode">刷新验证码</el-button>
        <el-tag>当前值：{{ verifyCode4 }}</el-tag>
      </div>

      <!-- 场景5：登录表单完整示例 -->
      <h3>场景5：登录表单完整示例（用户名+密码+验证码+校验）</h3>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        style="max-width: 480px"
        @submit.prevent
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <div class="captcha-row">
            <el-input
              v-model="loginForm.captcha"
              placeholder="请输入验证码"
              :prefix-icon="Key"
              style="flex: 1"
              @keyup.enter="onLogin"
            />
            <CxImageVerify ref="loginVerifyRef" v-model:code="loginCaptchaCode" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="onLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { User, Lock, Key } from '@element-plus/icons-vue'
import CxImageVerify from '@/components/CxImageVerify'

// 场景1：基础双向绑定
const verifyCode1 = ref('')

// 场景2：外部预设值
const verifyCode2 = ref('')

function presetCode() {
  verifyCode2.value = 'ABCD'
}

// 场景3：监听变化
const verifyCode3 = ref('')
const codeChangeCount = ref(0)

function onCodeChange(val: string) {
  codeChangeCount.value++
  verifyCode3.value = val
}

// 场景4：expose 方法
const verifyRef = ref<InstanceType<typeof CxImageVerify> | null>(null)
const verifyCode4 = ref('')

function refreshCode() {
  verifyRef.value?.getImgCode()
}

// 场景5：登录表单
const loginFormRef = ref<FormInstance | null>(null)
const loginVerifyRef = ref<InstanceType<typeof CxImageVerify> | null>(null)
const loginCaptchaCode = ref('')

const loginForm = reactive({
  username: '',
  password: '',
  captcha: ''
})

const loginRules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (value.toUpperCase() !== loginCaptchaCode.value.toUpperCase()) {
          callback(new Error('验证码不正确'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

async function onLogin() {
  if (!loginFormRef.value) return
  try {
    await loginFormRef.value.validate()
    ElMessage.success('登录成功！')
  } catch {
    // 校验失败，刷新验证码
    loginVerifyRef.value?.getImgCode()
    loginForm.captcha = ''
  }
}
</script>

<style scoped lang="scss">
.demo-page {
  padding: 16px;

  h3 {
    margin: 16px 0 8px;
    font-size: 15px;
    color: var(--el-text-color-primary);
  }
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.change-log {
  display: flex;
  gap: 8px;
}

.captcha-row {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
}
</style>
