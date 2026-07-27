# CxCascader

## 设计意图
通用级联选择器，基于 Element Plus el-cascader 封装，支持多选/单选、搜索过滤、全选模式、懒加载，适配中后台各种级联选择场景。

## 功能边界
- 支持：多选/单选、搜索过滤、allChecked 全选模式、懒加载、checkStrictly 任意级可选、自定义分隔符
- 不支持：动态新增节点（仅展示选择）

## 依赖
- Element Plus `el-cascader`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| modelValue | `any` | — | 否 | 已选值（v-model） |
| options | `CascaderOption[]` | `[]` | 否 | 级联数据 |
| multiple | `boolean` | `false` | 否 | 多选 |
| filterable | `boolean` | `false` | 否 | 搜索过滤 |
| allChecked | `boolean` | `false` | 否 | 顶部插入"全部"选项 |
| allCheckedLabel | `string` | `'全部'` | 否 | "全部"选项标签 |
| checkStrictly | `boolean` | `false` | 否 | 任意级节点可选 |
| separator | `string` | `' / '` | 否 | 选项分隔符 |
| disabled | `boolean` | `false` | 否 | 禁用 |
| lazyLoad | `(node, resolve) => void` | — | 否 | 懒加载函数 |
