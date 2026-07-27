# CxLeftSelectTree

## 设计意图
左侧树 + 右侧列表的双栏选择器，树节点关联数据列表，支持勾选树节点筛选右侧数据，常用于组织架构选人、部门选成员。

## 功能边界
- 支持：左树右表布局、点击树节点加载对应数据、拖拽调节宽度、搜索过滤
- 不支持：右侧列表的复杂交互（需外部自定义）

## 依赖
- CxExpandTree（或 el-tree）、el-table

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| treeData | `TreeNodeData[]` | `[]` | 是 | 树形数据 |
| treeWidth | `number` | `240` | 否 | 树区域宽度（px） |
| treeProps | `{ label: string; children: string }` | `{ label: 'label', children: 'children' }` | 否 | 树节点映射 |
| resizable | `boolean` | `true` | 否 | 可拖拽调节宽度 |
| minWidth | `number` | `180` | 否 | 树区域最小宽度 |
| maxWidth | `number` | `480` | 否 | 树区域最大宽度 |

### Slots
| 插槽名 | 说明 |
|---|---|
| tree | 自定义左侧树 |
| default | 右侧内容区 |
