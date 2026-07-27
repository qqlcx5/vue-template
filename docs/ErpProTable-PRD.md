# ErpProTable 组件需求文档

## 1. 概述

**组件名称：** `ErpProTable`

**定位：** 面向企业级 ERP 系统的高级数据表格组件，基于 Element Plus `el-table` 封装，提供**表头内嵌搜索**、**远程数据请求**、**分页**、**插槽自定义渲染**等能力，以配置驱动的方式快速构建查询表格页面。

**技术栈：** Vue 3 `<script setup>` + TypeScript + Element Plus + SCSS

---

## 2. 核心能力

| 能力 | 说明 |
|------|------|
| 配置驱动列定义 | 通过 `columns` 数组声明列、搜索控件、宽度等，无需手写 `<el-table-column>` |
| 表头内嵌搜索 | 第一行表头放搜索输入框，第二行表头放列名，形成经典 ERP 双行表头 |
| 远程数据请求 | 传入 `requestApi` 函数，组件自动管理加载状态、参数拼装、分页 |
| 分页控制 | 内置 `el-pagination`，支持切换页码和每页条数 |
| 插槽自定义渲染 | 每列均可通过命名插槽 (`#propName`) 自定义单元格内容 |
| 对外暴露方法 | 通过 `defineExpose` 暴露 `fetchData` 和 `searchParams`，供父组件调用 |

---

## 3. Props 定义

