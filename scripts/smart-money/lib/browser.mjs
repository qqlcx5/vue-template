/**
 * 浏览器公共能力：持久化上下文（复用登录态 + 稳定指纹）、反自动化检测、网络响应采集。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const ROOT = path.resolve(__dirname, '../../..')
export const CACHE_DIR = path.join(ROOT, '.cache/smart-money')
export const PROFILE_DIR = path.join(CACHE_DIR, 'chrome-profile')
export const STATE_FILE = path.join(CACHE_DIR, 'binance-state.json')
export const RAW_DIR = path.join(CACHE_DIR, 'raw')
export const DATA_DIR = path.join(ROOT, 'data/smart-money')

export const BASE = 'https://www.binance.com'
/** 我的订阅（需要登录） */
export const SUBSCRIPTIONS_URL = `${BASE}/zh-CN/smart-money/my-subscriptions`
/** 聪明钱广场 */
export const SQUARE_URL = `${BASE}/zh-CN/smart-money`

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

/** 隐藏 webdriver 等自动化痕迹，降低被识别概率 */
const STEALTH = () => {
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
  Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN', 'zh', 'en'] })
  Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] })
  if (!window.chrome) window.chrome = { runtime: {} }
  const originalQuery = window.navigator.permissions?.query
  if (originalQuery) {
    window.navigator.permissions.query = (parameters) =>
      parameters?.name === 'notifications'
        ? Promise.resolve({ state: Notification.permission })
        : originalQuery(parameters)
  }
}

/**
 * 启动持久化上下文。第一次跑需要人工登录，之后自动复用。
 */
export async function launchBrowser({ headless = false, slowMo = 0 } = {}) {
  ensureDir(PROFILE_DIR)

  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome', // 用系统已安装的 Chrome，指纹更真实
    headless,
    slowMo,
    viewport: { width: 1440, height: 900 },
    locale: 'zh-CN',
    timezoneId: 'Asia/Shanghai',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-infobars',
      '--no-first-run',
      '--no-default-browser-check',
    ],
    ignoreDefaultArgs: ['--enable-automation'],
  })

  await context.addInitScript(STEALTH)
  return context
}

/** 导出登录态（cookies + localStorage），便于排查与备份 */
export async function saveState(context) {
  ensureDir(CACHE_DIR)
  await context.storageState({ path: STATE_FILE })
  return STATE_FILE
}

export async function isLoggedIn(page) {
  // 未登录时会被打回登录页
  return !page.url().includes('/login')
}

/**
 * 采集页面产生的 XHR/Fetch JSON 响应。
 * 币安聪明钱是纯前端渲染，数据全部来自 /bapi/* 接口，拦接口比解析 DOM 稳定得多。
 */
export function createCollector(page, { filter = '/bapi/' } = {}) {
  const hits = new Map()

  page.on('response', async (res) => {
    const url = res.url()
    if (!url.includes(filter)) return
    const type = res.headers()['content-type'] || ''
    if (!type.includes('json')) return
    try {
      if (res.status() >= 400) return
      const json = await res.json()
      const key = url.split('?')[0]
      hits.set(key, { url, json, at: Date.now() })
    } catch {
      /* 非 JSON / 已销毁，忽略 */
    }
  })

  return {
    hits,
    /** 找出 path 包含关键字的接口 */
    find(keyword) {
      return [...hits.values()].filter((h) => h.url.toLowerCase().includes(keyword.toLowerCase()))
    },
    list() {
      return [...hits.values()]
    },
    /** 落盘到 .cache/smart-money/raw，便于离线分析 */
    dump(tag = 'dump') {
      const dir = ensureDir(path.join(RAW_DIR, tag))
      const files = []
      for (const hit of hits.values()) {
        const name = hit.url.split('?')[0].split('/').slice(3).join('_').replace(/[^\w.-]/g, '_')
        const file = path.join(dir, `${name.slice(0, 120)}.json`)
        fs.writeFileSync(file, JSON.stringify({ url: hit.url, body: hit.json }, null, 2))
        files.push(file)
      }
      return { dir, files }
    },
  }
}

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

/** 写 JSON 数据到 data/smart-money */
export function writeData(name, data) {
  ensureDir(DATA_DIR)
  const file = path.join(DATA_DIR, name)
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)
  return file
}
