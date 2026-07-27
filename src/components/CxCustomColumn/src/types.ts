export interface CxCustomColumnProps {
  /** 列配置 */
  columns?: { field: string; label: string; visible: boolean; fixed?: boolean }[]
  /** 确认回调 */
  onConfirm?: (columns: { field: string; label: string; visible: boolean; fixed?: boolean }[]) => void
}

export interface CxCustomColumnEmits {
  (e: 'confirm', columns: { field: string; label: string; visible: boolean; fixed?: boolean }[]): void
}
