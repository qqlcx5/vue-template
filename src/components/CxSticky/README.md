# CxSticky

## 设计意图
基于 @vueuse/core 的粘性定位组件，使目标元素在滚动到阈值时固定在顶部，常用于表头、Tab 栏吸附。

## 功能边界
- 支持：粘性定位、自定义 z-index、自定义偏移量
- 不支持：CSS `position: sticky` 不兼容的祖先元素（overflow:hidden 等场景用 JS 方案）

## 依赖
- @vueuse/core `useSticky`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| zIndex | `number` | `100` | 否 | 粘性层级 |
| offsetTop | `number` | `0` | 否 | 吸附偏移量（px） |
| disabled | `boolean` | `false` | 否 | 禁用粘性 |

### Slots
| 插槽名 | 说明 |
|---|---|
| default | 需要粘性定位的内容 |

### Expose
| 方法 | 说明 |
|---|---|
| isSticky | `Ref<boolean>` — 当前是否处于粘性状态 |
