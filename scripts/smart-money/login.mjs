/**
 * 人工登录一次，登录态会持久化在 .cache/smart-money/chrome-profile。
 * 用法：pnpm sm:login
 */
import { BASE, SUBSCRIPTIONS_URL, launchBrowser, saveState } from './lib/browser.mjs'

const context = await launchBrowser({ headless: false })
const page = context.pages()[0] ?? (await context.newPage())

await page.goto(`${BASE}/zh-CN/login`, { waitUntil: 'domcontentloaded' })
console.log('\n请在打开的 Chrome 中完成登录（含邮箱/手机验证码、2FA）。')
console.log('登录后按终端回车键继续...\n')
await new Promise((resolve) => process.stdin.once('data', resolve))

await page.goto(SUBSCRIPTIONS_URL, { waitUntil: 'domcontentloaded' }).catch(() => {})
console.log('当前地址:', page.url())

const statePath = await saveState(context)
console.log('登录态已保存到:', statePath)

await context.close()
