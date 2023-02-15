import Space from './space'
import { withInstall } from '@vxin/utils'
import '@/_style/space.scss'

export const VSpace = withInstall(Space)
export type { SpaceProps } from './props'
export { spaceProps } from './props'
export default VSpace

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VSpace: typeof VSpace
  }
}
