# CxCrontab

## 设计意图
可视化 Cron 表达式生成器，将复杂的 Cron 语法转为下拉选择 + 复选框，降低运维门槛。支持 秒/分/时/日/月/周 六位配置。

## 功能边界
- 支持：秒/分/时/日/月/周 全部位可视化配置、生成标准 Cron 字符串、解析已有 Cron 回填、常用预设（每天/每周/每月）
- 不支持：年份位（Cron 通常 5-6 位不含年）、Quartz 7 位表达式

## 依赖
- Element Plus `el-radio-group`、`el-select`、`el-input`、`el-checkbox`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| modelValue | `string` | `'0 0 0 * * ?'` | 否 | Cron 表达式（v-model） |
| showSecond | `boolean` | `false` | 否 | 显示秒位 |
| disabled | `boolean` | `false` | 否 | 禁用 |
