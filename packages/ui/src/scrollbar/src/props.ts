import { ExtractPropTypes, PropType } from 'vue'

export const scrollbarProps = {
  height: [Number, String] as PropType<number | string>,
  maxHeight: [Number, String] as PropType<number | string>,
  always: Boolean,
  gap: {
    type: Boolean,
    default: true,
  },
} as const

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
