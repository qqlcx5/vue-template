import type { CSSProperties, VNode, Component } from 'vue'

type DoneFn = (cancel?: boolean) => void
type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'

/** Popconfirm 配置 */
export interface PopconfirmConfig {
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

/** Dialog 基础属性 */
export interface CxDialogBaseProps {
  visible?: boolean
  title?: string
  width?: string | number
  fullscreen?: boolean
  fullscreenIcon?: boolean
  top?: string
  modal?: boolean
  modalClass?: string
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  appendToBody?: boolean
  lockScroll?: boolean
  class?: string
  style?: CSSProperties
  openDelay?: number
  closeDelay?: number
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  beforeClose?: (done: DoneFn) => void
  draggable?: boolean
  overflow?: boolean
  center?: boolean
  alignCenter?: boolean
  destroyOnClose?: boolean
  closeIcon?: string | Component
  zIndex?: number
  headerAriaLevel?: string
}

/** 按钮配置 */
export interface CxButtonProps {
  label: string
  size?: 'large' | 'default' | 'small'
  type?: ButtonType
  plain?: boolean
  text?: boolean
  bg?: boolean
  link?: boolean
  round?: boolean
  circle?: boolean
  popconfirm?: PopconfirmConfig
  loading?: boolean
  disabled?: boolean
  icon?: string | Component
  autofocus?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  color?: string
  dark?: boolean
  btnClick?: (ctx: { dialog: { options: CxDialogOptions; index: number }; button: { btn: CxButtonProps; index: number } }) => void
}

/** Dialog 选项完整配置 */
export interface CxDialogOptions extends CxDialogBaseProps {
  props?: any
  hideFooter?: boolean
  popconfirm?: PopconfirmConfig
  sureBtnLoading?: boolean
  headerRenderer?: (ctx: { close: () => void; titleId: string; titleClass: string }) => VNode | Component
  contentRenderer?: (ctx: { options: CxDialogOptions; index: number }) => VNode | Component
  footerRenderer?: (ctx: { options: CxDialogOptions; index: number }) => VNode | Component
  footerButtons?: CxButtonProps[]
  open?: (ctx: { options: CxDialogOptions; index: number }) => void
  close?: (ctx: { options: CxDialogOptions; index: number }) => void
  closeCallBack?: (ctx: { options: CxDialogOptions; index: number; args: any }) => void
  fullscreenCallBack?: (ctx: { options: CxDialogOptions; index: number }) => void
  openAutoFocus?: (ctx: { options: CxDialogOptions; index: number }) => void
  closeAutoFocus?: (ctx: { options: CxDialogOptions; index: number }) => void
  beforeCancel?: (done: () => void, ctx: { options: CxDialogOptions; index: number }) => void
  beforeSure?: (done: () => void, ctx: { options: CxDialogOptions; index: number; closeLoading: () => void }) => void
}
