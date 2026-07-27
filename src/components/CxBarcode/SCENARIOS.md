# CxBarcode 场景说明

## 典型场景

- 订单管理系统中展示订单编号条形码，便于扫码枪快速读取。
- 资产管理系统为每个设备生成唯一条形码标签。
- 商品入库/出库时打印产品条码。

## 不适用场景

- 需要生成二维码的场景（JsBarcode 不支持二维码，请使用 qrcode 等库）。
- 需要扫描识别条形码的场景（本组件仅负责生成）。
- `text` 为空时组件不会渲染任何内容。

---

## 示例

### 基础用法：默认 Canvas 渲染 CODE128

```vue
<template>
  <CxBarcode text="6901234567890" />
</template>

<script setup lang="ts">
import CxBarcode from '@/components/CxBarcode'
</script>
```

### 自定义条码格式（EAN-13）

```vue
<template>
  <CxBarcode text="5901234123457" type="EAN13" />
</template>

<script setup lang="ts">
import CxBarcode from '@/components/CxBarcode'
</script>
```

### SVG 渲染

```vue
<template>
  <CxBarcode text="ABC-123-XYZ" tag="svg" />
</template>

<script setup lang="ts">
import CxBarcode from '@/components/CxBarcode'
</script>
```

### Img 渲染

```vue
<template>
  <CxBarcode text="ORDER-2024-001" tag="img" />
</template>

<script setup lang="ts">
import CxBarcode from '@/components/CxBarcode'
</script>
```

### 完整配置：颜色、尺寸、文本显示

```vue
<template>
  <CxBarcode
    text="123456789012"
    type="CODE128"
    :options="barcodeOptions"
  />
</template>

<script setup lang="ts">
import CxBarcode from '@/components/CxBarcode'

const barcodeOptions = {
  lineColor: '#2c3e50',
  width: 2,
  height: 80,
  displayValue: true,
  fontSize: 14,
  textMargin: 4,
  margin: 10,
  background: '#f9f9f9'
}
</script>
```

### 隐藏底部文本

```vue
<template>
  <CxBarcode
    text="6001234567890"
    :options="{ displayValue: false }"
  />
</template>

<script setup lang="ts">
import CxBarcode from '@/components/CxBarcode'
</script>
```

### 响应式更新：动态切换内容与格式

```vue
<template>
  <el-form>
    <el-form-item label="内容">
      <el-input v-model="text" />
    </el-form-item>
    <el-form-item label="格式">
      <el-select v-model="format">
        <el-option value="CODE128" label="CODE128" />
        <el-option value="EAN13" label="EAN13" />
        <el-option value="UPC" label="UPC" />
      </el-select>
    </el-form-item>
  </el-form>
  <CxBarcode :text="text" :type="format" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CxBarcode from '@/components/CxBarcode'

const text = ref('6901234567890')
const format = ref('CODE128')
</script>
```

### 复杂场景：批量订单条形码列表

```vue
<template>
  <el-table :data="orders">
    <el-table-column prop="orderNo" label="订单号" />
    <el-table-column label="条形码">
      <template #default="{ row }">
        <CxBarcode
          :text="row.orderNo"
          :options="{ width: 1.5, height: 40, fontSize: 10, displayValue: false }"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import CxBarcode from '@/components/CxBarcode'

const orders = [
  { orderNo: '202407010001' },
  { orderNo: '202407010002' },
  { orderNo: '202407010003' }
]
</script>
```
