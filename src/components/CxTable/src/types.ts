import type { TableColumnCtx } from 'element-plus'

/** 表格列配置 */
export interface TableColumn {
  /** 字段名 */
  field: string
  /** 列标题 */
  label: string
  /** 列宽度 */
  width?: string | number
  /** 最小宽度 */
  minWidth?: string | number
  /** 是否固定列 */
  fixed?: 'left' | 'right' | boolean
  /** 是否可排序 */
  sortable?: boolean | 'custom'
  /** 是否显示溢出提示 */
  showOverflowTooltip?: boolean
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 自定义格式化函数 */
  formatter?: (row: Record<string, any>, column: TableColumnCtx<any>, cellValue: any, index: number) => string
  /** 列头自定义渲染函数 */
  headerRenderer?: () => string
  /** 是否隐藏 */
  hidden?: boolean
}

export interface CxTableProps {
  /** 表格数据 */
  data?: Record<string, any>[]
  /** 列配置 */
  columns?: TableColumn[]
  /** 是否显示序号列 */
  showIndex?: boolean
  /** 序号列宽度 */
  indexWidth?: string | number
  /** 是否显示多选 */
  showSelection?: boolean
  /** 已选中的行数据 */
  selection?: Record<string, any>[]
  /** 表格高度 */
  maxHeight?: string | number
  /** 是否显示边框 */
  border?: boolean
  /** 是否斑马纹 */
  stripe?: boolean
  /** 行键名 */
  rowKey?: string
  /** 是否支持展开行 */
  expandable?: boolean
  /** 加载状态 */
  loading?: boolean
  /** 空状态描述 */
  emptyText?: string
}

export interface CxTableEmits {
  (e: 'selection-change', selection: Record<string, any>[]): void
  (e: 'row-click', row: Record<string, any>, column: any, event: Event): void
  (e: 'sort-change', sort: { prop: string; order: string }): void
}
