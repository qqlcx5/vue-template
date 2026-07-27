---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_4490528986a611f18108525400287e28
    ReservedCode1: 2qQuMYZ7X4Y525vLklGWm4KME3eKbZytyRbNulqxSnOo47Kad8vD/ZKecVkGIGa3F9layVGk2CpR2PWderGQqFnYP6d/PUallxUKrNJOLkC1hAt56dLdAGPiW9dwv015w0eXqN4vWwqHwcd2TPi+TA9DB3zKcLvz60idiCDxM4Biv1hDA8xdJ2OfnfU=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_4490528986a611f18108525400287e28
    ReservedCode2: 2qQuMYZ7X4Y525vLklGWm4KME3eKbZytyRbNulqxSnOo47Kad8vD/ZKecVkGIGa3F9layVGk2CpR2PWderGQqFnYP6d/PUallxUKrNJOLkC1hAt56dLdAGPiW9dwv015w0eXqN4vWwqHwcd2TPi+TA9DB3zKcLvz60idiCDxM4Biv1hDA8xdJ2OfnfU=
---

# CxTreeLine 树形连线

## 设计意图

CxTreeLine 为 Element Plus 的 `el-tree` / `el-tree-v2` 提供树形结构引导线（虚线），在树节点内容区域绘制纵向层级连线和横向分支线，增强树形数据的层级视觉感知。组件需在 el-tree 的默认插槽中使用，接收 tree 组件传递的 `node` 和 `data` 参数。

## 功能边界

- **适用场景**：el-tree（普通树）和 el-tree-v2（虚拟化树）中需要层级引导线的场景、组织架构展示、目录树可视化
- **不适用场景**：独立于 el-tree 使用、非 Element Plus 的树组件、需要实线或自定义颜色的连线（当前仅支持默认虚线样式）

## 导出的类型

| 类型 | 说明 |
|------|------|
| `CxTreeLineProps` | 组件 Props 类型 |

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `node` | `TreeNode` | — | **必传**。当前树节点，由 el-tree 插槽作用域传入 |
| `data` | `TreeNodeData` | `[]` | 当前节点数据 |
| `treeData` | `TreeData` | `[]` | 完整树数据。**使用 el-tree-v2 时必传**，用于虚拟树根层级连线计算 |
| `indent` | `number` | `16` | 缩进距离（px），需与 el-tree 的 `indent` prop 保持一致 |
| `showLabelLine` | `boolean` | `true` | 是否显示标签右侧的装饰横线 |

### Events

无。

### Slots

| 插槽名 | 作用域 | 说明 |
|--------|--------|------|
| `default` | `{ node, data }` | 完全自定义节点内容（使用后将覆盖 node-label 和 after-node-label） |
| `node-label` | `{ node, data }` | 自定义节点标签区域（默认渲染 `node.label`） |
| `after-node-label` | `{ node, data }` | 节点标签后的附加内容 |

### Expose

无。
