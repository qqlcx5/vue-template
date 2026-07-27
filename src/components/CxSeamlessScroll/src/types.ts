import type { CSSProperties } from 'vue'

/** 滚动方向 */
export type ScrollDirection = 'top' | 'bottom' | 'left' | 'right'

/** 无缝滚动配置项 */
export interface SeamlessScrollOption {
  /** 步长，默认 1 */
  step?: number
  /** 启动无缝滚动最小数据数，默认 5 */
  limitMoveNum?: number
  /** 是否启用鼠标 hover 控制，默认 true */
  hoverStop?: boolean
  /** 滚动方向，默认 top */
  direction?: ScrollDirection
  /** 开启移动端 touch，默认 true */
  openTouch?: boolean
  /** 单条数据高度（有值时 hoverStop 关闭） */
  singleHeight?: number
  /** 单条数据宽度（有值时 hoverStop 关闭） */
  singleWidth?: number
  /** 单步停止等待时间（ms），默认 1000 */
  waitTime?: number
  /** 左右切换按钮偏移量 */
  switchOffset?: number
  /** 是否自动播放，默认 true */
  autoPlay?: boolean
  /** 是否显示左右切换按钮 */
  navigation?: boolean
  /** 单步切换距离 */
  switchSingleStep?: number
  /** 切换动画延迟 */
  switchDelay?: number
  /** 禁用按钮 class */
  switchDisabledClass?: string
  /** singleWidth/singleHeight 是否开启 rem 度量 */
  isSingleRemUnit?: boolean
}

/** CxSeamlessScroll Props */
export interface CxSeamlessScrollProps {
  /** 滚动数据（用于判断是否达到最小数据量） */
  data?: unknown[]
  /** 配置选项 */
  classOption?: Partial<SeamlessScrollOption>
}

/** CxSeamlessScroll Emits */
export interface CxSeamlessScrollEmits {
  (e: 'scrollEnd'): void
}
