import Message from './message'
import { withInstallFn } from '@vxin/utils'
import '@/style/message.scss'

export const message = withInstallFn(Message, '$message')
export * from './props'
export default message
