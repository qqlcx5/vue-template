import type { JsBarcodeOptions } from 'jsbarcode'

/** CxBarcode Props */
export interface CxBarcodeProps {
  /** 渲染标签类型 */
  tag?: 'canvas' | 'svg' | 'img'
  /** 条形码内容 */
  text?: string
  /** jsbarcode 配置项，详见 https://github.com/lindell/JsBarcode/wiki/Options */
  options?: JsBarcodeOptions
  /**
   * 条形码格式，等同于 options.format
   * 若同时传入 type 和 options.format，以 type 为准
   */
  type?: string
}
