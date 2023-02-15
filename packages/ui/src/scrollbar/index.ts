import Scrollbar from './scrollbar'
import { withInstall } from '@vxin/utils'
import '@/_style/scrollbar.scss'

export const ZScrollbar = withInstall(Scrollbar)
export type { ScrollbarProps } from './props'
export { scrollbarProps } from './props'
export default ZScrollbar

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ZScrollbar: typeof ZScrollbar
  }
}
