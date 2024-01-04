import { PropType, ExtractPropTypes } from 'vue'
import { ComponentSize } from '@/utils'

export const inputProps = {
  modelValue: String as PropType<string>,
  type: String as PropType<'text' | 'password'>,
  placeholder: String,
  size: String as PropType<ComponentSize>,
  maxLen: Number,
  wordLen: Function as PropType<(word: string) => number>,
  showWordLimit: Boolean,
  allowOver: Boolean,
  clearable: Boolean,
  disabled: {
    type: Boolean,
    default: undefined,
  },
  readonly: {
    type: Boolean,
    default: undefined,
  },
  error: Boolean,
  full: {
    type: [Boolean, undefined] as PropType<boolean>,
    default: undefined,
  },
}

export type InputProps = Partial<ExtractPropTypes<typeof inputProps>>
