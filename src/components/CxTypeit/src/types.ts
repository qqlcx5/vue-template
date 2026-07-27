import type { Options as TypeItOptions } from 'typeit'

export type { TypeItOptions }

export interface CxTypeitProps {
  /** TypeIt 配置项，详情见 https://www.typeitjs.com/docs/vanilla/usage#options */
  options?: TypeItOptions
}
