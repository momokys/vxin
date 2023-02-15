import Icon from './src/icon'
import { withInstall } from '@vxin/utils'

export default withInstall(Icon)
export const ZIcon = Icon
export type { IconProps } from './src/props'
export { iconProps } from './src/props'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ZIcon: typeof ZIcon
  }
}
