# CxCard

## 设计意图
卡片容器组件，基于 Element Plus el-card，提供标题、头部分区、阴影控制，统一中后台卡片布局。

## 功能边界
- 支持：标题、header extra 操作区、阴影 hover/always/never 切换、body 内边距自定义
- 不支持：卡片嵌套过多层级

## 依赖
- Element Plus `el-card`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| title | `string` | `''` | 否 | 卡片标题 |
| shadow | `'always' \| 'hover' \| 'never'` | `'always'` | 否 | 阴影模式 |
| padding | `string \| number` | `''` | 否 | body 内边距 |
| bodyClass | `string` | `''` | 否 | body 自定义 class |
| bodyStyle | `Record<string, any>` | `{}` | 否 | body 自定义 style |

### Slots
| 插槽名 | 说明 |
|---|---|
| default | 卡片内容 |
| header | 头部额外操作区 |
