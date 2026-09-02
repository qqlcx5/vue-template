/**
 * 币安聪明钱「我的订阅」抓取脚本（基于 ego-browser 运行时）
 *
 * 用法（项目根目录执行）：
 *   sh scripts/run-fetch-smart-money.sh
 *   或 pnpm scrape:smart-money
 * （也可直接: ego-browser nodejs < scripts/fetch-smart-money.mjs，
 *   但 ego 运行时 cwd 为 /，需先设 globalThis.__PROJECT_ROOT__）
 *
 * 原理：
 *   1. 打开 my-subscriptions 页面（复用 ego 浏览器登录态）；
 *   2. 通过 CDP 注入 fetch 捕获补丁，「搭车」读取页面应用自己发出的
 *      subscription/list 响应与完整请求头；
 *   3. 之后所有数据（翻页、每位大佬的主页概览 + UM/CM 持仓）都在页面上下文内
 *      用应用自己的请求头重放接口获取，不逐个打开页面；
 *   4. 重放失败时自动降级：逐个打开大佬主页，搭车捕获应用自己的响应；
 *   5. 结果写入 data/smart-money/subscriptions.json 与 summary.md。
 */

const LIST_URL = 'https://www.binance.com/bapi/futures/v1/private/future/smart-money/subscription/list'
const PROFILE_URL = 'https://www.binance.com/bapi/asset/v1/friendly/future/smart-money/profile?topTraderId='
const POSITIONS_URL = 'https://www.binance.com/bapi/asset/v1/private/future/smart-money/profile/query-positions'
const PAGE_URL = 'https://www.binance.com/zh-CN/smart-money/my-subscriptions'
const ROWS = 50 // 后端上限，rows=100 会被拒（code -1130）
const TRADER_DELAY_SEC = 0.8

// 注入到页面的捕获补丁：记录目标接口的请求头与响应体。
// 注意：本文件经 stdin 执行，此处代码不用正则（避免 String.raw 转义坑）。
const PATCH_CODE = String.raw`(function() {
  if (window.__smCap) return
  window.__smCap = []
  window.__smHdrs = null
  const of = window.fetch
  window.fetch = async function(...args) {
    const init = args[1] || {}
    const resp = await of.apply(this, args)
    try {
      const input = args[0]
      const url = typeof input === 'string' ? input : (input && input.url) || ''
      const interesting = url.indexOf('subscription/list') !== -1
        || url.indexOf('query-positions') !== -1
        || url.indexOf('smart-money/profile?') !== -1
      if (interesting) {
        let headers = null
        try {
          headers = JSON.parse(JSON.stringify(init.headers instanceof Headers
            ? Object.fromEntries(init.headers.entries())
            : init.headers))
        } catch (e) {}
        let body = ''
        try { body = await resp.clone().text() } catch (e) {}
        window.__smCap.push({ url: String(url), method: init.method || 'GET', status: resp.status, headers, body })
        if (headers) window.__smHdrs = headers
      }
    } catch (e) {}
    return resp
  }
})()`

async function waitFor(fn, { timeoutSec = 25, intervalSec = 0.5 } = {}) {
  const deadline = Date.now() + timeoutSec * 1000
  while (Date.now() < deadline) {
    try {
      const v = await fn()
      if (v) return v
    } catch (e) { /* 页面跳转中可能暂时取不到，忽略 */ }
    await wait(intervalSec)
  }
  return null
}

/** 在页面上下文里用捕获到的请求头重放 GET 接口 */
function replayGet(url) {
  return js(String.raw`(async () => {
    const H = window.__smHdrs
    if (!H) return { ok: false, error: 'no-captured-headers' }
    try {
      const r = await fetch(${JSON.stringify(url)}, { method: 'GET', headers: H, credentials: 'include' })
      const j = await r.json()
      return { ok: j.code === '000000', code: j.code, message: j.message, data: j.data, total: j.total }
    } catch (e) { return { ok: false, error: String(e).slice(0, 200) } }
  })()`)
}

