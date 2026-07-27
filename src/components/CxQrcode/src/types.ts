import type { QRCodeRenderersOptions } from 'qrcode'

/** Logo 配置 */
export interface QrcodeLogo {
  /** Logo 图片地址 */
  src?: string
  /** Logo 大小比例（相对二维码宽度），默认 0.15 */
  logoSize?: number
  /** Logo 背景色 */
  bgColor?: string
  /** Logo 边框大小比例 */
  borderSize?: number
  /** 跨域属性 */
  crossOrigin?: string
  /** Logo 背景圆角 */
  borderRadius?: number
  /** Logo 自身圆角 */
  logoRadius?: number
}

/** CxQrcode Props */
export interface CxQrcodeProps {
  /** 渲染标签类型：canvas 支持 logo 嵌套，img 不支持 */
  tag?: 'canvas' | 'img'
  /** 二维码内容 */
  text?: string | Record<string, any>[]
  /** qrcode.js 配置项 */
  options?: QRCodeRenderersOptions
  /** 二维码宽度（px） */
  width?: number
  /** Logo 配置，传字符串作为 src */
  logo?: string | Partial<QrcodeLogo>
  /** 是否禁用（过期遮罩） */
  disabled?: boolean
  /** 禁用时提示文字 */
  disabledText?: string
}

/** CxQrcode Emits */
export interface CxQrcodeEmits {
  (e: 'done', url: string): void
  (e: 'click'): void
  (e: 'disabled-click'): void
}
