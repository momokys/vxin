import Space from './space'
import { withInstall } from '@vxin/utils'
import '@/style/space.scss'

export default withInstall(Space)
export const VSpace = Space
export type { SpaceProps } from './props'
export { spaceProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    VSpace: typeof VSpace
  }
}
