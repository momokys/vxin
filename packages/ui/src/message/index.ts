import _message from './function'
import { withInstallFn } from '@vxin/utils'
import '@/_style/message.scss'


export const message = withInstallFn(_message, '$message')
export default message

