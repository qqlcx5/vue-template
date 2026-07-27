/** 选择结果 */
export interface SelectedValue {
  /** 左侧（较小值） */
  left: number
  /** 右侧（较大值） */
  right: number
  /** 完整的选中列表（含索引和值） */
  whole: Array<{ item: number; index: number }>
}

/** CxSelector 范围选择器 Props */
export interface CxSelectorProps {
  /** 组件唯一标识，同一页面多个实例时用于区分 */
  hsKey?: number | string
  /** 是否禁用 */
  disabled?: boolean
  /** 当前值（用于半选状态） */
  value?: number
  /** 可选范围值列表 */
  max?: number[]
  /** 回显数据 [startIndex, endIndex]，长度必须为 2 */
  echo?: number[]
}

/** CxSelector 范围选择器 Emits */
export interface CxSelectorEmits {
  (e: 'selectedVal', val: SelectedValue): void
}
