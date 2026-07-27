import type { CSSProperties, VNode, Component } from 'vue'

type DoneFn = (cancel?: boolean) => void
type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'

/** Popconfirm 配置 */
export interface CxDrawerPopconfirm {
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonType?: ButtonType
  cancelButtonType?: ButtonType
  icon?: string | Component
  iconColor?: string
  hideIcon?: boolean
  hideAfter?: number
  teleported?: boolean
  persistent?: boolean
  width?: string | number
}

/** Drawer 基础属性 */
export interface CxDrawerBaseProps {
  visible?: boolean
  appendToBody?: boolean
  lockScroll?: boolean
  beforeClose?: (done: DoneFn) => void
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  openDelay?: number
  closeDelay?: number
  class?: string
  style?: CSSProperties
  destroyOnClose?: boolean
  modal?: boolean
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  resizable?: boolean
  size?: string | number
  title?: string
  withHeader?: boolean
  modalClass?: string
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  zIndex?: number
  headerAriaLevel?: string
}

/** 按钮配置 */
export interface CxDrawerButton {
  label: string
  size?: 'large' | 'default' | 'small'
  type?: ButtonType
  plain?: boolean
  text?: boolean
  bg?: boolean
  link?: boolean
  round?: boolean
  circle?: boolean
  popConfirm?: CxDrawerPopconfirm
  loading?: boolean
  disabled?: boolean
  icon?: string | Component
  autofocus?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  color?: string
  dark?: boolean
  btnClick?: (ctx: {
    drawer: { options: CxDrawerOptions; index: number }
    button: { btn: CxDrawerButton; index: number }
  }) => void
}

/** Drawer 选项 */
export interface CxDrawerOptions extends CxDrawerBaseProps {
  props?: any
  hideFooter?: boolean
  popConfirm?: CxDrawerPopconfirm
  sureBtnLoading?: boolean
  headerRenderer?: (ctx: { close: () => void; titleId: string; titleClass: string }) => VNode | Component
  contentRenderer?: (ctx: { options: CxDrawerOptions; index: number }) => VNode | Component
  footerRenderer?: (ctx: { options: CxDrawerOptions; index: number }) => VNode | Component
  footerButtons?: CxDrawerButton[]
  open?: (ctx: { options: CxDrawerOptions; index: number }) => void
  close?: (ctx: { options: CxDrawerOptions; index: number }) => void
  closeCallBack?: (ctx: { options: CxDrawerOptions; index: number; args: any }) => void
  openAutoFocus?: (ctx: { options: CxDrawerOptions; index: number }) => void
  closeAutoFocus?: (ctx: { options: CxDrawerOptions; index: number }) => void
  beforeCancel?: (done: () => void, ctx: { options: CxDrawerOptions; index: number }) => void
  beforeSure?: (done: () => void, ctx: { options: CxDrawerOptions; index: number; closeLoading: () => void }) => void
}
