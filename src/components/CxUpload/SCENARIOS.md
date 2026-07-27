## 典型场景
- 图片上传（头像/商品图）
- 文件导入（Excel）
- 附件上传

## 不适用场景
- 需要上传进度条在页面上全局展示（应自定义）
- 大文件分片上传（需自定义 http-request）

## 示例

### 1. 图片上传
```vue
<CxUpload v-model="images" :action="uploadUrl" list-type="picture-card" :limit="3" accept="image/*" />
```

### 2. 文件拖拽上传
```vue
<CxUpload v-model="files" :action="uploadUrl" drag multiple :limit="5" :max-size="10" accept=".pdf,.doc,.docx" />
```
