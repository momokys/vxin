import Modal from './modal'
import { withInstall } from '@vxin/utils'
import '@/style/modal.scss'

export default withInstall(Modal)
export const VModal = Modal
export type { ModalProps } from './props'
export { modalProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    VModal: typeof VModal
  }
}
