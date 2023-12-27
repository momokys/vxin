import Scrollbar from './scrollbar'
import { withInstall } from '@vxin/utils'
import '@/style/scrollbar.scss'

export const VScrollbar = Scrollbar
export type { ScrollbarProps } from './props'
export { scrollbarProps } from './props'
export default withInstall(Scrollbar)

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VScrollbar: typeof VScrollbar
  }
}