/** 降级方案：打开大佬主页，搭车捕获应用自己发出的 profile / query-positions 响应 */
async function scrapeTraderByNavigation(traderId) {
  await gotoAndWait('https://www.binance.com/zh-CN/smart-money/profile/' + traderId, { timeout: 30 })
  const found = await waitFor(() => js(String.raw`(() => {
    const cap = window.__smCap || []
    const pos = cap.filter(c => c.url.indexOf('query-positions') !== -1)
    const prof = cap.filter(c => c.url.indexOf('smart-money/profile?') !== -1)
    return (pos.length >= 2 || pos.length > 0) && prof.length > 0
      ? { posCount: pos.length, profCount: prof.length } : null
  })()`), { timeoutSec: 20 })
  if (!found) return { ok: false, error: 'navigation-timeout' }
  return js(String.raw`(() => {
    const parse = c => { try { const j = JSON.parse(c.body); return { ok: j.code === '000000', code: j.code, message: j.message, data: j.data, total: j.total } } catch (e) { return { ok: false, error: 'bad-json' } } }
    const cap = window.__smCap || []
    const prof = [...cap].reverse().find(c => c.url.indexOf('smart-money/profile?') !== -1)
    const pick = mt => [...cap].reverse().find(c => c.url.indexOf('query-positions') !== -1 && c.url.indexOf('marketType=' + mt) !== -1)
    const pUM = pick('UM'); const pCM = pick('CM')
    return { ok: true, via: 'navigation', profile: prof ? parse(prof) : null, UM: pUM ? parse(pUM) : null, CM: pCM ? parse(pCM) : null }
  })()`)
}

/** 抓一位大佬：主页概览 + UM/CM 持仓（分页取全）；失败则降级为打开主页 */
async function scrapeTrader(traderId) {
  let result = null
  try {
    const profile = await replayGet(PROFILE_URL + traderId)
    await js(String.raw`new Promise(r => setTimeout(r, 300))`)

    const fetchAllPositions = async (marketType) => {
      const out = []
      let total = null
      for (let page = 1; page <= 10; page++) {
        const r = await replayGet(POSITIONS_URL + '?topTraderId=' + traderId
          + '&marketType=' + marketType + '&page=' + page + '&rows=' + ROWS)
        if (!r.ok) return { ok: false, data: out, total, error: r.error || (r.code + ' ' + (r.message || '')) }
        if (Array.isArray(r.data)) out.push(...r.data)
        total = typeof r.total === 'number' ? r.total : total
        if (typeof total !== 'number' || out.length >= total || r.data.length === 0) break
      }
      return { ok: true, data: out, total }
    }

    const um = await fetchAllPositions('UM')
    const cm = await fetchAllPositions('CM')
    result = { ok: true, via: 'replay', profile, UM: um, CM: cm }
  } catch (e) {
    result = { ok: false, error: String(e).slice(0, 200) }
  }

  if (!result.ok) {
    cliLog('  replay failed (' + JSON.stringify(result.error || result.code || '') + '), fallback to navigation for ' + traderId)
    try { result = await scrapeTraderByNavigation(traderId) } catch (e) {
      result = { ok: false, error: 'navigation: ' + String(e).slice(0, 160) }
    }
  }
  return result
}

