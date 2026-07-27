export interface CxCropperPreviewProps {
  /** 图片源 */
  imgSrc?: string
}

export interface CxCropperPreviewEmits {
  /** 裁剪后触发 */
  (e: 'cropper', result: { base64: string; blob: Blob; info: any }): void
}
