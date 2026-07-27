export interface CxContentDetailWrapProps {
  /** 页面标题 */
  title?: string
  /** 是否显示返回按钮 */
  showBack?: boolean
  /** 返回按钮文本 */
  backText?: string
  /** 内容区域 class */
  contentClass?: string
}

export interface CxContentDetailWrapEmits {
  (e: 'back'): void
}
