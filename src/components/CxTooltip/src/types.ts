export interface CxTooltipProps {
  /** 提示内容 */
  content?: string
  /** 标签文本 */
  label?: string
  /** 提示位置 */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  /** 图标名称 */
  icon?: string
  /** 图标尺寸 */
  iconSize?: number
  /** 提示主题 */
  effect?: 'dark' | 'light'
}
