## 典型场景
- 统计卡片
- 图表容器
- 功能入口卡片

## 不适用场景
- 纯内容包裹（应使用 CxContentWrap）
- 列表子项（使用 el-card 更轻量）

## 示例

### 1. 带标题和操作区
```vue
<CxCard title="用户列表">
  <template #header>
    <CxButton preIcon="plus" type="primary">新增</CxButton>
  </template>
  <CxTable :data="users" :columns="columns" />
</CxCard>
```
