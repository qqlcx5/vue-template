/**
 * 探路脚本：打开聪明钱相关页面，把所有 /bapi 接口的响应抓下来并落盘。
 * 用于确认「订阅列表」「达人详情」「当前仓位」分别对应哪个接口、字段长什么样。
 * 用法：pnpm sm:discover
 */
import { SUBSCRIPTIONS_URL, SQUARE_URL, createCollector, launchBrowser, sleep } from './lib/browser.mjs'

const context = await launchBrowser({ headless: false })
const page = context.pages()[0] ?? (await context.newPage())
const collector = createCollector(page)

for (const [name, url] of [
  ['square', SQUARE_URL],
  ['subscriptions', SUBSCRIPTIONS_URL],
]) {
  console.log(`\n>>> ${name}: ${url}`)
  await page.goto(url, { waitUntil: 'domcontentloaded' }).catch((e) => console.log('goto 失败:', e.message))
  await sleep(6000)
  // 滚动一下触发懒加载
  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 1200)
    await sleep(1200)
  }
  console.log('落地地址:', page.url())
  const { dir, files } = collector.dump(name)
  console.log(`抓到 ${files.length} 个接口，已写入 ${dir}`)
}

console.log('\n===== 接口清单 =====')
for (const hit of collector.list()) {
  const preview = JSON.stringify(hit.json).slice(0, 160)
  console.log(`- ${hit.url.split('?')[0]}\n    ${preview}`)
}

await context.close()
