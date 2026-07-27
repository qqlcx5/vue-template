## 典型场景
- 搜索表单提交/重置按钮
- 表格行操作按钮（编辑/删除）
- 弹窗确认/取消按钮

## 不适用场景
- 纯图标按钮无文字（直接使用 el-button icon）
- 需要下拉菜单的按钮（使用 el-dropdown）

## 示例

### 1. 带图标的确认按钮
```vue
<CxButton type="primary" preIcon="check" @click="submit">提交</CxButton>
```

### 2. Loading 状态按钮
```vue
<CxButton type="primary" :loading="saving" loadingText="保存中..." @click="save">保存</CxButton>
```
说明：loading 状态下按钮禁用且显示 loadingText；若未传 loadingText，默认显示 slot 内容。

### 3. 表格行操作
```vue
<CxButton preIcon="edit" text type="primary" @click="edit(row)">编辑</CxButton>
<CxButton preIcon="delete" text type="danger" @click="remove(row)">删除</CxButton>
```
