/** CxAuth 权限控制组件 Props */
export interface CxAuthProps {
  /**
   * 权限标识，可以是单个字符串或字符串数组
   * 数组时需全部满足才渲染
   */
  value?: string | string[]
}
