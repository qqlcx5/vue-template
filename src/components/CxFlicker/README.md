# CxFlicker

纯 CSS 脉冲闪烁指示器组件。无依赖，通过 CSS `@keyframes` 动画实现从中心向外扩散的脉冲效果，常用于状态指示、加载点位、通知提醒等场景。

## 设计意图

- 提供一个极简、零依赖的闪烁动画点，通过 CSS 自定义属性实现灵活样式配置
- 支持自定义尺寸、颜色、圆角和脉冲扩散幅度
- 默认外观为圆形彩色脉冲点，可通过 `borderRadius` 切换为方形

## 功能边界

- **负责**：渲染一个带有脉冲动画的指示点
- **不负责**：交互逻辑、点击事件、状态管理（组件无 emits / slots / expose）
- **依赖**：无外部依赖

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `width` | `string` | `'12px'` | 指示器宽度 |
| `height` | `string` | `'12px'` | 指示器高度 |
| `borderRadius` | `number \| string` | `'50%'` | 圆角；`0` 为方形，`'50%'`（或不传）为圆形 |
| `background` | `string` | `var(--el-color-primary)` | 闪烁颜色，默认为 Element Plus 主题色 |
| `scale` | `number \| string` | `'2'` | 脉冲扩散幅度倍数，值越大扩散范围越大 |

### Emits

无。

### Slots

无。

### Expose

无。
