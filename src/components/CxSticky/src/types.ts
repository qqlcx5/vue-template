export interface CxStickyProps {
  /** 距离顶部偏移量（px） */
  top?: number
  /** 距离底部偏移量（px） */
  bottom?: number
  /** 指定滚动容器选择器，默认 window */
  container?: string
  /** z-index */
  zIndex?: number
}

export interface CxStickyEmits {
  (e: 'change', isSticky: boolean): void
}
