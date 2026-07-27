export interface CxEmptyProps {
  /** 空状态描述文本 */
  description?: string
  /** 图片尺寸 */
  imageSize?: number
}

export interface CxEmptyEmits {
  (e: 'click'): void
}
