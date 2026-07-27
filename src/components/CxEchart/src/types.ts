import type { EChartsOption } from 'echarts'

export interface CxEchartProps {
  /** ECharts 配置项 */
  options: EChartsOption
  /** 图表高度 */
  height?: string | number
  /** 图表宽度 */
  width?: string | number
  /** 是否自动监听主题变化并重绘 */
  watchTheme?: boolean
  /** 是否在窗口大小变化时自动 resize */
  autoResize?: boolean
}

export interface CxEchartEmits {
  (e: 'ready', instance: any): void
}
