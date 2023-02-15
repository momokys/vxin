import Button from './src/button'
import { withInstall } from '@vxin/utils'

export default withInstall(Button)
export const ZButton = Button
export { buttonProps } from './src/props'
export type { ButtonProps, ButtonType } from './src/props'

declare module 'vue' {
  export interface GlobalComponents {
    ZButton: typeof ZButton
  }
}
