export interface CxConfigGlobalProps {
  /** Element Plus 组件尺寸 */
  size?: 'large' | 'default' | 'small'
  /** Element Plus z-index */
  zIndex?: number
  /** 语言 */
  locale?: any
}

export interface CxConfigGlobalEmits {
  (e: 'ready'): void
}
