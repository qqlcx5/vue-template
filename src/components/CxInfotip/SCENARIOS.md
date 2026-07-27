## 典型场景
- 表单标签旁的解释说明
- 表格列头补充说明
- 配置项旁的使用提示

## 不适用场景
- 需要点击触发的说明（应使用 el-popover）

## 示例

### 与表单标签配合
```vue
<el-form-item>
  <template #label>
    密码 <CxInfotip content="密码长度 8-20 位，需包含字母和数字" />
  </template>
  <CxInputPassword v-model="password" />
</el-form-item>
```
