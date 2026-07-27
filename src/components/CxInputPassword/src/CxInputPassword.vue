<template>
  <div class="cx-input-password" :style="{ width: width }">
    <el-input
      :model-value="modelValue"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="placeholder"
      :disabled="disabled"
      class="cx-input-password__input"
      @update:model-value="handleInput"
      @blur="handleBlur"
    >
      <template #suffix>
        <el-icon
          class="cx-input-password__toggle"
          @click="toggleShow"
        >
          <component :is="showPassword ? 'View' : 'Hide'" />
        </el-icon>
      </template>
    </el-input>
    <div v-if="showStrength && modelValue" class="cx-input-password__strength">
      <div class="cx-input-password__strength-bar">
        <div
          class="cx-input-password__strength-fill"
          :class="strengthClass"
          :style="{ width: strengthPercent + '%' }"
        />
      </div>
      <span class="cx-input-password__strength-text" :class="strengthClass">{{ strengthLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CxInputPasswordProps, CxInputPasswordEmits } from './types'

defineOptions({ name: 'CxInputPassword' })

const props = withDefaults(defineProps<CxInputPasswordProps>(), {
  modelValue: '',
  placeholder: '请输入密码',
  disabled: false,
  showStrength: true,
  minLength: 6,
  width: '100%',
})

const emit = defineEmits<CxInputPasswordEmits>()

const showPassword = ref(false)

function toggleShow() {
  showPassword.value = !showPassword.value
}

function handleInput(value: string) {
  emit('update:modelValue', value)
}

function handleBlur() {
  emit('change', props.modelValue ?? '')
}

const strengthScore = computed(() => {
  const val = props.modelValue ?? ''
  if (!val) return 0
  let score = 0
  if (val.length >= props.minLength) score += 1
  if (val.length >= 10) score += 1
  if (/[a-z]/.test(val) && /[A-Z]/.test(val)) score += 1
  if (/\d/.test(val)) score += 1
  if (/[^a-zA-Z0-9]/.test(val)) score += 1
  return Math.min(score, 5)
})

const strengthPercent = computed(() => (strengthScore.value / 5) * 100)

const strengthClass = computed(() => {
  if (strengthScore.value <= 1) return 'cx-input-password__strength--weak'
  if (strengthScore.value <= 3) return 'cx-input-password__strength--medium'
  return 'cx-input-password__strength--strong'
})

const strengthLabel = computed(() => {
  if (strengthScore.value <= 1) return '弱'
  if (strengthScore.value <= 3) return '中'
  return '强'
})
</script>

<style scoped lang="scss">
.cx-input-password {
  &__input {
    width: 100%;
  }

  &__toggle {
    cursor: pointer;
    color: #c0c4cc;
    font-size: 16px;

    &:hover {
      color: #606266;
    }
  }

  &__strength {
    margin-top: 8px;
  }

  &__strength-bar {
    height: 4px;
    background: #ebeef5;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 4px;
  }

  &__strength-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s ease, background-color 0.3s ease;
  }

  &__strength-text {
    font-size: 12px;
  }

  &__strength--weak {
    .cx-input-password__strength-fill {
      background-color: #f56c6c;
    }
    &.cx-input-password__strength-text {
      color: #f56c6c;
    }
  }

  &__strength--medium {
    .cx-input-password__strength-fill {
      background-color: #e6a23c;
    }
    &.cx-input-password__strength-text {
      color: #e6a23c;
    }
  }

  &__strength--strong {
    .cx-input-password__strength-fill {
      background-color: #67c23a;
    }
    &.cx-input-password__strength-text {
      color: #67c23a;
    }
  }
}
</style>
