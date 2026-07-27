export interface CxAnimateSelectorProps {
  /** 占位文本 */
  placeholder?: string
}

export interface CxAnimateSelectorEmits {
  (e: 'update:modelValue', value: string): void
}
