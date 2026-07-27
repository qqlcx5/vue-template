import type Cropper from 'cropperjs'
import type { CSSProperties } from 'vue'

export interface CxCropperResult {
  /** 裁剪后图片的 Base64 */
  base64: string
  /** 裁剪后图片的 Blob */
  blob: Blob
  /** 裁剪后图片信息 */
  info: {
    size: number
    x: number
    y: number
    width: number
    height: number
    rotate: number
    scaleX: number
    scaleY: number
  }
}

export interface CxCropperProps {
  /** 图片源，必填 */
  src: string
  /** alt 属性 */
  alt?: string
  /** 圆形裁剪 */
  circled?: boolean
  /** 高度 */
  height?: string | number
  /** 是否允许实时预览裁剪结果 */
  realTimePreview?: boolean
  /** crossorigin 属性 */
  crossorigin?: '' | 'anonymous' | 'use-credentials'
  /** 图片容器自定义样式 */
  imageStyle?: CSSProperties
  /** cropperjs 额外配置 */
  options?: Cropper.Options
}

export interface CxCropperEmits {
  /** 裁剪变化时触发 */
  (e: 'cropper', result: CxCropperResult): void
  /** 裁剪初始化完成 */
  (e: 'readied', cropperInstance: Cropper): void
  /** 裁剪出错 */
  (e: 'error'): void
}
