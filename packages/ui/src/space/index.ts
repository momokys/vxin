import Space from './space'
import { withInstall } from '@vxin/utils'
import '@/_style/space.scss'

export const ZSpace = withInstall(Space)
export type { SpaceProps } from './props'
export { spaceProps } from './props'
export default ZSpace

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ZSpace: typeof ZSpace
  }
}
