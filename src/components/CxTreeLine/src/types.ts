import type { TreeNode, TreeData, TreeNodeData } from 'element-plus/es/components/tree-v2/src/types'

export interface CxTreeLineProps {
  /** 当前树节点 */
  node: TreeNode
  /** 当前层级数据 */
  data?: TreeNodeData
  /** 完整树数据（el-tree-v2 虚拟树必传） */
  treeData?: TreeData
  /** 缩进距离，默认 16 */
  indent?: number
  /** 是否显示标签横线 */
  showLabelLine?: boolean
}
