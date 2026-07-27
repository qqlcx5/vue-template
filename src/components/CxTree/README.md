# CxTree

## 设计意图
增强树形控件，支持大量数据的加载展示，在 Element Plus el-tree 基础上增加节点懒加载、搜索过滤、节点拖拽排序等功能。

## 功能边界
- 支持：节点懒加载、搜索过滤高亮、节点拖拽排序、多选/单选、自定义节点内容
- 不支持：超大数据量（建议用 CxExpandTree 的 virtual 模式）

## 依赖
- Element Plus `el-tree`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| data | `TreeNodeData[]` | `[]` | 否 | 树形数据 |
| nodeKey | `string` | `'id'` | 否 | 节点唯一标识 |
| lazy | `boolean` | `false` | 否 | 懒加载模式 |
| load | `(node, resolve) => void` | — | 否 | 懒加载函数 |
| filterable | `boolean` | `false` | 否 | 搜索过滤 |
| draggable | `boolean` | `false` | 否 | 节点拖拽 |
| checkable | `boolean` | `false` | 否 | 多选 |
| expandOnClickNode | `boolean` | `true` | 否 | 点击节点展开 |
| highlightCurrent | `boolean` | `true` | 否 | 高亮当前选中节点 |

### Emits
| 事件名 | 参数 | 说明 |
|---|---|---|
| node-click | `data, node` | 节点点击 |
| node-drop | `dragNode, dropNode, type` | 拖拽结束 |
| check | `data, { checkedNodes, checkedKeys }` | 勾选变化 |
