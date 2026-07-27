export interface CxImageVerifyProps {
  /** 验证码值（双向绑定） */
  code?: string
}

export interface CxImageVerifyEmits {
  (e: 'update:code', code: string): void
}
