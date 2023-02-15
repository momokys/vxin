import { Component, ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  icon: [String, Object, Function] as PropType<string | Component>,
  size: [String, Number],
  color: String,
}

export type IconProps = ExtractPropTypes<typeof iconProps>
