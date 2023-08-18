import BtnGroup from './button-group'
import { withInstall } from '@vxin/utils'
import '@/style/button-group.scss'

export default withInstall(BtnGroup)
export const VBtnGroup = BtnGroup
export { btnGroupProps } from './props'
export { BTN_GROUP_CTX_INJECT_KEY } from './button-group'
export type { BtnGroupProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    VBtnGroup: typeof VBtnGroup
  }
}
