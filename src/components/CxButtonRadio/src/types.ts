export interface CxButtonRadioOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface CxButtonRadioProps {
  /** 选项列表 */
  options?: CxButtonRadioOption[]
  /** 按钮尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 是否禁用 */
  disabled?: boolean
}

export interface CxButtonRadioEmits {
  (e: 'change', value: string | number): void
}
