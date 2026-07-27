import { ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import type { CxDialogOptions } from './types'

/** 全局对话框存储 */
export const dialogStore = ref<CxDialogOptions[]>([])

/**
 * 打开弹框
 * @param options - 对话框配置
 */
export function addDialog(options: CxDialogOptions) {
  const entry = { ...options, visible: true }
  if (options?.openDelay && options.openDelay > 0) {
    useTimeoutFn(() => {
      dialogStore.value.push(entry)
      triggerOpen(options, dialogStore.value.length - 1)
    }, options.openDelay)
  } else {
    dialogStore.value.push(entry)
    triggerOpen(options, dialogStore.value.length - 1)
  }
}

function triggerOpen(options: CxDialogOptions, index: number) {
  // open callback is handled in component's @opened
}

/**
 * 关闭弹框
 * @param options - 对话框配置
 * @param index - 对话框索引
 * @param args - 关闭参数
 */
export function closeDialog(options: CxDialogOptions, index: number, args?: any) {
  const target = dialogStore.value[index]
  if (!target) return
  target.visible = false

  if (options?.closeCallBack && typeof options.closeCallBack === 'function') {
    options.closeCallBack({ options, index, args })
  }

  const closeDelay = options?.closeDelay ?? 200
  useTimeoutFn(() => {
    const idx = dialogStore.value.indexOf(target)
    if (idx !== -1) {
      dialogStore.value.splice(idx, 1)
    }
  }, closeDelay)
}

/**
 * 更新弹框属性
 * @param value - 属性值
 * @param key - 属性名，默认 'title'
 * @param index - 弹框索引，默认 0
 */
export function updateDialog(value: any, key = 'title', index = 0) {
  const target = dialogStore.value[index]
  if (target) {
    (target as any)[key] = value
  }
}

/**
 * 关闭所有弹框
 */
export function closeAllDialog() {
  dialogStore.value = []
}
