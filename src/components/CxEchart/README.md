# CxEchart

## 设计意图
ECharts 图表封装组件，统一中后台图表的初始化、resize、主题、loading 等生命周期管理，props 映射 option + theme + loading。

## 功能边界
- 支持：ECharts option 直接传入、自动 resize（监听窗口变化）、loading 状态、主题配置、绑定事件透传
- 不支持：图表联动、brush 选择联动（需外部组合）

## 依赖
- echarts

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| option | `EChartsOption` | `{}` | 是 | ECharts 配置 |
| theme | `string` | `''` | 否 | 主题名称 |
| loading | `boolean` | `false` | 否 | 加载状态 |
| height | `string \| number` | `'400px'` | 否 | 图表高度 |
| autoresize | `boolean` | `true` | 否 | 自动 resize |

### Emits
| 事件名 | 参数 | 说明 |
|---|---|---|
| init | `echartsInstance` | 初始化完成，返回实例 |

### Expose
| 方法 | 说明 |
|---|---|
| getInstance | `() => EChartsInstance` — 获取 ECharts 实例 |
