export interface CxUploadProps {
  /** 上传文件列表（v-model） */
  modelValue?: any[]
  /** 上传地址 */
  action?: string
  /** 接受的文件类型 */
  accept?: string
  /** 文件大小限制（MB） */
  maxSize?: number
  /** 最大上传数量 */
  maxCount?: number
  /** 是否多选 */
  multiple?: boolean
  /** 是否支持拖拽上传 */
  drag?: boolean
  /** 是否自动上传 */
  autoUpload?: boolean
  /** 自定义请求头 */
  headers?: Record<string, string>
  /** 上传按钮文本 */
  buttonText?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示文件列表 */
  showFileList?: boolean
}

export interface CxUploadEmits {
  (e: 'update:modelValue', value: any[]): void
  (e: 'success', response: any, file: any, fileList: any[]): void
  (e: 'error', error: any, file: any, fileList: any[]): void
  (e: 'exceed', files: any[], fileList: any[]): void
}
