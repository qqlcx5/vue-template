/** 缓动函数类型 */
export type EasingFn = (t: number, b: number, c: number, d: number) => number

/** CxCountTo Props（普通数字动画） */
export interface CxCountToProps {
  /** 起始值 */
  startVal?: number
  /** 结束值 */
  endVal?: number
  /** 动画持续时间（ms） */
  duration?: number
  /** 是否自动播放 */
  autoplay?: boolean
  /** 小数位数 */
  decimals?: number
  /** 数字颜色 */
  color?: string
  /** 字体大小 */
  fontSize?: string
  /** 小数点符号 */
  decimal?: string
  /** 千分位分隔符 */
  separator?: string
  /** 前缀 */
  prefix?: string
  /** 后缀 */
  suffix?: string
  /** 是否使用缓动函数 */
  useEasing?: boolean
  /** 自定义缓动函数 */
  easingFn?: EasingFn
}

/** CxCountTo Emits */
export interface CxCountToEmits {
  (e: 'mounted'): void
  (e: 'callback'): void
}

/** CxCountToRebound Props（回弹式数字动画） */
export interface CxCountToReboundProps {
  /** 动画延迟（s） */
  delay?: number
  /** 模糊度 */
  blur?: number
  /** 目标数字（0-9 的整数） */
  i?: number
}
