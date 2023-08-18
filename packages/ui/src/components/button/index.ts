import Btn from './button'
import { withInstall } from '@vxin/utils'
import '@/style/button.scss'

export default withInstall(Btn)
export const VBtn = Btn
export { btnProps } from './props'
export type { BtnProps, BtnType, BtnStatus, BtnShape } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    VBtn: typeof VBtn
  }
}
