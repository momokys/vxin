import Modal from './modal'
import { withInstall } from '@vxin/utils'
import '@/_style/modal.scss'


export default withInstall(Modal)
export const ZModal = Modal
export type { ModalProps } from './props'
export { modalProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    ZModal: typeof ZModal
  }
}
