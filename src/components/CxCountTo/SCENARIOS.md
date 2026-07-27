# CxCountTo 场景说明

## 典型场景

- 仪表盘/数据大屏中的数值展示（用户数、订单量、交易额等）。
- 统计页面的数字动态滚动进入效果。
- 倒计时或递减动画（如库存减少、预算消耗）。

## 不适用场景

- 非数字内容的动画（如文字淡入）。
- 需要多个数字同时独立滚动的复杂编排（可并排放置多个 CxCountTo 实例，但无内置编排能力）。

---

## 示例

### 基础用法：默认递增

```vue
<template>
  <CxCountTo :start-val="0" :end-val="9527" />
</template>

<script setup lang="ts">
import CxCountTo from '@/components/CxCountTo'
</script>
```

### 递减动画（倒计时）

```vue
<template>
  <CxCountTo :start-val="9999" :end-val="0" :duration="3000" />
</template>

<script setup lang="ts">
import CxCountTo from '@/components/CxCountTo'
</script>
```

### 带格式化：千分位 + 小数 + 前缀/后缀

```vue
<template>
  <CxCountTo
    :start-val="0"
    :end-val="1234567.89"
    :decimals="2"
    separator=","
    decimal="."
    prefix="¥"
    suffix="元"
    :duration="2000"
    color="#e74c3c"
    font-size="28px"
  />
</template>

<script setup lang="ts">
import CxCountTo from '@/components/CxCountTo'
</script>
```

### 关闭自动播放，手动触发

```vue
<template>
  <CxCountTo
    ref="counterRef"
    :start-val="0"
    :end-val="8888"
    :autoplay="false"
  />
  <el-button @click="counterRef?.start()">开始计数</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxCountTo from '@/components/CxCountTo'

const counterRef = ref<InstanceType<typeof CxCountTo>>()
</script>
```

### expose 方法：暂停 / 恢复

```vue
<template>
  <CxCountTo
    ref="counterRef"
    :start-val="0"
    :end-val="50000"
    :autoplay="false"
  />
  <el-button @click="counterRef?.start()">开始</el-button>
  <el-button @click="counterRef?.pauseResume()">暂停/恢复</el-button>
  <el-button @click="counterRef?.reset()">重置</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxCountTo from '@/components/CxCountTo'

const counterRef = ref<InstanceType<typeof CxCountTo>>()
</script>
```

### 自定义缓动函数

```vue
<template>
  <CxCountTo
    :start-val="0"
    :end-val="10000"
    :easing-fn="easeInQuad"
    :duration="2000"
  />
</template>

<script setup lang="ts">
import CxCountTo from '@/components/CxCountTo'

/** easeInQuad */
function easeInQuad(t: number, b: number, c: number, d: number): number {
  t /= d
  return c * t * t + b
}
</script>
```

### emit 回调：动画完成处理

```vue
<template>
  <CxCountTo
    :start-val="0"
    :end-val="5000"
    @mounted="onMounted"
    @callback="onComplete"
  />
</template>

<script setup lang="ts">
import CxCountTo from '@/components/CxCountTo'

function onMounted() {
  console.log('CxCountTo 已挂载并开始动画')
}

function onComplete() {
  console.log('动画播放完毕')
}
</script>
```

### 复杂场景：数据大屏仪表盘

```vue
<template>
  <div class="dashboard">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>总用户数</template>
          <CxCountTo
            :start-val="0"
            :end-val="userCount"
            :duration="2500"
            separator=","
            suffix=" 人"
            color="#409eff"
            font-size="32px"
          />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>今日交易额</template>
          <CxCountTo
            :start-val="0"
            :end-val="revenue"
            :duration="2500"
            :decimals="2"
            separator=","
            prefix="¥"
            color="#67c23a"
            font-size="32px"
          />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>订单量</template>
          <CxCountTo
            :start-val="0"
            :end-val="orderCount"
            :duration="2000"
            separator=","
            suffix=" 单"
            color="#e6a23c"
            font-size="32px"
          />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>好评率</template>
          <CxCountTo
            :start-val="0"
            :end-val="98.5"
            :duration="1800"
            :decimals="1"
            suffix="%"
            color="#f56c6c"
            font-size="32px"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import CxCountTo from '@/components/CxCountTo'

const userCount = 128960
const revenue = 5623890.52
const orderCount = 3456
</script>

<style scoped>
.dashboard {
  padding: 16px;
  background: #f0f2f5;
  min-height: 100vh;
}
</style>
```
