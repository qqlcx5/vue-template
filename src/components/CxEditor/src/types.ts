export interface CxEditorProps {
  /** 编辑器内容（v-model） */
  modelValue?: string
  /** 是否只读 */
  readonly?: boolean
  /** 占位文本 */
  placeholder?: string
  /** 编辑器高度 */
  height?: string | number
  /** 工具栏配置 */
  toolbarConfig?: Record<string, any>
  /** 编辑器模式 */
  mode?: 'default' | 'simple'
}

export interface CxEditorEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}
