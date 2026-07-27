<template>
  <div class="demo-page">
    <el-card header="CxMap — 地图组件" shadow="never">
      <el-alert type="info" :closable="false" show-icon style="margin-bottom: 16px">
        CxMap 基于高德地图 JS API 封装，支持插件加载、自定义配置、3D 视图、标记列表等。
        通过 ready 事件获取 map 和 AMap 实例进行业务定制。
      </el-alert>

      <!-- 场景1：amapKey 必填 + options 自定义中心和缩放 -->
      <h3>场景1：基础用法（amapKey + options 自定义中心和缩放）</h3>
      <CxMap
        amap-key="4c9cd5eef52cf300e8bd3b408fa93aac"
        :options="{ zoom: 13, center: [116.397428, 39.90923] }"
        style="height: 360px; margin-bottom: 24px"
        @ready="onMapReady"
        @error="onMapError"
      />

      <!-- 场景2：version 指定版本 -->
      <h3>场景2：version 指定版本</h3>
      <el-alert type="info" :closable="false" style="margin-bottom: 8px">
        可通过 version prop 指定高德 JS API 版本，默认为 2.0。
      </el-alert>
      <CxMap
        amap-key="4c9cd5eef52cf300e8bd3b408fa93aac"
        version="2.0"
        :options="{ zoom: 12, center: [121.473701, 31.230416] }"
        style="height: 360px; margin-bottom: 24px"
      />

      <!-- 场景3：plugins 加载插件 -->
      <h3>场景3：plugins 加载插件（Scale + ToolBar + Geolocation）</h3>
      <CxMap
        amap-key="4c9cd5eef52cf300e8bd3b408fa93aac"
        :plugins="['AMap.Scale', 'AMap.ToolBar', 'AMap.Geolocation']"
        :options="{ zoom: 12, center: [121.473701, 31.230416] }"
        style="height: 360px; margin-bottom: 24px"
      />

      <!-- 场景4：options 3D 视图 -->
      <h3>场景4：3D 视图（viewMode: '3D' + pitch）</h3>
      <CxMap
        amap-key="4c9cd5eef52cf300e8bd3b408fa93aac"
        :options="{
          zoom: 14,
          center: [116.397428, 39.90923],
          pitch: 45,
          viewMode: '3D'
        }"
        style="height: 400px; margin-bottom: 24px"
      />

      <!-- 场景5：ready emit 添加标记 -->
      <h3>场景5：ready emit 添加标记</h3>
      <CxMap
        ref="markerMapRef"
        amap-key="4c9cd5eef52cf300e8bd3b408fa93aac"
        :options="{ zoom: 13, center: [116.397428, 39.90923] }"
        style="height: 360px; margin-bottom: 24px"
        @ready="onReadyAddMarker"
      />

      <!-- 场景6：error emit 错误处理 -->
      <h3>场景6：error emit 错误处理</h3>
      <el-alert type="warning" :closable="false" style="margin-bottom: 8px">
        当 amapKey 无效或网络异常时，error 事件会被触发。
      </el-alert>
      <CxMap
        amap-key="invalid-key-test"
        :options="{ zoom: 11 }"
        style="height: 300px; margin-bottom: 24px"
        @error="onMapErrorExplicit"
      />

      <!-- 场景7：getMap expose 外部控制地图 -->
      <h3>场景7：getMap expose 外部控制地图</h3>
      <el-row :gutter="12" style="margin-bottom: 12px">
        <el-button @click="flyToShanghai">飞到上海</el-button>
        <el-button @click="resetView">重置视图</el-button>
        <el-button @click="getZoom">获取缩放级别</el-button>
        <el-button @click="addRandomMarker">添加随机标记</el-button>
      </el-row>
      <CxMap
        ref="controlMapRef"
        amap-key="4c9cd5eef52cf300e8bd3b408fa93aac"
        :options="{ zoom: 13, center: [116.397428, 39.90923] }"
        style="height: 360px; margin-bottom: 24px"
      />

      <!-- 场景8：复杂场景 — 标记列表 + 点击弹窗 -->
      <h3>场景8：复杂场景（标记列表 + 点击弹窗）</h3>
      <CxMap
        amap-key="4c9cd5eef52cf300e8bd3b408fa93aac"
        :plugins="['AMap.AdvancedInfoWindow']"
        :options="{ zoom: 12, center: [116.397428, 39.90923] }"
        style="height: 450px"
        @ready="onReadyWithMarkers"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CxMap } from '@/components/CxMap'

