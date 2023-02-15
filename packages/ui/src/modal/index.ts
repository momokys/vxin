import Modal from './src/modal'
import { withInstall } from '@vxin/utils'

export default withInstall(Modal)
export const ZModal = Modal
export type { ModalProps } from './src/props'
export { modalProps } from './src/props'

declare module 'vue' {
  export interface GlobalComponents {
    ZModal: typeof ZModal
  }
}
