---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d270bcd3df6a2cd27c2792fa9a0b45ef_3749ea7c86a611f18108525400287e28
    ReservedCode1: /1uKHLk3jQIT4/nnm3XFkNaUItUffakxXtdeM0XtqomSAiCOGxkkJkct/Hda+Ehd2Wxd7IKLNo8I42DZrQoOTPtxri4F7Z1vv1LvUd5T/TjDfxdJIqFx4hx9KkoaVRvjLeV0KCJOy+eLGx1yA68e/JofyhYUOPuJHusd898K8UDKrkVGAVbRv9jMDcI=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d270bcd3df6a2cd27c2792fa9a0b45ef_3749ea7c86a611f18108525400287e28
    ReservedCode2: /1uKHLk3jQIT4/nnm3XFkNaUItUffakxXtdeM0XtqomSAiCOGxkkJkct/Hda+Ehd2Wxd7IKLNo8I42DZrQoOTPtxri4F7Z1vv1LvUd5T/TjDfxdJIqFx4hx9KkoaVRvjLeV0KCJOy+eLGx1yA68e/JofyhYUOPuJHusd898K8UDKrkVGAVbRv9jMDcI=
---

# CxMap 场景说明

## 典型场景

1. 在后台管理系统中展示门店分布 / 设备位置等地理信息
2. 与表单联动：选择地址后在地图上定位标记
3. 轨迹回放：通过 `ready` 获取 `map` 实例后调用 AMap 的 `Polyline` 等 API
4. 围栏展示：通过 `ready` 获取实例后绘制 `Polygon` 覆盖物

## 不适用场景

- 不需要地理定位的纯数据可视化（应使用 ECharts 等图表组件）
- 静态地图截图场景（高德静态图 API 更适合）
- 复杂地图交互组件库（CxMap 只做容器，业务需自行调用 AMap API）

---

## Props 示例

### amapKey（必填）

```vue
<template>
  <CxMap amap-key="your-amap-key-here" />
</template>
```

### version

```vue
<template>
  <CxMap amap-key="xxx" version="1.4.15" />
</template>
```

### plugins

```vue
<template>
  <CxMap
    amap-key="xxx"
    :plugins="['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation']"
  />
</template>
```

### options — 自定义中心和缩放

```vue
<template>
  <CxMap
    amap-key="xxx"
    :options="{ zoom: 15, center: [121.473701, 31.230416] }"
  />
</template>
```

### options — 3D 视图

```vue
<template>
  <CxMap
    amap-key="xxx"
    :options="{ viewMode: '3D', zoom: 16 }"
  />
</template>
```

---

## Emits 示例

### ready — 添加标记

```vue
<script setup lang="ts">
import { CxMap } from '@/components/CxMap'

function onReady(map: any, AMap: any) {
  const marker = new AMap.Marker({
    position: [116.397428, 39.90923],
    title: '天安门'
  })
  map.add(marker)
}
</script>

<template>
  <CxMap amap-key="xxx" @ready="onReady" />
</template>
```

### error — 错误处理

```vue
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CxMap } from '@/components/CxMap'

function onError(err: any) {
  ElMessage.error(`地图加载失败: ${err.message}`)
}
</script>

<template>
  <CxMap amap-key="xxx" @error="onError" />
</template>
```

---

## Expose 示例

### getMap — 外部控制地图

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CxMap } from '@/components/CxMap'

const mapRef = ref<InstanceType<typeof CxMap>>()

function flyToShanghai() {
  const map = mapRef.value?.getMap()
  if (map) {
    map.setZoomAndCenter(14, [121.473701, 31.230416])
  }
}
</script>

<template>
  <CxMap ref="mapRef" amap-key="xxx" />
  <el-button @click="flyToShanghai">飞到上海</el-button>
</template>
```

---

## 复杂场景

### 完整示例：标记列表 + 点击弹窗

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CxMap } from '@/components/CxMap'

const mapRef = ref<InstanceType<typeof CxMap>>()

const stores = [
  { name: '门店A', lng: 116.40, lat: 39.91 },
  { name: '门店B', lng: 116.42, lat: 39.92 },
  { name: '门店C', lng: 116.38, lat: 39.90 }
]

function onReady(map: any, AMap: any) {
  stores.forEach(store => {
    const marker = new AMap.Marker({
      position: [store.lng, store.lat],
      title: store.name
    })
    marker.on('click', () => {
      const info = new AMap.InfoWindow({
        content: `<div style="padding:8px"><b>${store.name}</b></div>`,
        offset: new AMap.Pixel(0, -30)
      })
      info.open(map, marker.getPosition())
    })
    map.add(marker)
  })
}
</script>

<template>
  <div style="height: 500px">
    <CxMap ref="mapRef" amap-key="xxx" @ready="onReady" />
  </div>
</template>
```

### 组件卸载清理验证

CxMap 在 `onBeforeUnmount` 中自动调用 `map.destroy()` 和 `clearEvents('click')`。业务方通过 `ready` 添加的覆盖物（Marker、Polyline 等）也会随 `map.destroy()` 一并被销毁，无需手动逐一移除。
