// ============================================================
// CXSplitPane - 分割面板类型定义
// ============================================================

/** 分割方向 */
export type SplitDirection = 'vertical' | 'horizontal'

/** Props */
export interface CXSplitPaneProps {
  /** 分割方向：vertical 左右分割 / horizontal 上下分割 */
  split?: SplitDirection
  /** 左侧/上方面板的初始百分比 */
  defaultPercent?: number
  /** 最小百分比限制（左右面板各有此限制） */
  minPercent?: number
  /** 是否禁用拖拽调整 */
  disabled?: boolean
}

/** Emits */
export interface CXSplitPaneEmits {
  (e: 'resize', percent: number): void
}

/** 暴露的方法 */
export interface CXSplitPaneExpose {
  /** 重置为默认百分比 */
  reset: () => void
  /** 设置面板百分比 */
  setPercent: (percent: number) => void
  /** 当前百分比 */
  percent: number
}
