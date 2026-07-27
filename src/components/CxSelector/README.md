---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_4007333c86a611f18766525400f8a581
    ReservedCode1: Chu3QAdbP2bazrlWvFevoWjvnUOPXcUoCri9CDMw0dvGr3wn86ZQU2hxJcQqSHzH6iG3p6Gcrm6MlCHoAfsj2Xd9d/uVCAqt1Vwd/ZS/JG4EEVlouozixNnBL9XWh9E93FeQ5H9Lyv11Fr9WrHi/S36A/iRTrj3Jw8eWy0kHMGabrhBlI4jzfbzbNiU=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_4007333c86a611f18766525400f8a581
    ReservedCode2: Chu3QAdbP2bazrlWvFevoWjvnUOPXcUoCri9CDMw0dvGr3wn86ZQU2hxJcQqSHzH6iG3p6Gcrm6MlCHoAfsj2Xd9d/uVCAqt1Vwd/ZS/JG4EEVlouozixNnBL9XWh9E93FeQ5H9Lyv11Fr9WrHi/S36A/iRTrj3Jw8eWy0kHMGabrhBlI4jzfbzbNiU=
---

# CxSelector 范围选择器

## 设计意图

CxSelector 是一个双端点范围选择器，用户通过两次点击（起点 + 终点）来选择一个连续的数值区间。组件以表格行列布局展示可选数值，提供 hover 预览、选中高亮、区间着色和回显功能，适用于评分、时间范围、数量区间等场景。

## 功能边界

- **适用场景**：离散数值区间选择（如评分 1~10、数量范围、等级区间）、需要直观展示可选范围的场景
- **不适用场景**：连续滑块式区间（建议使用 Slider/RangeSlider）、大量数值选项（30+ 个会导致横向溢出）、非数值型范围选择

## 导出的类型

| 类型 | 说明 |
|------|------|
| `SelectedValue` | 选择结果（left / right / whole） |
| `CxSelectorProps` | 组件 Props 类型 |
| `CxSelectorEmits` | 组件 Events 类型 |

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `hsKey` | `number \| string` | `0` | 组件唯一标识，同一页面多个实例时用于区分 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `value` | `number` | `0` | 当前值（用于半选状态） |
| `max` | `number[]` | `[1..10]` | 可选范围值列表 |
| `echo` | `number[]` | `[]` | 回显数据 `[startIndex, endIndex]`，长度必须为 2 |

### SelectedValue

| 字段 | 类型 | 说明 |
|------|------|------|
| `left` | `number` | 左侧端点值（较小值） |
| `right` | `number` | 右侧端点值（较大值） |
| `whole` | `Array<{ item: number; index: number }>` | 完整的选中列表 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `selectedVal` | `val: SelectedValue` | 完成两次点击选择区间后触发 |

### Slots

无。

### Expose

无。
