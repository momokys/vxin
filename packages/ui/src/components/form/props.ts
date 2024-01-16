import { ExtractPropTypes, PropType } from 'vue'
import { FormSchema, FormLabelAlign, FieldType, Rule } from './types'
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
  required: Boolean,
  label: String,
  type: String as PropType<FieldType>,
  name: String,
  rules: [Object, Array] as PropType<Rule | Rule[]>,
}
export type FieldProps = ExtractPropTypes<typeof fieldProps>
