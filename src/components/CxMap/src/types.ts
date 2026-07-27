export interface CxMapOptions {
  zoom?: number
  center?: [number, number]
  mapStyle?: string
  layers?: any[]
  viewMode?: '2D' | '3D'
  [key: string]: any
}

export interface CxMapProps {
  /** 高德地图 JS API Key */
  amapKey: string
  /** API 版本，默认 2.0 */
  version?: string
  /** 需要加载的插件 */
  plugins?: string[]
  /** 地图初始化配置 */
  options?: CxMapOptions
  /** 是否显示加载动画 */
  loading?: boolean
}
