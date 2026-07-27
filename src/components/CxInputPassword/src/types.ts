export interface CxInputPasswordProps {
  /** 密码值（支持 v-model） */
  modelValue?: string
  /** 占位文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示密码强度检测 */
  showStrength?: boolean
  /** 最小密码长度 */
  minLength?: number
  /** 输入框宽度 */
  width?: string
}

export interface CxInputPasswordEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}
