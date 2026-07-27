# CxDialog

基于 Element Plus `el-dialog` 封装的声明式 + 程序式对话框组件。支持自定义渲染器（header / content / footer）、底部按钮配置、Popconfirm 二次确认、全屏切换、以及完整的生命周期钩子。

## 设计意图

- 提供统一的多对话框管理方案，通过 `dialogStore` + `addDialog` / `closeDialog` 以程序化方式打开/关闭对话框
- 支持通过 `contentRenderer` / `headerRenderer` / `footerRenderer` 自定义任意区域，实现完全灵活的对话框内容
- 内置「取消 / 确定」默认按钮组，支持 `beforeCancel` / `beforeSure` 拦截逻辑和 Popconfirm 二次确认
- 支持全屏切换按钮（`fullscreenIcon`）及相关回调

## 功能边界

- **负责**：对话框的打开、关闭、多实例管理、内容渲染、按钮交互、全屏切换
- **不负责**：对话框内部业务逻辑（由调用方通过 `contentRenderer` 传入的自定义组件处理）
- **依赖**：Element Plus（`el-dialog` / `el-popconfirm` / `el-button` / `el-icon`）

## 程序化 API

通过 `useDialog` 模块导出：

| 函数 | 说明 |
| --- | --- |
| `addDialog(options)` | 打开一个对话框，`options` 为 `CxDialogOptions` 配置对象 |
| `closeDialog(options, index, args?)` | 关闭指定索引的对话框，`args` 可携带关闭参数 |
| `updateDialog(value, key?, index?)` | 更新指定索引对话框的某个属性，默认更新 `title` |
| `closeAllDialog()` | 关闭所有对话框 |

需要在 App 根组件中放置 `<CxDialog />` 作为渲染锚点。

## API（CxDialogOptions）

### 基础属性（继承自 CxDialogBaseProps）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | — | 对话框可见性（`addDialog` 自动设为 `true`） |
| `title` | `string` | — | 对话框标题 |
| `width` | `string \| number` | — | 对话框宽度 |
| `fullscreen` | `boolean` | — | 是否全屏 |
| `fullscreenIcon` | `boolean` | — | 是否显示全屏切换图标（启用时 header 由组件接管） |
| `top` | `string` | — | 对话框距离顶部的偏移 |
| `modal` | `boolean` | — | 是否显示遮罩层 |
| `modalClass` | `string` | — | 遮罩层自定义 class |
| `headerClass` | `string` | — | header 自定义 class |
| `bodyClass` | `string` | — | body 自定义 class |
| `footerClass` | `string` | — | footer 自定义 class |
| `appendToBody` | `boolean` | — | 是否插入至 body 元素 |
| `lockScroll` | `boolean` | — | 是否在对话框出现时将 body 滚动锁定 |
| `class` | `string` | — | 对话框自定义 class |
| `style` | `CSSProperties` | — | 对话框自定义样式 |
| `openDelay` | `number` | — | 打开延迟（ms） |
| `closeDelay` | `number` | — | 关闭延迟（ms） |
| `closeOnClickModal` | `boolean` | — | 点击遮罩层是否关闭 |
| `closeOnPressEscape` | `boolean` | — | 按下 ESC 是否关闭 |
| `showClose` | `boolean` | — | 是否显示关闭按钮 |
| `beforeClose` | `(done: DoneFn) => void` | — | 关闭前的回调，调用 `done()` 继续关闭 |
| `draggable` | `boolean` | — | 是否可拖拽 |
| `overflow` | `boolean` | — | 内容溢出配置 |
| `center` | `boolean` | — | 是否居中 |
| `alignCenter` | `boolean` | — | 是否垂直居中 |
| `destroyOnClose` | `boolean` | — | 关闭时是否销毁 Dialog 中的元素 |
| `closeIcon` | `string \| Component` | — | 自定义关闭图标 |
| `zIndex` | `number` | — | 对话框 z-index |
| `headerAriaLevel` | `string` | — | header ARIA 级别 |

### 扩展选项

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `props` | `any` | 传递给 `contentRenderer` 渲染组件的 Props |
| `hideFooter` | `boolean` | 是否隐藏底部按钮区域 |
| `popconfirm` | `PopconfirmConfig` | 确定按钮的 Popconfirm 二次确认配置 |
| `sureBtnLoading` | `boolean` | 确定按钮是否显示 loading 状态 |
| `headerRenderer` | `(ctx) => VNode \| Component` | 自定义 header 渲染函数 |
| `contentRenderer` | `(ctx) => VNode \| Component` | **必填**，自定义内容渲染函数 |
| `footerRenderer` | `(ctx) => VNode \| Component` | 自定义 footer 渲染函数 |
| `footerButtons` | `CxButtonProps[]` | 自定义底部按钮列表（不传则使用默认「取消/确定」） |
| `open` | `(ctx) => void` | 对话框打开后的回调 |
| `close` | `(ctx) => void` | 对话框关闭后的回调 |
| `closeCallBack` | `(ctx) => void` | 关闭回调（含 `args` 参数） |
| `fullscreenCallBack` | `(ctx) => void` | 全屏切换回调 |
| `openAutoFocus` | `(ctx) => void` | 自动聚焦回调 |
| `closeAutoFocus` | `(ctx) => void` | 关闭后自动聚焦回调 |
| `beforeCancel` | `(done, ctx) => void` | 取消前拦截，调用 `done()` 继续 |
| `beforeSure` | `(done, ctx) => void` | 确定前拦截，调用 `done()` 继续；`ctx.closeLoading()` 可关闭 loading |

### CxButtonProps

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `label` | `string` | 按钮文本 |
| `type` | `ButtonType` | 按钮类型 |
| `popconfirm` | `PopconfirmConfig` | 按钮的二次确认配置 |
| `btnClick` | `(ctx) => void` | 按钮点击回调，`ctx` 包含 `dialog` 和 `button` 上下文 |
| `loading` | `boolean` | 按钮 loading 状态 |
| 其他 | — | 继承 Element Plus `el-button` 的常用属性 |

### Slots

无（内容通过 `contentRenderer` / `headerRenderer` / `footerRenderer` 渲染函数传入）。

### Expose

无。
