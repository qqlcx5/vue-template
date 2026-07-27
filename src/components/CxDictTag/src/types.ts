/** 字典选项 */
export interface DictOption {
  /** 字典值 */
  value: string | number
  /** 显示标签 */
  label: string
  /** 标签颜色 */
  color?: string
}

export interface CxDictTagProps {
  /** 字典数据源 */
  dictData: DictOption[]
  /** 当前值 */
  value?: string | number | Array<string | number>
  /** 标签尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 标签效果 */
  effect?: 'dark' | 'light' | 'plain'
  /** 是否可关闭 */
  closable?: boolean
  /** 最大显示数量（超出折叠） */
  max?: number
  /** 分隔符（多值模式下使用） */
  separator?: string
}

export interface CxDictTagEmits {
  (e: 'close', value: string | number): void
}
