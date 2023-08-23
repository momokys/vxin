import Seq from './seq'
import { withInstall } from '@vxin/utils'

export default withInstall(Seq)
export const VSeq = Seq

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VSeq: typeof VSeq
  }
}