const markerMapRef = ref<InstanceType<typeof CxMap>>()
const controlMapRef = ref<InstanceType<typeof CxMap>>()

// 场景1：地图就绪
function onMapReady(map: any, AMap: any) {
  console.log('地图实例:', map)
  console.log('AMap 命名空间:', AMap)
  ElMessage.success('地图加载完成')
}

function onMapError(err: any) {
  console.error('地图加载失败:', err)
  ElMessage.error('地图加载失败')
}

// 场景5：就绪后添加标记
function onReadyAddMarker(map: any, AMap: any) {
  const marker = new AMap.Marker({
    position: [116.397428, 39.90923],
    title: '天安门'
  })
  map.add(marker)
}

// 场景6：错误处理
function onMapErrorExplicit(err: any) {
  console.error('地图加载失败（预期行为）:', err)
  ElMessage.error(`地图加载失败: ${err?.message || '请检查 amapKey'}`)
}

// 场景7：外部控制
function flyToShanghai() {
  const map = controlMapRef.value?.getMap()
  if (map) {
    map.setZoomAndCenter(12, [121.473701, 31.230416])
    ElMessage.info('已飞到上海')
  } else {
    ElMessage.warning('地图尚未加载')
  }
}

function resetView() {
  const map = controlMapRef.value?.getMap()
  if (map) {
    map.setZoomAndCenter(13, [116.397428, 39.90923])
    ElMessage.info('已重置视图')
  }
}

function getZoom() {
  const map = controlMapRef.value?.getMap()
  if (map) {
    ElMessage.info(`当前缩放级别: ${map.getZoom()}`)
  }
}

function addRandomMarker() {
  const map = controlMapRef.value?.getMap()
  if (!map) return
  const lng = 116.397428 + (Math.random() - 0.5) * 0.1
  const lat = 39.90923 + (Math.random() - 0.5) * 0.1
  const AMapNS = (window as any).AMap
  if (AMapNS) {
    const marker = new AMapNS.Marker({
      position: [lng, lat],
      title: `随机标记 (${lng.toFixed(4)}, ${lat.toFixed(4)})`
    })
    map.add(marker)
    ElMessage.success(`已添加标记: ${lng.toFixed(4)}, ${lat.toFixed(4)}`)
  }
}

// 场景8：标记列表 + 弹窗
const markerList = [
  { position: [116.397428, 39.90923], title: '天安门', content: '<div style="padding:8px"><b>天安门广场</b><br/>北京市中心</div>' },
  { position: [116.413384, 39.910925], title: '王府井', content: '<div style="padding:8px"><b>王府井商业街</b><br/>购物天堂</div>' },
  { position: [116.373099, 39.917694], title: '西单', content: '<div style="padding:8px"><b>西单大悦城</b><br/>时尚购物中心</div>' }
]

function onReadyWithMarkers(map: any, AMap: any) {
  markerList.forEach(item => {
    const marker = new AMap.Marker({
      position: item.position,
      title: item.title
    })
    const infoWindow = new AMap.InfoWindow({
      content: item.content,
      offset: new AMap.Pixel(0, -30)
    })
    marker.on('click', () => {
      infoWindow.open(map, item.position)
    })
    map.add(marker)
  })
}
</script>

<style scoped lang="scss">
.demo-page {
  padding: 16px;

  h3 {
    margin: 16px 0 8px;
    font-size: 15px;
    color: var(--el-text-color-primary);
  }
}
</style>
