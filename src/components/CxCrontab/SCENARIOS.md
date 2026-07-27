## 典型场景
- 定时任务配置页
- 报表推送频率设置
- 数据备份调度

## 不适用场景
- 需要按日历选择特定日期（应使用 el-date-picker 多选日期模式）
- 毫秒级精度的定时（Cron 不支持）

## 示例

### 1. 基础用法
```vue
<template>
  <CxCrontab v-model="cron" @change="onChange" />
</template>

<script setup>
const cron = ref('0 0 8 * * ?')
</script>
```
