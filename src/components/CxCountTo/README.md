# CxCountTo

## 设计意图

CxCountTo 是一个数字滚动动画组件，用于在 UI 中展示从起始值到结束值的平滑数字过渡效果。支持递增（count-up）和递减（count-down）两种模式，自动根据 `startVal` 与 `endVal` 的大小关系判断方向。内置缓动函数、千分位分隔、小数精度、前后缀等格式化能力，并提供 `start` / `pause` / `resume` / `pauseResume` / `reset` 五个暴露方法供外部手动控制动画。

## 功能边界

- **支持**：递增/递减动画；自定义缓动函数；小数位数与分隔符格式化；手动控制播放/暂停/恢复/重置；自动播放开关；动画完成回调。
- **不支持**：非数字内容动画；多数字并列滚动；CSS 动画方式（内部使用 `requestAnimationFrame`）。

## 依赖

无第三方依赖，纯 Vue 3 Composition API + `requestAnimationFrame` 实现。

## 完整 API

### Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `startVal` | `number` | `0` | 否 | 起始值 |
| `endVal` | `number` | `2020` | 否 | 结束值 |
| `duration` | `number` | `1300` | 否 | 动画持续时间，单位 ms |
| `autoplay` | `boolean` | `true` | 否 | 是否在 `onMounted` 及 `startVal`/`endVal` 变化时自动播放 |
| `decimals` | `number` | `0` | 否 | 保留小数位数 |
| `color` | `string` | `''` | 否 | 数字字体颜色（CSS color 值） |
| `fontSize` | `string` | `'16px'` | 否 | 数字字体大小（CSS font-size 值） |
| `decimal` | `string` | `'.'` | 否 | 小数点符号 |
| `separator` | `string` | `','` | 否 | 千分位分隔符 |
| `prefix` | `string` | `''` | 否 | 数字前缀（如 `'$'`、`'¥'`） |
| `suffix` | `string` | `''` | 否 | 数字后缀（如 `'%'`、`'人'`） |
| `useEasing` | `boolean` | `true` | 否 | 是否使用缓动函数。`false` 时线性过渡 |
| `easingFn` | `(t: number, b: number, c: number, d: number) => number` | `easeOutExpo` | 否 | 自定义缓动函数，t=当前时间, b=起始值, c=变化量, d=总时长 |

### Emits

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `mounted` | — | 组件挂载完成时触发（此时 `autoplay: true` 已调用 `start()`） |
| `callback` | — | 动画播放完毕时触发 |

### Slots

无。

### Expose

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `start` | `() => void` | 从头开始播放动画 |
| `pause` | `() => void` | 暂停动画（保留当前进度） |
| `resume` | `() => void` | 从暂停位置恢复播放 |
| `pauseResume` | `() => void` | 切换暂停/恢复状态 |
| `reset` | `() => void` | 重置显示为 `startVal` 并取消动画 |
