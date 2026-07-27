export interface CxFlickerProps {
  /** 宽度 */
  width?: string
  /** 高度 */
  height?: string
  /** 圆角：0 为方形，50% 或不传为圆形 */
  borderRadius?: number | string
  /** 闪烁颜色 */
  background?: string
  /** 闪烁范围，默认 2，值越大闪烁范围越大（pulse 模式） */
  scale?: number | string
  /** 闪烁模式：pulse-脉冲扩散 / blink-明暗闪烁 / glow-霓虹光晕 */
  mode?: 'pulse' | 'blink' | 'glow'
}