| Prop | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `requestApi` | `(params: object) => Promise<Response>` | ✅ | — | 远程数据请求函数。组件在挂载、搜索、翻页时自动调用 |
| `columns` | `ColumnConfig[]` | ✅ | — | 列配置数组，详见 [§4 列配置](#4-列配置-columnconfig) |
| `pagination` | `boolean` | ❌ | `true` | 是否显示分页。为 `false` 时不传分页参数，不渲染分页组件 |

---

## 4. 列配置 (ColumnConfig)

每列是一个对象，字段如下：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `label` | `string` | 视情况 | 列标题。`type` 为 `index`/`selection` 时可省略 |
| `prop` | `string` | 视情况 | 对应数据字段名。`type` 为 `index`/`selection` 时可省略，操作列必填（用于插槽名） |
| `type` | `'index' \| 'selection'` | ❌ | Element Plus 内置列类型（序号列 / 复选框列） |
| `width` | `string \| number` | ❌ | 固定列宽 |
| `minWidth` | `string \| number` | ❌ | 最小列宽 |
| `fixed` | `boolean \| 'left' \| 'right'` | ❌ | 固定列方向 |
| `align` | `'left' \| 'center' \| 'right'` | ❌ | 单元格对齐方式，默认 `'left'` |
| `search` | `SearchConfig` | ❌ | 搜索配置，配了就第一行出现搜索控件 |

### 4.1 SearchConfig

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `'input' \| 'select'` | 搜索控件类型 |
| `options` | `{ label: string, value: string \| number }[]` | 当 `type === 'select'` 时的选项列表 |

### 4.2 列配置示例

```ts
const tableColumns = [
  { type: 'index', width: 50, align: 'center' },
  { type: 'selection', width: 50, align: 'center' },
  { label: '操作', prop: 'action', width: 80, align: 'center' },
  { label: '报告编号', prop: 'reportNo', width: 140, search: { type: 'input' } },
  { label: '状态', prop: 'status', width: 100, search: { type: 'select', options: [
    { label: '启用', value: 1 },
    { label: '停用', value: 0 }
  ]}},
  { label: '中类', prop: 'category', minWidth: 100, search: { type: 'input' } }
];
```

---

## 5. requestApi 接口约定

### 5.1 调用参数

组件自动拼装并传给 `requestApi` 的参数对象：

```ts
{
  // 仅在 pagination === true 时传入
  pageNum: number,    // 当前页码，从 1 开始
  pageSize: number,   // 每页条数，默认 20

  // 所有搜索字段（key = column.prop, value = 用户输入/选择的值）
  [prop: string]: any
}
```

### 5.2 返回值约定

`requestApi` 必须返回 `Promise`，resolve 的值结构：

```ts
{
  data: {
    list: any[],     // 当前页数据数组
    total: number    // 总记录数
  }
}
```

> 缺失字段会被兜底为空数组 `[]` 和 `0`。

---

## 6. 双行表头渲染逻辑

这是组件最核心的 UI 特征：

```
┌──────────────────────────────────────────────────────────────┐
│  第一行（搜索行）                                              │
│  ┌──────┬──────┬────────┬──────────────┬──────┐              │
│  │      │      │        │  [搜索输入框]  │      │              │
│  │ 空占位│ 空占位│  空占位  │              │ 空占位 │              │
│  └──────┴──────┴────────┴──────────────┴──────┘              │
├──────────────────────────────────────────────────────────────┤
│  第二行（列名行）                                              │
│  ┌──────┬──────┬────────┬──────────────┬──────┐              │
│  │  序号 │  选择 │  操作   │   报告编号    │  中类  │              │
│  └──────┴──────┴────────┴──────────────┴──────┘              │
├──────────────────────────────────────────────────────────────┤
│  数据行                                                       │
│  │  1   │  □  │  ✏️ 🗑️  │  SCN260...   │ 足球鞋 │              │
│  │  2   │  □  │  ✏️ 🗑️  │  SCN251...   │        │              │
└──────────────────────────────────────────────────────────────┘
```

**实现原理：** 每个 column 被包裹在一个外层 `el-table-column`（负责第一行搜索控件）和一个内层 `el-table-column`（负责第二行列名 + 数据行渲染）中。

**规则：**
- 配置了 `search` 的列 → 第一行渲染 `el-input` 或 `el-select`
- 未配置 `search` 的列 → 第一行渲染等高空白占位 `<div class="empty-search-cell">`
- `type` 为 `index` / `selection` 的列 → 第二行由 Element Plus 自动渲染，数据行不走插槽逻辑

---

## 7. 搜索行为

| 事件 | 触发时机 | 行为 |
|------|----------|------|
| `@change` | 输入框值变化 / 下拉选择变化 | 重置页码到第 1 页，重新请求 |
| `@keyup.enter` | 在输入框中按回车 | 同上 |
| 清空 (`clearable`) | 用户点击清空图标 | 值变为空，触发 `@change` |

**搜索参数拼装：** `searchParams` 是一个 `reactive({})` 对象，key 为 `col.prop`，组件 `v-model` 绑定后自动收集所有非空值，和分页参数合并后传给 `requestApi`。

---

## 8. 分页行为

| 配置项 | 值 |
|--------|----|
| 每页条数选项 | `[20, 50, 100, 200]` |
| 默认每页条数 | `20` |
| 布局 | `total, sizes, prev, pager, next, jumper` |
| 样式 | `background` 模式（页码按钮有背景色） |

**事件：**
- 切换每页条数 → 重置到第 1 页，重新请求
- 切换页码 → 保持搜索条件，重新请求

---

## 9. 插槽 (Slots)

| 插槽名 | 作用域参数 | 说明 |
|--------|-----------|------|
| `toolbar` | — | 表格上方工具栏区域（导出、新增等按钮），仅在传入时渲染 |
| `${col.prop}` | `{ row, index }` | 按列 `prop` 命名的具名插槽，自定义该列的单元格内容 |

**插槽使用示例：**

```vue
<ErpProTable :columns="columns" :requestApi="api">
  <!-- 工具栏 -->
  <template #toolbar>
    <el-button type="primary">新增</el-button>
  </template>

  <!-- 自定义列 -->
  <template #reportNo="{ row }">
    <a :href="`/report/${row.reportNo}`">{{ row.reportNo }}</a>
  </template>
</ErpProTable>
```

**渲染优先级：** 有插槽 → 走插槽渲染；无插槽 → `<span>{{ row[prop] ?? '' }}</span>`

---

## 10. 对外暴露 (defineExpose)

| 属性/方法 | 类型 | 说明 |
|-----------|------|------|
| `fetchData` | `() => Promise<void>` | 手动触发数据请求（刷新表格） |
| `searchParams` | `Reactive<Object>` | 当前搜索参数对象，父组件可读取或修改 |

**父组件调用示例：**

```vue
<ErpProTable ref="tableRef" ... />

<script setup>
const tableRef = ref();

// 手动刷新
tableRef.value?.fetchData();

// 读取当前搜索条件
console.log(tableRef.value?.searchParams);
</script>
```

---

## 11. 视觉规范（传统 ERP 风格）

| 元素 | 样式 |
|------|------|
| 表头背景色 | `#eef4fc`（浅蓝色） |
| 表头文字颜色 | `#333` |
| 表头字重 | `normal`（不加粗） |
| 数据行文字颜色 | `#606266` |
| 数据行字号 | `13px` |
| 表格边框 | `1px solid #dcdfe6` |
| 搜索输入框高度 | `28px` |
| 搜索输入框圆角 | `0`（无圆角，ERP 传统风格） |
| 搜索输入框边框 | `1px solid #c0c4cc` |
| 搜索输入框聚焦 | 边框变蓝 `#409eff` |
| 空数据状态 | `<el-empty description="暂无数据" />` |
| 分页对齐 | 右对齐，距表格 `10px` |

---

## 12. 交互行为总结

1. **组件挂载** → 自动调用 `requestApi` 加载第一页数据
2. **用户在搜索框输入并回车 / 清空 / 选择下拉** → 重置到第 1 页，重新请求
3. **用户切换每页条数** → 重置到第 1 页，重新请求
4. **用户切换页码** → 保持搜索条件，请求对应页
5. **请求过程中** → 表格显示 `v-loading` 遮罩
6. **请求失败** → `console.error` 打印错误（当前无 UI 提示）
7. **数据为空** → 显示 `暂无数据` 占位

---

## 13. 使用方式（接入指南）

```vue
<template>
  <ErpProTable
    ref="tableRef"
    :requestApi="fetchList"
    :columns="columns"
    :pagination="true"
  >
    <template #action="{ row }">
      <el-button size="small" @click="handleEdit(row)">编辑</el-button>
    </template>
  </ErpProTable>
</template>

<script setup lang="ts">
import ErpProTable from '@/components/ErpProTable.vue';
import { getListApi } from '@/api/list';

const columns = [
  { type: 'index', width: 50, align: 'center' },
  { type: 'selection', width: 50, align: 'center' },
  { label: '操作', prop: 'action', width: 100, align: 'center' },
  { label: '名称', prop: 'name', minWidth: 120, search: { type: 'input' } },
  { label: '类型', prop: 'type', width: 100, search: { type: 'select', options: [
    { label: 'A类', value: 'A' },
    { label: 'B类', value: 'B' }
  ]}}
];

const fetchList = (params) => getListApi(params);
</script>
```

---

## 14. 当前已知局限（待迭代）

| 编号 | 局限 | 影响 |
|------|------|------|
| 1 | 请求失败无 UI 错误提示 | 用户不知道请求是否成功 |
| 2 | 搜索类型仅支持 `input` 和 `select` | 缺少日期选择、日期范围、级联等常见筛选控件 |
| 3 | 无排序功能 | 不能点击表头排序 |
| 4 | 无列显隐控制 | 所有列始终展示，不能动态隐藏 |
| 5 | 无行展开 / 树形数据 | 不支持嵌套数据展示 |
| 6 | 无导出功能 | 需由外部 toolbar 插槽实现 |
| 7 | `requestApi` 返回值结构固定 | 必须是 `{ data: { list, total } }`，不支持自定义解析 |
