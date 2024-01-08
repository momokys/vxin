import Form from './Form'
import Field from './Field'
import { withInstall } from '@vxin/utils'

import '@/style/form.scss'

export default withInstall(Form, {
  Field,
})
export const VForm = Form
export const VField = Field
export * from './props'
export * from './hooks/use-model'
export * from './hooks/use-form'
export * from './hooks/use-form-common'
