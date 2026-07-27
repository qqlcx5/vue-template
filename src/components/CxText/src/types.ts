// ============================================================
// CXText - 文本省略/展开类型定义
// ============================================================

import type { ElTooltipProps } from 'element-plus'

export interface CXTextProps {
  /**
   * 行数限制，不传则为单行省略
   * 传入数字时为多行省略
   */
  lineClamp?: string | number
  /**
   * el-tooltip 的额外 props
   * 默认 tooltip 仅在文本溢出时触发
   */
  tooltipProps?: Partial<ElTooltipProps>
}
