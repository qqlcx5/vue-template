import { createVNode, render } from 'vue'
import CxImageViewer from './CxImageViewer.vue'
import type { ImageViewerConfig } from './types'

let instance: VNode | null = null
let container: HTMLElement | null = null

/**
 * 程序化调用图片预览
 * @example createImageViewer({ urlList: ['https://...', 'https://...'] })
 */
export function createImageViewer(config: ImageViewerConfig): void {
  destroy()

  container = document.createElement('div')
  document.body.appendChild(container)

  instance = createVNode(CxImageViewer, {
    ...config,
    onClose: () => {
      config.onClose?.()
      destroy()
    },
  })

  render(instance, container)
}

function destroy() {
  if (instance && container) {
    render(null, container)
    document.body.removeChild(container)
    instance = null
    container = null
  }
}
