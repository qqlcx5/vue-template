import CxDialog from './src/CxDialog.vue'
import { dialogStore, addDialog, closeDialog, updateDialog, closeAllDialog } from './src/useDialog'

export * from './src/types'
export {
  dialogStore,
  addDialog,
  closeDialog,
  updateDialog,
  closeAllDialog
}

export { CxDialog }
export const CxDialogComponent = CxDialog
export default CxDialog
