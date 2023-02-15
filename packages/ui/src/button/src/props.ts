import { PropType, ExtractPropTypes, VNode, Component } from 'vue'
import { ComponentSize } from '@vxin/utils'

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

export const buttonProps = {
  label: String,
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  color: String,
  size: {
    type: String as PropType<ComponentSize>,
    default: 'medium',
  },
  icon: [String, Object, Function] as PropType<string | Component>,
  iconPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  loading: Boolean,
  loadingLabel: String,
  loadingIcon: [String, Object] as PropType<string | VNode>,
  loadingType: String as PropType<ButtonType>,
  disabled: Boolean,
  circle: Boolean,
  round: Boolean,
  text: Boolean,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
