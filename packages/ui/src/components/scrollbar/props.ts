import { ExtractPropTypes } from 'vue'

export const scrollbarProps = {
  embed: Boolean,
}

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
