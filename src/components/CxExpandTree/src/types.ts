export interface TreeNodeData {
  [key: string]: any
  children?: TreeNodeData[]
}

export interface CxExpandTreeProps {
  /** 树形数据 */
  data?: TreeNodeData[]
  /** 已展开节点（v-model） */
  modelValue?: (string | number)[]
  /** 节点键名 */
  nodeKey?: string
  /** 默认展开层级 */
  defaultExpandLevel?: number
  /** 是否可勾选 */
  showCheckbox?: boolean
  /** 是否严格模式（父子不关联） */
  checkStrictly?: boolean
  /** 选中的节点 */
  checkedKeys?: (string | number)[]
}

export interface CxExpandTreeEmits {
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'node-click', node: any): void
  (e: 'update:checkedKeys', value: (string | number)[]): void
}
