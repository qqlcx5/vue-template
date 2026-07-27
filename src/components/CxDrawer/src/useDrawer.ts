import { ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import type { CxDrawerOptions } from './types'

export const drawerStore = ref<CxDrawerOptions[]>([])

export function addDrawer(options: CxDrawerOptions) {
  const entry = { ...options, visible: true }
  if (options?.openDelay && options.openDelay > 0) {
    useTimeoutFn(() => drawerStore.value.push(entry), options.openDelay)
  } else {
    drawerStore.value.push(entry)
  }
}

export function closeDrawer(options: CxDrawerOptions, index: number, args?: any) {
  const target = drawerStore.value[index]
  if (!target) return
  target.visible = false

  if (options?.closeCallBack && typeof options.closeCallBack === 'function') {
    options.closeCallBack({ options, index, args })
  }

  const closeDelay = options?.closeDelay ?? 200
  useTimeoutFn(() => {
    const idx = drawerStore.value.indexOf(target)
    if (idx !== -1) drawerStore.value.splice(idx, 1)
  }, closeDelay)
}

export function updateDrawer(value: any, key = 'title', index = 0) {
  const target = drawerStore.value[index]
  if (target) (target as any)[key] = value
}

export function closeAllDrawer() {
  drawerStore.value = []
}
