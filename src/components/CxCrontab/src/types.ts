export interface CxCrontabProps {
  /** cron 表达式（v-model） */
  modelValue?: string
  /** 是否隐藏秒 */
  hideSecond?: boolean
  /** 是否隐藏年 */
  hideYear?: boolean
  /** 是否隐藏周 */
  hideWeek?: boolean
}

export interface CxCrontabEmits {
  (e: 'update:modelValue', value: string): void
}
