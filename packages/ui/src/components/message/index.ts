import { message as msgUtils } from './utils'
import { withInstallFn } from '@vxin/utils'
import '@/style/message.scss'

export const message = withInstallFn(msgUtils, '$message')
export default message
