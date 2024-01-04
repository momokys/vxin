import { PropType } from 'vue'
import { FormLabelAlign } from './types'
import { ComponentSize } from '@/utils'

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
}

export const formItemProps = {
  ...formCommonProps(),
  field: String,
  label: String,
}
