/**
 * 数据归一化。
 * 币安聪明钱的接口字段命名不固定（不同版本 / 不同接口差异很大），
 * 这里用「递归找对象 + 多候选字段兜底」的方式，避免接口一改脚本就废。
 */

const TRADER_ID_KEYS = ['encryptedUid', 'portfolioId', 'leaderId', 'traderId', 'marginUid', 'uid', 'userId']
const NAME_KEYS = ['nickName', 'nickname', 'userName', 'displayName', 'traderName', 'name']
const AVATAR_KEYS = ['avatarUrl', 'avatar', 'userAvatar', 'portraitUrl', 'headPortrait']
const POSITION_KEYS = ['positionAmt', 'positionAmount', 'amount', 'qty', 'quantity', 'size']
const ENTRY_KEYS = ['entryPrice', 'avgPrice', 'averagePrice', 'openPrice', 'costPrice']
const MARK_KEYS = ['markPrice', 'lastPrice', 'currentPrice', 'price']
const PNL_KEYS = ['unrealizedProfit', 'pnl', 'unrealizedPnl', 'profit', 'upl']

export function pick(obj, keys) {
  for (const k of keys) {
    const v = obj?.[k]
    if (v !== undefined && v !== null && v !== '') return v
  }
  return undefined
}

export function num(v) {
  if (v === undefined || v === null || v === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

/** 百分数 -> 小数，接口有时给 0.1234 有时给 12.34 */
function ratio(v) {
  const n = num(v)
  if (n === null) return null
  return Math.abs(n) > 1.5 ? n / 100 : n
}

/** 广度优先遍历，收集所有满足条件的朴素对象 */
export function findObjects(root, predicate, { maxDepth = 12, maxResults = 2000 } = {}) {
  const out = []
  if (!root || typeof root !== 'object') return out
  const queue = [{ value: root, depth: 0 }]
  const seen = new WeakSet()

  while (queue.length && out.length < maxResults) {
    const { value, depth } = queue.shift()
    if (!value || typeof value !== 'object') continue
    if (seen.has(value)) continue
    seen.add(value)

    if (!Array.isArray(value) && predicate(value)) out.push(value)
    if (depth >= maxDepth) continue

    for (const child of Object.values(value)) {
      if (child && typeof child === 'object') queue.push({ value: child, depth: depth + 1 })
    }
  }
  return out
}

const isTraderLike = (o) =>
  TRADER_ID_KEYS.some((k) => o[k] !== undefined && o[k] !== null && o[k] !== '') &&
  NAME_KEYS.some((k) => typeof o[k] === 'string' && o[k].trim())

const isPositionLike = (o) =>
  typeof o.symbol === 'string' &&
  POSITION_KEYS.some((k) => o[k] !== undefined) &&
  (ENTRY_KEYS.some((k) => o[k] !== undefined) || MARK_KEYS.some((k) => o[k] !== undefined) || PNL_KEYS.some((k) => o[k] !== undefined))

export function extractTraders(payload) {
  return findObjects(payload, isTraderLike, { maxResults: 500 }).map(normalizeTrader)
}

export function extractPositions(payload) {
  return findObjects(payload, isPositionLike, { maxResults: 2000 }).map(normalizePosition)
}

export function normalizeTrader(raw) {
  return {
    id: String(pick(raw, TRADER_ID_KEYS) ?? ''),
    name: pick(raw, NAME_KEYS) ?? '',
    avatar: pick(raw, AVATAR_KEYS) ?? null,
    roi: ratio(pick(raw, ['roi', 'totalRoi', 'roiRatio', 'pnlRatio', 'returnRate', 'totalReturnRate'])),
    pnl: num(pick(raw, ['pnl', 'totalPnl', 'realizedPnl', 'profit', 'totalProfit'])),
    winRate: ratio(pick(raw, ['winRate', 'winRatio', 'winningRate'])),
    maxDrawdown: ratio(pick(raw, ['maxDrawdown', 'mdd', 'maxDrawDownRatio', 'maxDrawDown'])),
    followers: num(pick(raw, ['followerCount', 'followers', 'fansCount', 'copyTraderCount', 'copyCount'])),
    aum: num(pick(raw, ['aum', 'totalAsset', 'assetsUnderManagement', 'marginBalance', 'totalBalance'])),
    tradeCount: num(pick(raw, ['tradeCount', 'totalTradeCount', 'orderCount'])),
    since: pick(raw, ['registerTime', 'createTime', 'firstTradeTime', 'joinTime']) ?? null,
    raw,
  }
}

export function normalizePosition(raw) {
  const amt = num(pick(raw, POSITION_KEYS))
  const mark = num(pick(raw, MARK_KEYS))
  const entry = num(pick(raw, ENTRY_KEYS))
  const sideRaw = pick(raw, ['side', 'positionSide', 'direction'])
  const side = typeof sideRaw === 'string' ? sideRaw.toUpperCase() : amt === null ? null : amt >= 0 ? 'LONG' : 'SHORT'
  const size = amt === null ? null : Math.abs(amt)

  return {
    symbol: raw.symbol,
    side,
    size,
    notional: size !== null && mark !== null ? +(size * mark).toFixed(2) : null,
    entryPrice: entry,
    markPrice: mark,
    leverage: num(pick(raw, ['leverage', 'leverageLevel', 'lever'])),
    margin: num(pick(raw, ['margin', 'positionMargin', 'isolatedMargin', 'initialMargin'])),
    pnl: num(pick(raw, PNL_KEYS)),
    roe: ratio(pick(raw, ['roe', 'pnlRatio', 'returnRate', 'roi'])),
    liqPrice: num(pick(raw, ['liquidationPrice', 'liqPrice'])),
    marginType: pick(raw, ['marginType', 'isolated']) ?? null,
    updateTime: num(pick(raw, ['updateTime', 'timestamp', 'time', 'updateTimeStamp'])),
    raw,
  }
}

/** 从一份接口响应里同时提取两类数据 */
export function digest(payload) {
  return { traders: extractTraders(payload), positions: extractPositions(payload) }
}
