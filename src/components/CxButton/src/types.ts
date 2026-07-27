export interface CxButtonProps {
  /**
   * 按钮类型
   * @default 'default'
   */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  /**
   * 按钮尺寸
   * @default 'default'
   */
  size?: 'large' | 'default' | 'small'
  /** 是否加载中 */
  loading?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 前置图标名称（CxIcon 组件图标名） */
  preIcon?: string
  /** 后置图标名称（CxIcon 组件图标名） */
  postIcon?: string
  /** 图标尺寸 */
  iconSize?: number
  /** 是否圆形按钮 */
  circle?: boolean
  /** 是否圆角按钮 */
  round?: boolean
  /** 是否朴素按钮 */
  plain?: boolean
  /** 原生 type 属性 */
  nativeType?: 'button' | 'submit' | 'reset'
}

export interface CxButtonEmits {
  (e: 'click', event: MouseEvent): void
}
