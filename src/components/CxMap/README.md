---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_369f26a686a611f18766525400f8a581
    ReservedCode1: cxcOafN1irhTB+GFbxAOU2SXGSQ1/r+aGfGPZQKaSkdOOPAuDTdMcHz8LwmQgRaV1zAbbm3h+b9OCMTUNqDc1a0+yiDznjgkftLYb+j6p5+aCZCDQWwLPGSQwdCAszx7sBoOs74GSYd0y8wKczG0FhqI+62hv7qFDhj6N8cPlahfihEDEMBq9bEKi7A=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_369f26a686a611f18766525400f8a581
    ReservedCode2: cxcOafN1irhTB+GFbxAOU2SXGSQ1/r+aGfGPZQKaSkdOOPAuDTdMcHz8LwmQgRaV1zAbbm3h+b9OCMTUNqDc1a0+yiDznjgkftLYb+j6p5+aCZCDQWwLPGSQwdCAszx7sBoOs74GSYd0y8wKczG0FhqI+62hv7qFDhj6N8cPlahfihEDEMBq9bEKi7A=
---

# CxMap 高德地图组件

## 设计意图

CxMap 是基于高德地图 JS API 2.0 的地图容器组件。它封装了地图的加载、初始化、销毁全生命周期，并提供 loading 状态、就绪回调和错误处理，让业务方无需关注异步加载和资源清理的底层细节。

核心定位：快速在页面中嵌入一个带默认中心点和缩放级别的高德地图，并通过 `ready` 事件获取 `map` 实例和 `AMap` 命名空间，进行进一步的业务定制（标记、路径、覆盖物等）。

## 功能边界

**负责**：
- 通过 `@amap/amap-jsapi-loader` 异步加载高德 JS API
- 创建 `AMap.Map` 实例并绑定到容器 DOM
- 地图加载中的 loading 遮罩（v-loading）
- 组件销毁时自动调用 `map.destroy()` 和 `clearEvents('click')`
- 通过 `ready` 事件暴露 `map` 和 `AMap` 供外部调用
- 通过 `error` 事件反馈加载/初始化失败

**不负责**：
- 不提供标记、路径、信息窗等覆盖物的内置渲染（由业务方通过 `ready` 获取实例后自行调用 AMap API）
- 不提供地图 UI 控件以外的业务交互逻辑

## 依赖

| 包名 | 用途 |
|---|---|
| `@amap/amap-jsapi-loader` | 异步加载高德地图 JS API |

需在 `window` 上配置 `_AMapSecurityConfig` 安全密钥（高德官方要求），组件本身不处理密钥配置。

## API

### Props

| 名称 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `amapKey` | `string` | 是 | — | 高德地图 JS API Key |
| `version` | `string` | 否 | `'2.0'` | API 版本号 |
| `plugins` | `string[]` | 否 | `['AMap.ToolBar', 'AMap.MapType']` | 需加载的插件列表 |
| `options` | `CxMapOptions` | 否 | `{}` | 地图初始化配置，与默认值做浅合并 |

#### CxMapOptions

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `zoom` | `number` | `11` | 地图缩放级别 |
| `center` | `[number, number]` | `[116.397428, 39.90923]` | 地图中心点（经度, 纬度） |
| `mapStyle` | `string` | — | 自定义地图样式 ID |
| `layers` | `any[]` | — | 地图图层配置 |
| `viewMode` | `'2D' \| '3D'` | `'2D'` | 视图模式 |
| `[key: string]` | `any` | — | 其他高德 Map 构造选项 |

### Emits

| 事件名 | 参数 | 触发时机 |
|---|---|---|
| `ready` | `(map: any, AMap: any)` | 地图实例创建成功、`complete` 事件触发后 |
| `error` | `(error: any)` | 缺少 `amapKey` 或加载初始化失败时 |

### Expose

| 方法 | 返回值 | 说明 |
|---|---|---|
| `getMap()` | `any \| null` | 获取当前地图实例，未初始化时返回 `null` |

### Slots

无。组件是纯容器组件，业务内容通过 `ready` 事件获取实例后调用 AMap API 添加。
