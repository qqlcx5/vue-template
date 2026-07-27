// ============================================================
// CxIcon - 图标组件类型定义
// ============================================================

import type { CSSProperties } from 'vue'

export interface CxIconProps {
  /**
   * 图标名称，支持以下格式：
   * - MDI 图标：'mdi:home'、'mdi:account' 等
   * - 任意 Iconify 图标集：'ep:menu'、'ri:admin-line' 等
   * - SVG 字符串：'<svg>...</svg>'
   * - 图片 URL：'http://...' 或 'data:image/...'
   */
  icon: string
  /**
   * 图标宽度
   * @default '1em'
   */
  width?: string | number
  /**
   * 图标高度
   * @default '1em'
   */
  height?: string | number
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string
  /**
   * 水平翻转
   * @default false
   */
  horizontalFlip?: boolean
  /**
   * 垂直翻转
   * @default false
   */
  verticalFlip?: boolean
  /**
   * 旋转角度（deg）
   * @default 0
   */
  rotate?: number | string
  /**
   * 自定义样式
   */
  style?: CSSProperties
  /**
   * 加载中占位图标名称
   * @default 'mdi:loading'
   */
  loadingIcon?: string
  /**
   * 图标加载失败时回调
   */
  onLoad?: (name: string) => void
}

export type CxIconEmits = {
  /** 图标加载完成 */
  (e: 'load', name: string): void
  /** 图标加载失败 */
  (e: 'error', name: string, err: unknown): void
}
