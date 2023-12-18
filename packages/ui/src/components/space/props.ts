import { ExtractPropTypes, PropType } from 'vue'
import { ComponentSize } from '@/utils'

export type Align = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
export type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'

export const spaceProps = {
  justify: {
    type: String as PropType<Justify>,
    default: 'start',
  },
  align: {
    type: String as PropType<Align>,
    default: 'start',
  },
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal',
  },
  size: {
    type: [String, Number, Array] as PropType<Exclude<ComponentSize, 'mini'> | number | [number, number]>,
    default: 'medium',
  },
  inline: Boolean,
  wrap: Boolean,
  reverse: Boolean,
}

export type SpaceProps = ExtractPropTypes<typeof spaceProps>
