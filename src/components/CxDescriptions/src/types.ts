/** 描述列表单个字段配置 */
export interface DescriptionItem {
  /** 字段标签 */
  label: string
  /** 字段键名 */
  field: string
  /** 列跨度 */
  span?: number
  /** 自定义渲染函数，参数为当前行数据 */
  render?: (data: Record<string, any>) => string
  /** 日期格式化字符串（dayjs format） */
  dateFormat?: string
  /** 字典映射表，key=字典值, value=显示文本 */
  dictMap?: Record<string | number, string>
  /** 字典标签颜色映射 */
  dictColorMap?: Record<string | number, string>
  /** 是否显示为标签 */
  showTag?: boolean
}

/** 描述列表分组配置 */
export interface DescriptionGroup {
  /** 分组标题 */
  title?: string
  /** 该组下的字段配置 */
  items: DescriptionItem[]
}

export interface CxDescriptionsProps {
  /** 数据对象 */
  data?: Record<string, any>
  /** 字段配置列表（简单模式） */
  schema?: DescriptionItem[]
  /** 分组配置列表（分组模式，优先级高于 schema） */
  groups?: DescriptionGroup[]
  /** 每行显示列数 */
  column?: number
  /** 尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 是否带边框 */
  border?: boolean
  /** 是否显示折叠按钮 */
  collapsible?: boolean
  /** 默认折叠状态 */
  defaultCollapsed?: boolean
  /** 标签宽度 */
  labelWidth?: string | number
}

export interface CxDescriptionsEmits {
  (e: 'update:collapsed', value: boolean): void
}
