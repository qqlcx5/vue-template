# CxExpandTree

## 设计意图
展开/折叠树形控件，基于 Element Plus el-tree 增强，支持展开/折叠全部、节点过滤、虚拟滚动，适合大型组织架构树。

## 功能边界
- 支持：展开/折叠全部、搜索过滤、check 多选、虚拟滚动（大数据）、节点拖拽
- 不支持：异步加载时展开全部（需等数据加载完）

## 依赖
- Element Plus `el-tree`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| data | `TreeNodeData[]` | `[]` | 是 | 树形数据 |
| showExpandAll | `boolean` | `true` | 否 | 显示展开/折叠全部按钮 |
| filterable | `boolean` | `false` | 否 | 搜索过滤 |
| filterPlaceholder | `string` | `'输入关键词过滤'` | 否 | 搜索占位文本 |
| checkable | `boolean` | `false` | 否 | 节点可选 |
| nodeKey | `string` | `'id'` | 否 | 节点唯一标识字段 |
| defaultExpandAll | `boolean` | `false` | 否 | 默认展开全部 |
| virtual | `boolean` | `false` | 否 | 虚拟滚动（大数据量） |

### Emits
| 事件名 | 参数 | 说明 |
|---|---|---|
| node-click | `data, node` | 节点点击 |
| check | `data, { checkedNodes, checkedKeys }` | 勾选变化 |
