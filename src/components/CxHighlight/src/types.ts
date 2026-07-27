export interface CxHighlightProps {
  /** 需要高亮的文本 */
  text?: string
  /** 高亮关键词列表 */
  keys?: string[]
  /** 高亮颜色 */
  color?: string
  /** 标签名（默认 span） */
  tag?: string
}

export interface CxHighlightEmits {
  (e: 'keyword-click', keyword: string): void
}
