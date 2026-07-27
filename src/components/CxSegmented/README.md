---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_3e5a1a6786a611f18766525400f8a581
    ReservedCode1: Sc+rr+2FLs7lNjVIl+HrdrTP+yD+2ZZX0xMXhBdv4Eg3VK43VkAKmIwkM8vIzQyGoMImIrG6/4FXOc2zpDjtoFzS0iODZSHDK6dvZs2yahvFTrj710u69T+zKFs6fsO3c+kMa1TEsnMxcyZtc5znDIR2I43WzTJhBUBjRm5e76gfWhvpruYqhPVICRE=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_3e5a1a6786a611f18766525400f8a581
    ReservedCode2: Sc+rr+2FLs7lNjVIl+HrdrTP+yD+2ZZX0xMXhBdv4Eg3VK43VkAKmIwkM8vIzQyGoMImIrG6/4FXOc2zpDjtoFzS0iODZSHDK6dvZs2yahvFTrj710u69T+zKFs6fsO3c+kMa1TEsnMxcyZtc5znDIR2I43WzTJhBUBjRm5e76gfWhvpruYqhPVICRE=
---

# CxSegmented 分段控制器

## 设计意图

CxSegmented 是一个轻量级的分段控制器组件，用于在多个互斥选项之间切换（类似 iOS 的 UISegmentedControl）。它提供带滑动动画的选中指示器，支持图标+文字组合、多种尺寸和块级布局，适用于视图切换、筛选标签等场景。

## 功能边界

- **适用场景**：2~5 个互斥选项的视图/内容切换、筛选条件切换
- **不适用场景**：大量选项（建议改用 Select/Dropdown）、多选场景（建议改用 Checkbox Group）、标签页带内容面板（建议改用 Tabs）

## 导出的类型

| 类型 | 说明 |
|------|------|
| `SegmentedOption` | 选项数据结构（label / value / icon / disabled / tip） |
| `CXSegmentedProps` | 组件 Props 类型 |
| `CXSegmentedEmits` | 组件 Events 类型 |
| `CXSegmentedExpose` | 组件暴露的公共方法/属性类型 |

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options` | `SegmentedOption[]` | `[]` | 选项列表 |
| `modelValue` / `v-model` | `string \| number` | `0` | 当前选中项。number 时按索引匹配（响应式），string 时按 value 匹配 |
| `block` | `boolean` | `false` | 是否将宽度调整为父元素宽度 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 控件尺寸 |
| `disabled` | `boolean` | `false` | 是否全局禁用 |
| `resize` | `boolean` | `false` | 容器尺寸变化时自适应指示器位置 |

### SegmentedOption

| 字段 | 类型 | 说明 |
|------|------|------|
| `label` | `string` | 显示文字 |
| `value` | `string \| number` | 选项值 |
| `icon` | `Component` | 图标组件（Vue Component） |
| `disabled` | `boolean` | 是否禁用该选项 |
| `tip` | `string` | tooltip 提示文本 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `value: string \| number` | v-model 更新事件 |
| `change` | `{ index: number; option: SegmentedOption }` | 选项切换时触发，返回索引和选项对象 |

### Slots

无（通过 `options` prop 配置，不支持插槽自定义）。

### Expose

| 名称 | 类型 | 说明 |
|------|------|------|
| `curIndex` | `number` | 当前选中项的索引（只读） |
