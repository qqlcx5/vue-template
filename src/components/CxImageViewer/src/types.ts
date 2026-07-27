export interface CxImageViewerProps {
  /** 图片 URL 列表 */
  urlList?: string[]
  /** 初始预览索引 */
  initialIndex?: number
  /** 是否支持无限循环 */
  infinite?: boolean
  /** 关闭时回调模式 */
  hideOnClickModal?: boolean
  /** 是否显示切换箭头 */
  showArrows?: boolean
}

export interface CxImageViewerEmits {
  (e: 'close'): void
  (e: 'switch', index: number): void
}

/** createImageViewer 的配置参数 */
export interface ImageViewerConfig extends CxImageViewerProps {
  /** 关闭回调 */
  onClose?: () => void
}
