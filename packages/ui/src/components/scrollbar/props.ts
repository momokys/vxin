import { ExtractPropTypes, PropType } from 'vue'

export const scrollbarProps = {
  height: [Number, String] as PropType<number | string>,
  maxHeight: [Number, String] as PropType<number | string>,
  embed: Boolean,
} as const

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
