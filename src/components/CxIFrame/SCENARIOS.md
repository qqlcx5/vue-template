## 典型场景
- 嵌入第三方监控看板（Grafana 等）
- 嵌入帮助文档页面
- 微前端子应用容器

## 不适用场景
- 需频繁父子通信（应使用微前端框架）
- 跨域且子页面不支持 postMessage

## 示例

### 1. 基础用法
```vue
<CxIFrame src="https://example.com/help" />
```
