// ============================================================
// CxIcon - 动态图标加载 hook (addIcon 子集版)
// ============================================================
// 通过 @iconify/vue 的 offline API 实现按需加载
// 支持 @iconify-json/mdi 以及其他已安装的 @iconify-json/* 图标集
//
// 关键设计：
//   - production 构建：由 vite-plugin-cx-icon-scan 在 build 时把占位行替换为
//     `import 'virtual:cx-icon-used-mdi'`（触发子集 addIcon 预注册，1 个聚合 chunk ≈ 8KB）
//   - dev 模式 + 漏扫的图标：兜底走 addCollection() 加载整集（开发体验优先）
//   - 未注册的图标：useIconLoad 走 fallback slot（不联网）

import { ref, shallowRef, watch, type Ref } from 'vue'
import { addCollection } from '@iconify/vue/dist/offline'
import { iconLoaded } from '@iconify/vue'

// cx-icon-scan-placeholder: 此行由 vite-plugin-cx-icon-scan 在 production build 时
// 替换为 `import 'virtual:cx-icon-used-mdi'` 等虚拟模块的 side-effect import
// dev 模式下保留原状无副作用

/** 已加载的图标集缓存（仅用于 dev 整集兜底） */
const loadedSets = new Set<string>()

/**
 * 使用 import.meta.glob 预扫描所有已安装的 @iconify-json/* 图标集
 * Vite 会在构建时解析这些路径，运行时按需 lazy import
 */
const iconSetModules = import.meta.glob('/node_modules/@iconify-json/*/icons.json')

/** 兜底：手动导入已知的图标集（确保 Vite 3 兼容） */
const staticSets: Record<string, () => Promise<any>> = {
  mdi: () => import('@iconify-json/mdi/icons.json'),
}

/** 已知图标集前缀 -> 包名映射（用于快速查找） */
const knownPrefixes = new Map<string, string>()

for (const [p] of Object.entries(iconSetModules)) {
  const match = p.match(/@iconify-json\/([^/]+)\/icons\.json$/)
  if (match) {
    knownPrefixes.set(match[1], p)
  }
}

for (const prefix of Object.keys(staticSets)) {
  if (!knownPrefixes.has(prefix)) {
    knownPrefixes.set(prefix, `__static__:${prefix}`)
  }
}

/** 兜底映射：手动补充常见图标集 */
const fallbackMap: Record<string, string> = {
  'simple-icons': 'simple-icons',
  simpleicons: 'simple-icons',
  'fa-solid': 'fa-solid',
  'fa-regular': 'fa-regular',
  'fa-brands': 'fa-brands',
}

export function parseIconName(icon: string): { prefix: string; name: string } {
  const idx = icon.indexOf(':')
  if (idx === -1) {
    return { prefix: 'mdi', name: icon }
  }
  return {
    prefix: icon.slice(0, idx),
    name: icon.slice(idx + 1),
  }
}

function getSetPath(prefix: string): string | null {
  if (knownPrefixes.has(prefix)) return knownPrefixes.get(prefix)!
  const alias = fallbackMap[prefix]
  if (alias && knownPrefixes.has(alias)) return knownPrefixes.get(alias)!
  return null
}

function getSetLoader(prefix: string): (() => Promise<any>) | null {
  if (staticSets[prefix]) return staticSets[prefix]
  const setPath = getSetPath(prefix)
  if (!setPath || setPath.startsWith('__static__')) return null
  return iconSetModules[setPath] || null
}

/**
 * 获取图标集中所有图标名称列表（含别名）
 */
export async function getIconNames(prefix: string): Promise<string[]> {
  const loader = getSetLoader(prefix)
  if (!loader) return []
  const mod = await loader()
  const data = (mod as any)?.default ?? mod
  return [
    ...Object.keys(data?.icons || {}),
    ...(data?.aliases ? Object.keys(data.aliases) : []),
  ].sort()
}

/**
 * 检查某个图标集是否已安装
 */
export function isIconSetAvailable(prefix: string): boolean {
  return getSetPath(prefix) !== null
}

/**
 * 动态加载某个图标集的全部图标到离线存储
 * 仅作为 dev 模式 / 漏扫图标的兜底，production 推荐依赖子集预注册
 */
export async function loadIconSet(prefix: string): Promise<boolean> {
  if (loadedSets.has(prefix)) return true

  const loader = getSetLoader(prefix)
  if (!loader) {
    console.warn(`[CxIcon] 未找到图标集 "${prefix}"，请确认已安装 @iconify-json/${prefix}`)
    return false
  }

  try {
    const mod = await loader()
    const data = (mod as any)?.default ?? mod
    if (!data?.icons) {
      console.warn(`[CxIcon] 图标集 "${prefix}" 无 icons 字段`)
      return false
    }
    addCollection(data)
    loadedSets.add(prefix)
    return true
  } catch (err) {
    console.warn(`[CxIcon] 加载图标集 "${prefix}" 失败:`, err)
    return false
  }
}

/**
 * 确保单个图标可用
 * 优先级：
 *   1. iconLoaded() === true   → 已在离线存储（子集预注册或之前 addCollection 过）
 *   2. 整集 addCollection 兜底 → dev 模式 / 漏扫的图标
 *   3. 仍找不到              → 返回 false，调用方应渲染 fallback slot
 */
export async function ensureIcon(icon: string): Promise<boolean> {
  if (iconLoaded(icon)) return true
  const { prefix } = parseIconName(icon)
  await loadIconSet(prefix)
  return iconLoaded(icon)
}

export interface UseIconOptions {
  icon: Ref<string>
  onLoad?: (name: string) => void
  onError?: (name: string, err: unknown) => void
}

/**
 * 图标加载 hook
 * 根据 icon 名称动态加载对应图标集，返回就绪状态
 */
export function useIconLoad(options: UseIconOptions) {
  const { icon, onLoad, onError } = options
  const ready = ref(iconLoaded(icon.value))
  const loading = ref(false)
  const error = shallowRef<unknown>(null)

  async function load(name: string) {
    if (!name) {
      ready.value = false
      return
    }
    if (iconLoaded(name)) {
      ready.value = true
      error.value = null
      onLoad?.(name)
      return
    }
    loading.value = true
    error.value = null
    try {
      await ensureIcon(name)
      ready.value = iconLoaded(name)
      if (ready.value) {
        onLoad?.(name)
      } else {
        const err = new Error(`Icon "${name}" not found`)
        error.value = err
        console.warn(`[CxIcon] 图标 "${name}" 未注册且未安装，将渲染 fallback slot`)
        onError?.(name, err)
      }
    } catch (err) {
      error.value = err
      onError?.(name, err)
    } finally {
      loading.value = false
    }
  }

  watch(
    () => icon.value,
    (val) => load(val),
    { immediate: true },
  )

  return { ready, loading, error }
}