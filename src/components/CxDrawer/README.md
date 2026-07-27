# CxDrawer

基于 Element Plus `el-drawer` 封装的声明式 + 程序式抽屉组件。支持自定义渲染器（header / content / footer）、底部按钮配置、Popconfirm 二次确认、以及完整的生命周期钩子。API 设计与 `CxDialog` 高度一致。

## 设计意图

- 提供统一的多抽屉管理方案，通过 `drawerStore` + `addDrawer` / `closeDrawer` 以程序化方式打开/关闭抽屉
- 支持通过 `contentRenderer` / `headerRenderer` / `footerRenderer` 自定义任意区域
- 内置「取消 / 确定」默认按钮组，支持 `beforeCancel` / `beforeSure` 拦截逻辑和 Popconfirm 二次确认
- 支持四个方向的抽屉（`ltr` / `rtl` / `ttb` / `btt`）及可调整大小（`resizable`）

## 功能边界

- **负责**：抽屉的打开、关闭、多实例管理、内容渲染、按钮交互
- **不负责**：抽屉内部业务逻辑（由调用方通过 `contentRenderer` 传入的自定义组件处理）
- **依赖**：Element Plus（`el-drawer` / `el-popconfirm` / `el-button`）

## 程序化 API

通过 `useDrawer` 模块导出：

| 函数 | 说明 |
| --- | --- |
| `addDrawer(options)` | 打开一个抽屉，`options` 为 `CxDrawerOptions` 配置对象 |
| `closeDrawer(options, index, args?)` | 关闭指定索引的抽屉，`args` 可携带关闭参数 |
| `updateDrawer(value, key?, index?)` | 更新指定索引抽屉的某个属性，默认更新 `title` |
| `closeAllDrawer()` | 关闭所有抽屉 |

需要在 App 根组件中放置 `<CxDrawer />` 作为渲染锚点。

## API（CxDrawerOptions）

### 基础属性（继承自 CxDrawerBaseProps）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | — | 抽屉可见性（`addDrawer` 自动设为 `true`） |
| `title` | `string` | — | 抽屉标题 |
| `direction` | `'rtl' \| 'ltr' \| 'ttb' \| 'btt'` | — | 抽屉打开方向（右/左/上/下） |
| `size` | `string \| number` | — | 抽屉尺寸 |
| `resizable` | `boolean` | — | 是否可拖拽调整大小 |
| `modal` | `boolean` | — | 是否显示遮罩层 |
| `closeOnClickModal` | `boolean` | — | 点击遮罩层是否关闭 |
| `closeOnPressEscape` | `boolean` | — | 按下 ESC 是否关闭 |
| `showClose` | `boolean` | — | 是否显示关闭按钮 |
| `beforeClose` | `(done: DoneFn) => void` | — | 关闭前的回调 |
| `withHeader` | `boolean` | — | 是否显示标题栏 |
| `modalClass` | `string` | — | 遮罩层自定义 class |
| `headerClass` | `string` | — | header 自定义 class |
| `bodyClass` | `string` | — | body 自定义 class |
| `footerClass` | `string` | — | footer 自定义 class |
| `class` | `string` | — | 抽屉自定义 class |
| `style` | `CSSProperties` | — | 抽屉自定义样式 |
| `openDelay` | `number` | — | 打开延迟（ms） |
| `closeDelay` | `number` | — | 关闭延迟（ms） |
| `appendToBody` | `boolean` | — | 是否插入至 body 元素 |
| `lockScroll` | `boolean` | — | 是否锁定背景滚动 |
| `destroyOnClose` | `boolean` | — | 关闭时是否销毁元素 |
| `zIndex` | `number` | — | 抽屉 z-index |
| `headerAriaLevel` | `string` | — | header ARIA 级别 |

### 扩展选项

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `props` | `any` | 传递给 `contentRenderer` 渲染组件的 Props |
| `hideFooter` | `boolean` | 是否隐藏底部按钮区域 |
| `popConfirm` | `CxDrawerPopconfirm` | 确定按钮的 Popconfirm 二次确认配置 |
| `sureBtnLoading` | `boolean` | 确定按钮是否显示 loading 状态 |
| `headerRenderer` | `(ctx) => VNode \| Component` | 自定义 header 渲染函数 |
| `contentRenderer` | `(ctx) => VNode \| Component` | **必填**，自定义内容渲染函数 |
| `footerRenderer` | `(ctx) => VNode \| Component` | 自定义 footer 渲染函数 |
| `footerButtons` | `CxDrawerButton[]` | 自定义底部按钮列表（不传则使用默认「取消/确定」） |
| `open` | `(ctx) => void` | 抽屉打开后的回调 |
| `close` | `(ctx) => void` | 抽屉关闭后的回调 |
| `closeCallBack` | `(ctx) => void` | 关闭回调（含 `args` 参数） |
| `openAutoFocus` | `(ctx) => void` | 自动聚焦回调 |
| `closeAutoFocus` | `(ctx) => void` | 关闭后自动聚焦回调 |
| `beforeCancel` | `(done, ctx) => void` | 取消前拦截 |
| `beforeSure` | `(done, ctx) => void` | 确定前拦截；`ctx.closeLoading()` 可关闭 loading |

### CxDrawerButton

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `label` | `string` | 按钮文本 |
| `type` | `ButtonType` | 按钮类型 |
| `popConfirm` | `CxDrawerPopconfirm` | 按钮的二次确认配置 |
| `btnClick` | `(ctx) => void` | 按钮点击回调，`ctx` 包含 `drawer` 和 `button` 上下文 |
| `loading` | `boolean` | 按钮 loading 状态 |
| 其他 | — | 继承 Element Plus `el-button` 的常用属性 |

### Slots

无（内容通过渲染函数传入）。

### Expose

无。
