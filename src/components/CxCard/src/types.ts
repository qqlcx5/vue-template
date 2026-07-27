export interface CxCardProps {
  /** 卡片标题 */
  title?: string
  /** 是否显示阴影 */
  shadow?: 'always' | 'hover' | 'never'
  /** 内容内边距 */
  padding?: string | number
  /** 自定义 body class */
  bodyClass?: string
  /** 自定义 body style */
  bodyStyle?: Record<string, any>
}

export interface CxCardEmits {
  (e: 'click'): void
}
