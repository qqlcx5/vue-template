export interface TreeNode {
  /** 节点 ID */
  id: string | number
  /** 节点标签 */
  label: string
  /** 子节点 */
  children?: TreeNode[]
  /** 是否禁用 */
  disabled?: boolean
  /** 是否为叶子节点 */
  leaf?: boolean
  [key: string]: any
}

export interface CxTreeProps {
  /** 树数据 */
  data?: TreeNode[]
  /** 已选中节点（v-model） */
  modelValue?: (string | number)[]
  /** 是否显示复选框 */
  showCheckbox?: boolean
  /** 是否可搜索过滤 */
  filterable?: boolean
  /** 搜索占位文本 */
  filterPlaceholder?: string
  /** 默认展开层级 */
  defaultExpandLevel?: number
  /** 节点键名 */
  nodeKey?: string
  /** 是否高亮当前选中 */
  highlightCurrent?: boolean
  /** 是否展开时选中父节点 */
  checkStrictly?: boolean
}

export interface CxTreeEmits {
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'node-click', node: TreeNode): void
  (e: 'node-contextmenu', event: Event, node: TreeNode): void
}
