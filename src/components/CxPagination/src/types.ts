export interface CxPaginationProps {
  /** 当前页码 */
  page?: number
  /** 每页条数 */
  limit?: number
  /** 总条数 */
  total?: number
  /** 每页条数选项 */
  pageSizes?: number[]
  /** 分页布局 */
  layout?: string
  /** 是否显示背景色 */
  background?: boolean
  /** 小型分页 */
  small?: boolean
}

export interface CxPaginationEmits {
  (e: 'update:page', value: number): void
  (e: 'update:limit', value: number): void
  (e: 'pagination', payload: { page: number; limit: number }): void
}
