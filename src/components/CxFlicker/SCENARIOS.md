# CxFlicker 场景说明

## 典型场景

- 在线状态指示器（绿色脉冲点表示在线）
- 新消息 / 未读通知提醒
- 数据加载中的占位指示
- 表单字段高亮闪烁提示（如必填项提醒）
- 监控面板中服务健康状态指示

## 不适用场景

- 需要交互（点击/悬停）的指示器（CxFlicker 无事件支持，需外层包裹）
- 加载骨架屏（用 Skeleton 组件更合适）
- 进度条场景

---

## 使用示例

### 1. 默认圆形脉冲

```vue
<template>
  <div style="display: flex; align-items: center; gap: 8px">
    <CxFlicker />
    <span>默认样式</span>
  </div>
</template>

<script setup lang="ts">
import { CxFlicker } from '@/components/CxFlicker'
</script>
```

### 2. 自定义尺寸（prop: width / height）

```vue
<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <div style="display: flex; align-items: center; gap: 4px">
      <CxFlicker width="6px" height="6px" />
      <span>小号</span>
    </div>
    <div style="display: flex; align-items: center; gap: 4px">
      <CxFlicker />
      <span>中号</span>
    </div>
    <div style="display: flex; align-items: center; gap: 4px">
      <CxFlicker width="24px" height="24px" />
      <span>大号</span>
    </div>
  </div>
</template>
```

### 3. 不同颜色状态指示（prop: background）

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; align-items: center; gap: 8px">
      <CxFlicker background="#67c23a" />
      <span>在线</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px">
      <CxFlicker background="#e6a23c" />
      <span>忙碌</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px">
      <CxFlicker background="#c0c4cc" />
      <span>离线</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px">
      <CxFlicker background="#f56c6c" />
      <span>告警</span>
    </div>
  </div>
</template>
```

### 4. 方形脉冲（prop: borderRadius）

```vue
<template>
  <div style="display: flex; align-items: center; gap: 8px">
    <CxFlicker :border-radius="4" width="16px" height="16px" background="#409eff" />
    <span>圆角方形</span>
  </div>

  <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px">
    <CxFlicker :border-radius="0" width="16px" height="16px" background="#e6a23c" />
    <span>直角方形</span>
  </div>
</template>
```

### 5. 自定义脉冲扩散幅度（prop: scale）

```vue
<template>
  <div style="display: flex; gap: 24px">
    <div style="display: flex; align-items: center; gap: 4px">
      <CxFlicker :scale="1.5" />
      <span>scale=1.5</span>
    </div>
    <div style="display: flex; align-items: center; gap: 4px">
      <CxFlicker />
      <span>scale=2（默认）</span>
    </div>
    <div style="display: flex; align-items: center; gap: 4px">
      <CxFlicker :scale="4" />
      <span>scale=4</span>
    </div>
  </div>
</template>
```

### 6. 未读消息提醒组合

```vue
<template>
  <div style="position: relative; display: inline-block">
    <el-badge :value="3" :max="99">
      <el-button>消息</el-button>
    </el-badge>
    <CxFlicker
      width="8px"
      height="8px"
      background="#f56c6c"
      style="position: absolute; top: -4px; right: -4px"
    />
  </div>
</template>

<script setup lang="ts">
import { CxFlicker } from '@/components/CxFlicker'
</script>
```

### 7. 列表项状态指示

```vue
<template>
  <div v-for="item in services" :key="item.name"
       style="display: flex; align-items: center; gap: 8px; padding: 8px">
    <CxFlicker
      :background="item.online ? '#67c23a' : '#c0c4cc'"
      :scale="item.alert ? 3 : 2"
    />
    <span>{{ item.name }}</span>
    <span style="color: #909399; font-size: 12px">
      {{ item.online ? '运行中' : '已停止' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { CxFlicker } from '@/components/CxFlicker'

const services = [
  { name: 'API 网关', online: true, alert: false },
  { name: '数据库', online: true, alert: true },
  { name: '缓存服务', online: false, alert: false }
]
</script>
```
