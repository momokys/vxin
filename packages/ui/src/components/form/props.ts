import { ExtractPropTypes, PropType } from 'vue'
import { FormLabelAlign } from './types'
import { ComponentSize } from '@/utils'
import { Dict } from '@vxin/utils'

const formCommonProps = () => ({
  labelWidth: [String, Number],
  labelAlign: String as PropType<FormLabelAlign>,
  size: String as PropType<ComponentSize>,
  readonly: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
})

export const formProps = {
  ...formCommonProps(),
  model: Object as PropType<Dict>,
}
export type FormProps = ExtractPropTypes<typeof formProps>

export const fieldProps = {
  ...formCommonProps(),
  name: String,
  label: String,
}
export type FieldProps = ExtractPropTypes<typeof fieldProps>
