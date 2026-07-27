---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_418ca8ba86a611f18766525400f8a581
    ReservedCode1: vMW/3EN75LnBfoffXB7F2y3JQ715jdjg6e3Yv5cLUEnX+gbgkeuQqTXgPkpZcJjCJGpHcmf0Zb9SOdwDfSPBSlPttdWxvSs5ks8AFG4DKb04ua8Pilf55gzlCBaBu2o8OOR4cDmRMoQljihM6F06/d5eNbRWT5c8OvxuSySfM6/uA6ueCRaYX3VaJ38=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_418ca8ba86a611f18766525400f8a581
    ReservedCode2: vMW/3EN75LnBfoffXB7F2y3JQ715jdjg6e3Yv5cLUEnX+gbgkeuQqTXgPkpZcJjCJGpHcmf0Zb9SOdwDfSPBSlPttdWxvSs5ks8AFG4DKb04ua8Pilf55gzlCBaBu2o8OOR4cDmRMoQljihM6F06/d5eNbRWT5c8OvxuSySfM6/uA6ueCRaYX3VaJ38=
---

# CxSplitPane 分割面板

## 设计意图

CxSplitPane 是一个可拖拽调整大小的分割面板组件，支持左右（vertical）和上下（horizontal）两种分割方向。通过 BEM 命名规范的插槽将内容分配到两个面板中，并提供拖拽分割条、最小百分比限制、双击重置、程序化控制等能力，适用于文件管理器侧边栏、代码编辑器布局、数据对比视图等场景。

## 功能边界

- **适用场景**：左右分栏（侧边栏 + 主内容）、上下分栏（编辑区 + 预览区）、数据对比面板
- **不适用场景**：三栏及以上复杂布局（需嵌套多个实例）、需要面板折叠/展开（需配合其他组件）、响应式断点布局（建议使用 CSS Grid/Flexbox）

## 导出的类型

| 类型 | 说明 |
|------|------|
| `SplitDirection` | `'vertical' | 'horizontal'` |
| `CXSplitPaneProps` | 组件 Props 类型 |
| `CXSplitPaneEmits` | 组件 Events 类型 |
| `CXSplitPaneExpose` | 组件暴露的公共方法/属性类型 |

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `split` | `'vertical' \| 'horizontal'` | `'vertical'` | 分割方向：vertical 左右 / horizontal 上下 |
| `defaultPercent` | `number` | `50` | 左侧/上方面板的初始百分比 |
| `minPercent` | `number` | `10` | 最小百分比限制（左右面板各有此限制） |
| `disabled` | `boolean` | `false` | 是否禁用拖拽调整 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `resize` | `percent: number` | 拖拽调整或程序化设置百分比时触发 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `left` | 左侧面板内容（vertical）或上方面板内容（horizontal） |
| `right` | 右侧面板内容（vertical）或下方面板内容（horizontal） |

### Expose

| 名称 | 类型 | 说明 |
|------|------|------|
| `reset()` | `() => void` | 重置为 `defaultPercent` |
| `setPercent(percent)` | `(percent: number) => void` | 设置面板百分比（受 `minPercent` 约束） |
| `percent` | `number` | 当前百分比（只读） |
