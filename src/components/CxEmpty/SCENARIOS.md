## 典型场景
- 列表/表格无数据时展示空状态
- 搜索无结果时提示
- 空文件夹/空收藏夹占位

## 不适用场景
- 加载中状态（应使用 v-loading）
- 错误状态（应使用 CxError）

## 示例

### 1. 基础用法
```vue
<template>
  <CxEmpty />
</template>
```

### 2. 自定义描述与操作
```vue
<template>
  <CxEmpty description="暂无收藏内容">
    <el-button type="primary">去逛逛</el-button>
  </CxEmpty>
</template>
```
说明：通过默认插槽插入操作按钮，引导用户去产生内容。
