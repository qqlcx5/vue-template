// ============================================================
// CxIcon - 函数式图标渲染工具
// ============================================================
// 参考 ReIcon/hooks.ts 的 useRenderIcon，提供函数式调用入口
// 支持：mdi 图标、任意 iconify 图标、SVG 字符串、图片 URL
//
// 用法：
//   import { useRenderIcon } from '@/components/CxIcon'
//   const IconComp = useRenderIcon('mdi:home', { width: '20px' })

import { h, defineComponent, type Component } from 'vue'
import CxIcon from './CxIcon.vue'
import type { CxIconProps } from './types'

const svgReg = /^\s*<svg[\s>]/
const imgReg = /^(https?:\/\/|\/\/|data:image\/)/

/**
 * 函数式图标渲染
 * @param icon 图标名称或 SVG/URL
 * @param attrs 额外属性
 * @returns Component
 */
export function useRenderIcon(icon: any, attrs?: Partial<CxIconProps>): Component {
  // 空值
  if (!icon) {
    return defineComponent({
      name: 'CxIconEmpty',
      render: () => h('span'),
    })
  }

  // SVG 字符串
  if (typeof icon === 'string' && svgReg.test(icon)) {
    return defineComponent({
      name: 'CxIconSvg',
      render: () =>
        h(CxIcon, {
          icon,
          ...attrs,
        }),
    })
  }

  // 图片 URL
  if (typeof icon === 'string' && imgReg.test(icon)) {
    return defineComponent({
      name: 'CxIconImg',
      render: () =>
        h(CxIcon, {
          icon,
          ...attrs,
        }),
    })
  }

  // 函数组件 / 已有组件
  if (typeof icon === 'function' || typeof icon?.render === 'function') {
    return attrs ? h(icon as Component, { ...attrs } as any) : (icon as Component)
  }

  // Iconify 图标（mdi:xxx 或其他 prefix:name）
  return defineComponent({
    name: 'CxIconRender',
    render: () =>
      h(CxIcon, {
        icon,
        ...attrs,
      }),
  })
}
