import Form from './Form'
import Item from './FormItem'
import { withInstall } from '@vxin/utils'

import '@/style/form.scss'

export default withInstall(Form, {
  Item,
})
export const VForm = Form
export const VFormItem = Item
export * from './hooks/use-form'
export * from './hooks/use-form-common'
