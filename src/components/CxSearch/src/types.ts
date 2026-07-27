/** 搜索表单字段配置 */
export interface SearchSchemaItem {
  /** 字段名 */
  field: string
  /** 标签 */
  label: string
  /** 组件名 */
  component: string
  /** 组件 props */
  componentProps?: Record<string, any>
  /** 是否显示 */
  show?: boolean
}

export interface CxSearchProps {
  /** 搜索字段配置 */
  schema?: SearchSchemaItem[]
  /** 搜索表单数据（v-model） */
  modelValue?: Record<string, any>
  /** 布局模式 */
  layout?: 'inline' | 'bottom'
  /** 显示折叠的阈值（inline模式下，超过该数量的字段折叠） */
  collapseThreshold?: number
  /** 查询按钮文本 */
  searchText?: string
  /** 重置按钮文本 */
  resetText?: string
}

export interface CxSearchEmits {
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'search', value: Record<string, any>): void
  (e: 'reset', value: Record<string, any>): void
}
