import Scrollbar from './scrollbar'
import { withInstall } from '@vxin/utils'
import '@/_style/scrollbar.scss'

export const VScrollbar = withInstall(Scrollbar)
export type { ScrollbarProps } from './props'
export { scrollbarProps } from './props'
export default VScrollbar

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VScrollbar: typeof VScrollbar
  }
}
