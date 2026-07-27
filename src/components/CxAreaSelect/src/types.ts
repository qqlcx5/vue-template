export interface AreaOption {
  value: string | number
  label: string
  children?: AreaOption[]
}

export interface CxAreaSelectProps {
  /** 区域数据源 */
  options?: AreaOption[]
  /** 已选值（v-model） */
  modelValue?: (string | number)[]
  /** 级别数（省/市/区） */
  level?: 2 | 3
  /** 是否可搜索 */
  filterable?: boolean
  /** 占位文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否可清除 */
  clearable?: boolean
}

export interface CxAreaSelectEmits {
  (e: 'change', value: (string | number)[]): void
}
