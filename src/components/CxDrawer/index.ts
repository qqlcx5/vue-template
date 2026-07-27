import CxDrawer from './src/CxDrawer.vue'
import { drawerStore, addDrawer, closeDrawer, updateDrawer, closeAllDrawer } from './src/useDrawer'

export * from './src/types'
export {
  drawerStore,
  addDrawer,
  closeDrawer,
  updateDrawer,
  closeAllDrawer
}

export { CxDrawer }

export const CxDrawerComponent = CxDrawer
export default CxDrawer
