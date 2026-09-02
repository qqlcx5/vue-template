# 币安聪明钱「我的订阅」抓取脚本（用 ego 浏览器）

## 先回答你的问题：pageAgent 捕获 DOM → Playwright 操作？

ego-browser 正是这个模式，但内置了，不需要 Playwright：`snapshotText()` 把页面捕获成语义树（每个输入框/按钮/链接带 `@N` ref 和 `loc=` 定位器），然后用 `fillInput('@N', ...)`、`click('@N')`、`js(...)` 直接操作——原理是 CDP，等价于 Playwright 的 locator 思路。本任务是纯抓取，几乎不涉及输入框，主要是「打开页面 → 提取列表 → 逐个进大佬主页提取持仓」。

## 交付物（全部写入 /Users/another/Documents/OpenSource/vue-template）

1. `scripts/fetch-smart-money.mjs` — 可重复执行的抓取脚本
2. `data/smart-money/subscriptions.json` — 完整结构化数据（抓取时间 + 订阅列表 + 每位大佬持仓明细）
3. `data/smart-money/summary.md` — 人类可读 Markdown 汇总（订阅概览表 + 每位大佬持仓表）
4. `package.json` 加一条 npm script：`scrape:smart-money`

## 抓取范围（已确认）

- 订阅列表概览：大佬昵称、收益率 ROI、盈亏 PnL、跟单人数、组合链接等
- 每位大佬的当前持仓明细：币种、方向（多/空）、杠杆、开仓价、标记价、未实现盈亏等

## 实施步骤

1. **侦察（ego 浏览器，复用你的登录态）**：`useOrCreateTaskSpace('binance smart money scrape')` → 打开 my-subscriptions 页 → `snapshotText()` 观察结构；通过 `drainEvents()`/页面 JS 侦察数据是走 bapi JSON 接口还是纯 DOM。若发现未登录 → `handOffTaskSpace` 交还给你登录，等你确认后继续。
2. **写脚本** `scripts/fetch-smart-money.mjs`：
   - 优先用页面上下文里的 JSON 接口（`browserFetch`，自动带 cookie）拿结构化数据；拿不到就用 DOM 提取（`js()` IIFE），两种路径按侦察结果落定
   - 未登录时打印明确提示并以非零码退出（独立运行场景）
   - 逐个大佬抓持仓，请求间加 ~1s 间隔防限频
   - 用 `node:fs`（动态 import）把 JSON 写到 `data/smart-money/subscriptions.json`，并渲染出 `summary.md`
   - `cliLog` 输出摘要（几位大佬、几笔持仓、文件路径）
3. **执行**：先试 `ego-browser nodejs scripts/fetch-smart-money.mjs`，若 CLI 不支持文件参数则用 `ego-browser nodejs < scripts/fetch-smart-money.mjs`（stdin 等价 heredoc），npm script 采用后者写法保证可用。
4. **验证交付**：检查 JSON/MD 内容完整、字段合理；向你汇报抓到的数据摘要；最后 `completeTaskSpace(id, { keep: false })` 关闭任务空间。

## 注意

- 页面为纯 SPA 且需登录，公开网络抓不到——所有数据探测都在 ego 浏览器内进行
- 脚本依赖 ego-browser 运行时（helpers 为全局注入），从项目根目录执行
- 数据文件不加入 .gitignore，按你说的直接落到项目中