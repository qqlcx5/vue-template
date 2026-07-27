export interface CxInfotipProps {
  /** 提示文本 */
  content?: string
  /** 提示位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** 是否显示图标 */
  showIcon?: boolean
  /** 图标名称 */
  icon?: string
  /** 最大宽度 */
  maxWidth?: number
}

export interface CxInfotipEmits {
  (e: 'click'): void
}
