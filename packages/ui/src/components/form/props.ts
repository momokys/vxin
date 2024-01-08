import { ExtractPropTypes, PropType } from 'vue'
import { FormSchema, FieldSchema, FormLabelAlign } from './types'
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
  data: Object as PropType<Dict>,
  schema: Object as PropType<FormSchema>,
}
export type FormProps = ExtractPropTypes<typeof formProps>

export const fieldProps = {
  ...formCommonProps(),
  name: String,
  label: String,
  schema: Object as PropType<FieldSchema>,
}
export type FieldProps = ExtractPropTypes<typeof fieldProps>
