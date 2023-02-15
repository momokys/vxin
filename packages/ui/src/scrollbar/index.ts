import Scrollbar from './src/scrollbar'
import { withInstall } from '@vxin/utils'

export const ZScrollbar = withInstall(Scrollbar)
export type { ScrollbarProps } from './src/props'
export { scrollbarProps } from './src/props'
export default ZScrollbar

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ZScrollbar: typeof ZScrollbar
  }
}
