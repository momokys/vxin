import Icon from './icon'
import { withInstall } from '@vxin/utils'
import '@/style/icon.scss'

export default withInstall(Icon)
export const VIcon = Icon
export type { IconProps } from './props'
export { iconProps } from './props'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VIcon: typeof VIcon
  }
}
