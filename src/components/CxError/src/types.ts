export interface CxErrorProps {
  /** 错误类型 */
  type?: '404' | '403' | '500'
  /** 自定义标题 */
  title?: string
  /** 自定义描述 */
  message?: string
  /** 错误状态图片 */
  image?: string
}

export interface CxErrorEmits {
  (e: 'error-click', type: string): void
}
