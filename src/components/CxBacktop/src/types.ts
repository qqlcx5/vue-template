export interface CxBacktopProps {
  /** 显示按钮的滚动高度 */
  visibilityHeight?: number
  /** 滚动目标容器选择器，默认 window */
  target?: string
  /** 距离右侧偏移 */
  right?: number
  /** 距离底部偏移 */
  bottom?: number
}

export interface CxBacktopEmits {
  (e: 'click'): void
}
