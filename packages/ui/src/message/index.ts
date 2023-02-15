import _message from './src/function'
import { withInstallFn } from '@vxin/utils'

export const message = withInstallFn(_message, '$message')
export default message

