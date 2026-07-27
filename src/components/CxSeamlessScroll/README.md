---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_3cb1166386a611f18108525400287e28
    ReservedCode1: KE4CIesdBrYCK3pm80J02q77K7AcNyh+J/AqF7LclY8v9KCwfHQGVo9djHgUgJr26g0hno28aPnMNpRxcNC87lPM421GU0NcQVXRJsCsHprg1HSDcN5mDYTOhmGpHsqfRaWrKa+IInfWvRbbjSUu1c/Pat5yREgzyfZdfmeeQMC7P0F9c+QIyO8XMTQ=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_3cb1166386a611f18108525400287e28
    ReservedCode2: KE4CIesdBrYCK3pm80J02q77K7AcNyh+J/AqF7LclY8v9KCwfHQGVo9djHgUgJr26g0hno28aPnMNpRxcNC87lPM421GU0NcQVXRJsCsHprg1HSDcN5mDYTOhmGpHsqfRaWrKa+IInfWvRbbjSUu1c/Pat5yREgzyfZdfmeeQMC7P0F9c+QIyO8XMTQ=
---

# CxSeamlessScroll 无缝滚动组件

## 设计意图

CxSeamlessScroll 是一个高性能的无缝滚动容器组件，支持四个方向的自动滚动、鼠标悬停暂停、手势触摸拖拽、横向切换按钮（navigation 模式）以及单步停顿等丰富功能。它通过复制一份插槽内容实现视觉上的"无缝"循环，并使用 `requestAnimationFrame` 驱动动画。

核心定位：在数据大屏、公告栏、轮播列表等场景中实现平滑无缝滚动效果。

## 功能边界

**负责**：
- 四个方向的自动无缝滚动（top / bottom / left / right）
- 鼠标悬停暂停/恢复滚动（`hoverStop`）
- 触摸拖拽滚动（`openTouch`）
- 横向 navigation 模式（左右切换按钮，通过 `left-switch` / `right-switch` 插槽自定义）
- 单步停顿（`singleHeight` / `singleWidth` + `waitTime`）
- 数据量不足时自动停止滚动（`data.length < limitMoveNum`）
- `scrollEnd` 事件通知每次循环结束
- `reset()` 方法暴露以重置滚动状态

**不负责**：
- 不提供滚动项的内容渲染（通过默认插槽传入）
- 不做数据请求或定时刷新
- 不支持垂直方向的 navigation 按钮

## 依赖

无外部依赖。纯 Vue 3 + `requestAnimationFrame` 实现。

## API

### Props

| 名称 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `data` | `unknown[]` | 否 | `[]` | 滚动数据，仅用于判断数据量是否达到 `limitMoveNum` 阈值 |
| `classOption` | `Partial<SeamlessScrollOption>` | 否 | `{}` | 滚动配置，与默认值做深浅合并 |

#### SeamlessScrollOption

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `step` | `number` | `1` | 每帧滚动步长（px） |
| `limitMoveNum` | `number` | `5` | 启动无缝滚动所需的最小数据量 |
| `hoverStop` | `boolean` | `true` | 鼠标悬停时是否暂停滚动 |
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 滚动方向 |
| `openTouch` | `boolean` | `true` | 是否开启移动端触摸拖拽 |
| `singleHeight` | `number` | `0` | 单条数据高度（px），>0 时 `hoverStop` 自动关闭 |
| `singleWidth` | `number` | `0` | 单条数据宽度（px），>0 时 `hoverStop` 自动关闭 |
| `waitTime` | `number` | `1000` | 单步停顿等待时间（ms） |
| `switchOffset` | `number` | `30` | 左右切换按钮的水平偏移量（px） |
| `autoPlay` | `boolean` | `true` | 是否自动播放。navigation 模式下强制为 `false` |
| `navigation` | `boolean` | `false` | 是否显示左右切换按钮（仅水平方向生效） |
| `switchSingleStep` | `number` | `134` | 单步切换距离（px） |
| `switchDelay` | `number` | `400` | 切换动画延迟（ms） |
| `switchDisabledClass` | `string` | `'disabled'` | 按钮禁用时的 CSS class |
| `isSingleRemUnit` | `boolean` | `false` | `singleWidth` / `singleHeight` 是否使用 rem 单位 |

### Emits

| 事件名 | 参数 | 触发时机 |
|---|---|---|
| `scrollEnd` | 无 | 每次滚动循环完成（回到起点）时触发 |

### Expose

| 方法 | 参数 | 说明 |
|---|---|---|
| `reset()` | 无 | 重置滚动位置到起点并重新初始化滚动 |

### Slots

| 名称 | 作用域 | 说明 |
|---|---|---|
| `default` | — | 滚动内容列表（会被复制一份实现无缝循环） |
| `left-switch` | — | 左侧切换按钮内容 |
| `right-switch` | — | 右侧切换按钮内容 |
