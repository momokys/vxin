import Input from './Input'
import { withInstall } from '@vxin/utils'
import '@/style/input.scss'

export default withInstall(Input)
export const VInput = Input
export { inputProps } from './props'
export type { InputProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    VInput: typeof VInput
  }
}
