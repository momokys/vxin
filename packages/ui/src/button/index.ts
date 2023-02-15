import Button from './button'
import { withInstall } from '@vxin/utils'
import '@/_style/button.scss'

export default withInstall(Button)
export const ZButton = Button
export { buttonProps } from './props'
export type { ButtonProps, ButtonType } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    ZButton: typeof ZButton
  }
}
