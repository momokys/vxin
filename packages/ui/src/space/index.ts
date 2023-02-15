import Space from './src/space'
import { withInstall } from '@vxin/utils'

export const ZSpace = withInstall(Space)
export type { SpaceProps } from './src/props'
export { spaceProps } from './src/props'
export default ZSpace

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ZSpace: typeof ZSpace
  }
}
