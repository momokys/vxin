import { ExtractPropTypes, PropType } from 'vue'
import { ComponentSize } from '@/utils'

export const btnGroupProps = {
  size: String as PropType<ComponentSize>,
  disabled: Boolean,
}

export type BtnGroupProps = Partial<ExtractPropTypes<typeof btnGroupProps>>
