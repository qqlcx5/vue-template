# CxUpload

## 设计意图
文件上传组件，基于 Element Plus el-upload 封装，增加文件类型限制、大小校验、自定义上传逻辑、拖拽上传、多文件管理、进度展示等。

## 功能边界
- 支持：图片/文件上传、多文件、拖拽、大小限制、类型限制、beforeUpload 校验、upload 自定义逻辑、onExceed 超限回调
- 不支持：断点续传、分片上传（需自定义 http-request）

## 依赖
- Element Plus `el-upload`

## 完整 API

### Props
| 参数 | 类型 | 默认值 | 必填 | 说明 |
|---|---|---|---|---|
| modelValue | `UploadFile \| UploadFile[]` | — | 否 | 已上传文件列表（v-model） |
| action | `string` | `''` | 否 | 上传接口地址 |
| multiple | `boolean` | `false` | 否 | 多文件上传 |
| drag | `boolean` | `false` | 否 | 拖拽上传 |
| limit | `number` | `1` | 否 | 最大文件数 |
| accept | `string` | `''` | 否 | 文件类型限制 |
| maxSize | `number` | `0` | 否 | 单文件最大大小（MB） |
| listType | `string` | `'text'` | 否 | 文件列表样式(text/picture/picture-card) |
| disabled | `boolean` | `false` | 否 | 禁用 |
| autoUpload | `boolean` | `true` | 否 | 自动上传 |

### Emits
| 事件名 | 参数 | 说明 |
|---|---|---|
| update:modelValue | `files` | 文件列表变化 |