function fmtUsd(x) {
  if (typeof x !== 'number' || !isFinite(x)) return '-'
  const sign = x > 0 ? '+' : ''
  return sign + x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function fmtPct(x) {
  if (typeof x !== 'number' || !isFinite(x)) return '-'
  return (x > 0 ? '+' : '') + (x * 100).toFixed(2) + '%'
}
function fmtNum(x) {
  if (typeof x !== 'number' || !isFinite(x)) return '-'
  return x.toLocaleString('en-US')
}
const esc = s => String(s == null ? '' : s).replace(/\|/g, '\\|')

function positionStatusText(t) {
  if (t.positionStatus === 'IN_POSITION') return '持仓中'
  if (t.positionStatus === 'PRIVATE_POSITION' || t.positionShared === false) return '私密仓位'
  if (t.lastTrade) return '最近交易 ' + new Date(t.lastTrade).toISOString().slice(0, 10)
  return '暂无仓位'
}

function renderMarkdown(result) {
  const lines = []
  lines.push('# 币安聪明钱 · 我的订阅')
  lines.push('')
  lines.push('- 抓取时间：' + result.scrapedAt)
  lines.push('- 来源：' + result.source)
  lines.push('- 订阅大佬：' + result.traderCount + ' 位')
  let umCount = 0; let cmCount = 0
  for (const t of result.traders) {
    umCount += (t.positions && t.positions.UM ? t.positions.UM.length : 0)
    cmCount += (t.positions && t.positions.CM ? t.positions.CM.length : 0)
  }
  lines.push('- 当前持仓：UM ' + umCount + ' 笔 / CM ' + cmCount + ' 笔')
  lines.push('')
  lines.push('## 订阅概览')
  lines.push('')
  lines.push('| # | 交易员 | 账户 | 订阅者 | 30天ROI | 30天盈亏(USD) | 仓位状态 |')
  lines.push('|---|--------|------|--------|---------|---------------|----------|')
  result.traders.forEach((t, i) => {
    lines.push('| ' + (i + 1)
      + ' | [' + esc(t.traderName) + '](' + t.profileUrl + ')'
      + ' | ' + esc(t.accountName)
      + ' | ' + fmtNum(t.subscribers)
      + ' | ' + fmtPct(t.roi)
      + ' | ' + fmtUsd(t.pnl)
      + ' | ' + positionStatusText(t) + ' |')
  })
  lines.push('')

  for (const t of result.traders) {
    lines.push('## ' + esc(t.traderName) + '（' + esc(t.accountName) + '）')
    lines.push('')
    lines.push('- 主页：' + t.profileUrl)
    const p = t.profile && t.profile.data
    if (p) {
      const margin = fmtUsd(p.umMarginBalance) + ' / ' + fmtUsd(p.cmMarginBalance)
      lines.push('- 简介：' + esc(p.introduction || '-'))
      lines.push('- 累计收益率：' + fmtPct(p.roi)
        + ' · 总盈亏：' + fmtUsd(p.pnl) + ' USD'
        + ' · 胜率：' + fmtPct(p.winRate)
        + ' · 最大回撤：' + fmtPct(p.mdd))
      lines.push('- 入驻天数：' + fmtNum(p.daysActive)
        + ' · 净转入：' + fmtUsd(p.netTransfer) + ' USD'
        + ' · 保证金资产 UM/CM：' + margin + ' USD'
        + ' · 订阅者：' + fmtNum(p.subscribers))
    } else if (t.profileError) {
      lines.push('- 主页概览：获取失败（' + esc(t.profileError) + '）')
    }
    const pos = t.positions || {}
    const hasUM = pos.UM && pos.UM.length > 0
    const hasCM = pos.CM && pos.CM.length > 0
    if (!hasUM && !hasCM) {
      const note = (t.positionsErrors && Object.values(t.positionsErrors).filter(Boolean).join('; ')) || ''
      lines.push('- 当前持仓：无可见持仓' + (t.positionShared === false ? '（私密仓位）' : '') + (note ? '（' + esc(note) + '）' : ''))
    }
    for (const mt of ['UM', 'CM']) {
      const list = pos[mt]
      if (!list || list.length === 0) continue
      lines.push('')
      lines.push('### 当前持仓（' + (mt === 'UM' ? 'U 本位合约' : '币本位合约') + '，' + list.length + ' 笔）')
      lines.push('')
      lines.push('| 交易对 | 杠杆 | 数量 | 开仓价 | 标记价 | 强平价 | 保证金 | 未实现盈亏 | ROI | 逐仓 |')
      lines.push('|--------|------|------|--------|--------|--------|--------|------------|-----|------|')
      for (const p2 of list) {
        lines.push('| ' + esc(p2.symbol)
          + ' | ' + fmtNum(p2.leverage) + 'x'
          + ' | ' + fmtNum(p2.amount)
          + ' | ' + p2.entryPrice
          + ' | ' + p2.markPrice
          + ' | ' + (p2.liqPrice == null ? '-' : p2.liqPrice)
          + ' | ' + fmtNum(p2.margin)
          + ' | ' + fmtUsd(p2.pnl)
          + ' | ' + fmtPct(p2.roi)
          + ' | ' + (p2.isolated ? '是' : '否') + ' |')
      }
    }
    lines.push('')
  }
  lines.push('---')
  lines.push('')
  lines.push('由 `scripts/fetch-smart-money.mjs` 生成（pnpm scrape:smart-money），数据为抓取时刻快照。')
  lines.push('')
  return lines.join('\n')
}

async function main() {
  cliLog('[1/5] 连接 ego 浏览器任务空间…')
  const task = await useOrCreateTaskSpace('binance smart money scrape')

  cliLog('[2/5] 打开我的订阅页并捕获应用请求…')
  await cdp('Page.addScriptToEvaluateOnNewDocument', { source: PATCH_CODE })
  const realTab = await ensureRealTab()
  if (realTab) {
    await gotoAndWait(PAGE_URL, { timeout: 30 })
  } else {
    await openOrReuseTab(PAGE_URL, { wait: true, timeout: 30 })
  }

  // 等待捕获到订阅列表响应（同时拿到请求头模板）
  const listCap = await waitFor(() => js(String.raw`(() => {
    const c = (window.__smCap || []).filter(x => x.url.indexOf('subscription/list') !== -1)
    return c.length ? c[c.length - 1] : null
  })()`), { timeoutSec: 30 })
  if (!listCap) {
    throw new Error('未捕获到订阅列表请求。请先在 ego 浏览器里登录 binance.com，再重新运行本脚本。')
  }

  let firstList
  try { firstList = JSON.parse(listCap.body) } catch (e) { throw new Error('订阅列表响应解析失败: ' + String(e).slice(0, 120)) }
  if (firstList.code !== '000000' || !Array.isArray(firstList.data)) {
    const msg = firstList.message || ''
    if (/log in/i.test(msg) || firstList.code === '100001005') {
      throw new Error('币安提示未登录（code ' + firstList.code + '）。请在 ego 浏览器登录 binance.com 后重试。')
    }
    throw new Error('订阅列表接口异常 code=' + firstList.code + ' ' + msg)
  }

  const traders = new Map()
  for (const t of firstList.data) traders.set(t.topTraderId, t)
  const total = typeof firstList.total === 'number' ? firstList.total : traders.size
  cliLog('  第 1 页拿到 ' + firstList.data.length + ' 位，共 ' + total + ' 位')

  // 翻页（重放，带应用自己的请求头；按首页实际 rows 计算页数）
  const page1Rows = firstList.data.length || ROWS
  const maxPage = Math.min(Math.ceil(total / page1Rows) || 1, 10)
  for (let page = 2; page <= maxPage && traders.size < total; page++) {
    const r = await js(String.raw`(async () => {
      const H = window.__smHdrs
      if (!H) return { ok: false, error: 'no-captured-headers' }
      try {
        const resp = await fetch(${JSON.stringify(LIST_URL)}, {
          method: 'POST', headers: H, credentials: 'include',
          body: JSON.stringify({ page: ${page}, rows: ${page1Rows}, onlyShowSharingPosition: false }),
        })
        const j = await resp.json()
        return { ok: j.code === '000000', code: j.code, message: j.message, data: j.data, total: j.total }
      } catch (e) { return { ok: false, error: String(e).slice(0, 200) } }
    })()`)
    if (!r.ok || !Array.isArray(r.data)) {
      cliLog('  第 ' + page + ' 页获取失败（' + (r.error || r.code || '') + '），跳过')
      break
    }
    for (const t of r.data) traders.set(t.topTraderId, t)
    cliLog('  第 ' + page + ' 页累计 ' + traders.size + ' 位')
  }
  if (traders.size < total) {
    cliLog('  警告：接口 total=' + total + '，实际获取 ' + traders.size + ' 位，结果可能不完整')
  }

  cliLog('[3/5] 逐位抓取主页概览与 UM/CM 持仓（共 ' + traders.size + ' 位）…')
  const enriched = []
  let idx = 0
  for (const t of traders.values()) {
    idx++
    cliLog('  (' + idx + '/' + traders.size + ') ' + t.traderName + ' …')
    const detail = await scrapeTrader(t.topTraderId)
    const profileError = detail.profile && !detail.profile.ok ? (detail.profile.error || detail.profile.code || 'unknown') : null
    const posErr = {}
    const positions = { UM: [], CM: [] }
    for (const mt of ['UM', 'CM']) {
      const r = detail[mt]
      if (r && r.ok && Array.isArray(r.data)) positions[mt] = r.data
      else if (!r) posErr[mt] = 'no-data-returned'
      else posErr[mt] = r.error || (r.ok ? '' : ((r.code || '') + ' ' + (r.message || '')).trim())
    }
    enriched.push({
      ...t,
      profileUrl: 'https://www.binance.com/zh-CN/smart-money/profile/' + t.topTraderId,
      scrapeVia: detail.via || 'unknown',
      profile: detail.profile && detail.profile.ok ? detail.profile : null,
      profileError,
      positions,
      positionsErrors: posErr,
    })
    await wait(TRADER_DELAY_SEC)
  }

  cliLog('[4/5] 写入 data/smart-money/ …')
  const fs = await import('node:fs')
  const path = await import('node:path')

  // ego 运行时里 process.cwd() 可能是 /，从环境变量解析项目根目录并校验
  const candidates = [
    typeof globalThis.__PROJECT_ROOT__ === 'string' ? globalThis.__PROJECT_ROOT__ : null,
    process.env.SMART_MONEY_PROJECT_ROOT,
    process.env.INIT_CWD,
    process.env.PWD,
    process.cwd(),
  ].filter(Boolean)
  const root = candidates.find(p => {
    try { return fs.existsSync(path.join(p, 'package.json')) } catch (e) { return false }
  })
  if (!root) {
    throw new Error('无法定位项目根目录（尝试过: ' + candidates.join(', ') + '）。请在项目根目录运行，或设置 SMART_MONEY_PROJECT_ROOT 环境变量。')
  }
  const outDir = path.join(root, 'data', 'smart-money')
  fs.mkdirSync(outDir, { recursive: true })

  const result = {
    source: PAGE_URL,
    scrapedAt: new Date().toISOString(),
    total,
    traderCount: enriched.length,
    traders: enriched,
  }
  const jsonPath = path.join(outDir, 'subscriptions.json')
  const mdPath = path.join(outDir, 'summary.md')
  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2))
  fs.writeFileSync(mdPath, renderMarkdown(result))

  cliLog('[5/5] 完成 ✔')
  cliLog('  大佬数量: ' + enriched.length + '（接口 total=' + total + '）')
  cliLog('  JSON: ' + jsonPath)
  cliLog('  MD:   ' + mdPath)
  cliLog('  任务空间已保留（' + task.id + '），可重复运行脚本复用登录态。')
}

try {
  await main()
} catch (e) {
  cliLog('[错误] ' + String(e && e.message ? e.message : e))
  if (typeof process !== 'undefined' && process.exitCode !== undefined) process.exitCode = 1
  else throw e
}
