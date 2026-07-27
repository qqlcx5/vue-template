// ============================================================
// CxIcon - 通用图标组件
// ============================================================
// 参考 vue-pure-admin/ReIcon 设计，简化为：
//   - 统一 SFC 组件（非 render 函数）
//   - 去掉在线/离线分离，统一动态加载
//   - 默认支持 MDI 图标库，可扩展任意 @iconify-json/* 图标集
//   - 提供 useRenderIcon 函数式调用入口
//   - 提供 CxIconSelect 图标选择器

import CxIcon from './src/CxIcon.vue'
import CxIconSelect from './src/CxIconSelect.vue'

export { CxIcon, CxIconSelect }
export { useRenderIcon } from './src/useRenderIcon'
export {
  useIconLoad,
  loadIconSet,
  ensureIcon,
  parseIconName,
  getIconNames,
  isIconSetAvailable,
} from './src/useIconLoad'
export type { CxIconProps, CxIconEmits } from './src/types'

export default CxIcon
