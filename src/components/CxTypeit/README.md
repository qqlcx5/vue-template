---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_461b8b4486a611f18766525400f8a581
    ReservedCode1: BfxlEOB4WgPIR8o/bBaVBRHPxHieejMwz3zrNXAqu6VnWZBeERAVXDA0TA4DHyBLQYEvMfN244RPIt94K/E0n2M0Tm0jHG2WWP6j/6rNmXB5btoMituIsQo/x8CpQVgO7P+c4accw5iF1boI6u0/F4Uu8tPiFZ60ve9/6RRBZhtB93p7NWudim6agMQ=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_461b8b4486a611f18766525400f8a581
    ReservedCode2: BfxlEOB4WgPIR8o/bBaVBRHPxHieejMwz3zrNXAqu6VnWZBeERAVXDA0TA4DHyBLQYEvMfN244RPIt94K/E0n2M0Tm0jHG2WWP6j/6rNmXB5btoMituIsQo/x8CpQVgO7P+c4accw5iF1boI6u0/F4Uu8tPiFZ60ve9/6RRBZhtB93p7NWudim6agMQ=
---

# CxTypeit

## 设计意图

基于 [TypeIt](https://www.typeitjs.com/) 库的 Vue 3 打字动画封装组件。将 TypeIt 的声明式 API 包装为 Vue 组件，只需传入 `options` 即可在页面上呈现逐字打印效果，无需手动管理 TypeIt 实例的生命周期。

## 功能边界

- **范围内**：字符串打字动画、HTML 内容逐字输出、自定义打字速度/延迟/循环等 TypeIt 原生配置
- **范围外**：不支持多个独立打字目标（组件内只有一个 `cx-typeit__target` 元素）；不处理动画中间状态的钩子回调（需通过 `options` 传递 TypeIt 原生回调）

## 完整 API 表格

### Props

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| `options` | `TypeItOptions` | `{}` | 否 | TypeIt 配置项，详见 [TypeIt 文档](https://www.typeitjs.com/docs/vanilla/usage#options) |

### Events

无。

### Slots

| 插槽名 | 作用域 | 说明 |
|---|---|---|
| `default` | — | 自定义打字目标元素。若不提供，默认渲染 `<span class="cx-typeit__target" />`，打字内容通过 `options.strings` 指定 |

### Expose

| 名称 | 类型 | 说明 |
|---|---|---|
| `typeIt` | `TypeIt \| null` | TypeIt 实例引用，可用于调用 `.freeze()` / `.unfreeze()` / `.destroy()` 等实例方法。注意在 `onMounted` 之后才可用 |
