import _message from './function'
import { withInstallFn } from '@vxin/utils'
import '@/style/message.scss'


export const message = withInstallFn(_message, '$message')
export default message

