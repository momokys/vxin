import { PropType, ExtractPropTypes } from 'vue'
import { ComponentSize } from '@/utils'

export const inputProps = {
  modelValue: [String, Number] as PropType<string | number>,
  placeholder: String,
  size: String as PropType<ComponentSize>,
  maxLen: Number,
  wordLen: Function as PropType<(word: string) => number>,
  clearable: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  error: Boolean,
  full: {
    type: [Boolean, undefined] as PropType<boolean>,
    default: undefined,
  },
}

export type InputProps = Partial<ExtractPropTypes<typeof inputProps>>
