# CxConfigGlobal

## 设计意图
全局配置注入组件，使用 provide/inject 向下传递项目全局参数（如 dictApi、baseUrl、projectName 等），子组件通过 inject 读取配置，解耦全局依赖。

## 功能边界
- 支持：provide 注入任意配置项、嵌套覆盖、类型安全
- 不支持：配置项热更新（刷新页面后生效）

## 依赖
- Vue 3 `provide`/`inject`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| config | `Record<string, any>` | `{}` | 否 | 全局配置对象 |

### Slots
| 插槽名 | 说明 |
|---|---|
| default | 应用主体 |

**使用方式**：在 App.vue 根部包裹：
```vue
<CxConfigGlobal :config="{ projectName: '管理系统', dictApi: '/api/dict' }">
  <router-view />
</CxConfigGlobal>
```
