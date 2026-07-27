export interface CxLeftSelectTreeProps {
  /** 树形数据 */
  data?: any[]
  /** 树节点属性配置 */
  treeProps?: {
    children?: string
    label?: string
    value?: string
  }
  /** 当前选中节点（v-model） */
  modelValue?: any
  /** 占位文本 */
  placeholder?: string
  /** 是否可搜索 */
  filterable?: boolean
  /** 面板宽度 */
  panelWidth?: string | number
  /** 节点宽度 */
  nodeWidth?: string | number
}

export interface CxLeftSelectTreeEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
}
