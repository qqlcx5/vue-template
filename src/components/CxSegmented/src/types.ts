// ============================================================
// CXSegmented - 分段控制器类型定义
// ============================================================

import type { Component } from 'vue'

export interface SegmentedOption {
  /** 显示文字 */
  label?: string
  /** 值 */
  value?: string | number
  /** 图标组件 */
  icon?: Component
  /** 是否禁用 */
  disabled?: boolean
  /** tooltip 提示文本 */
  tip?: string
}

export interface CXSegmentedProps {
  /** 选项列表 */
  options?: SegmentedOption[]
  /** 当前选中项的索引（v-model，number 类型时响应式） */
  modelValue?: string | number
  /** 将宽度调整为父元素宽度 */
  block?: boolean
  /** 控件尺寸 */
  size?: 'small' | 'default' | 'large'
  /** 是否全局禁用 */
  disabled?: boolean
  /** 当内容发生变化时，设置 resize 可使其自适应容器位置 */
  resize?: boolean
}

export interface CXSegmentedEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', payload: { index: number; option: SegmentedOption }): void
}

export interface CXSegmentedExpose {
  /** 当前选中索引 */
  curIndex: number
}
