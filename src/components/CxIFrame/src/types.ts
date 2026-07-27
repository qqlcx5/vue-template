export interface CxIFrameProps {
  /** iframe 地址 */
  src?: string
  /** 高度 */
  height?: string | number
  /** 宽度 */
  width?: string | number
  /** 是否显示边框 */
  frameborder?: number
  /** 是否允许全屏 */
  allowFullscreen?: boolean
  /** 加载完成回调 */
  onLoad?: () => void
}
