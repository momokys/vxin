import Icon from './icon'
import { withInstall } from '@vxin/utils'
import '@/_style/icon.scss'

export default withInstall(Icon)
export const ZIcon = Icon
export type { IconProps } from './props'
export { iconProps } from './props'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ZIcon: typeof ZIcon
  }
}
