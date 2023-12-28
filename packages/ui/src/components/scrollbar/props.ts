import { ExtractPropTypes } from 'vue'

export const scrollbarProps = {
  height: [Number, String],
  maxHeight: [Number, String],
  embed: Boolean,
}

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
