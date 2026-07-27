/** 级联选项 */
export interface CascaderOption {
  value: string | number
  label: string
  children?: CascaderOption[]
  disabled?: boolean
  leaf?: boolean
}

export interface CxCascaderProps {
  /** 级联数据 */
  options?: CascaderOption[]
  /** 已选值（v-model） */
  modelValue?: (string | number)[] | string | number
  /** 是否多选 */
  multiple?: boolean
  /** 是否可搜索 */
  filterable?: boolean
  /** 占位文本 */
  placeholder?: string
  /** 是否可清除 */
  clearable?: boolean
  /** 是否显示全路径 */
  showAllLevels?: boolean
  /** 是否自动在顶部插入"全部"选项 */
  allChecked?: boolean
  /** "全部"选项的标签 */
  allCheckedLabel?: string
  /** 多选时是否折叠标签 */
  collapseTags?: boolean
  /** 最大标签数 */
  maxCollapseTags?: number
  /** 校验是否任一子节点均可选 */
  checkStrictly?: boolean
  /** 分隔符 */
  separator?: string
  /** 是否禁用 */
  disabled?: boolean
  /** API 获取数据的函数 */
  lazyLoad?: (node: any, resolve: (data: CascaderOption[]) => void) => void
}

export interface CxCascaderEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
}
