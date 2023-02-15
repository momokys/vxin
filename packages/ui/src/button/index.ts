import Button from './button'
import { withInstall } from '@vxin/utils'
import '@/_style/button.scss'

export default withInstall(Button)
export const VButton = Button
export { buttonProps } from './props'
export type { ButtonProps, ButtonType } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    VButton: typeof VButton
  }
}
