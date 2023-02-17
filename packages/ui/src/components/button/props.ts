import { PropType, ExtractPropTypes, VNode, Component } from 'vue'
import { ComponentSize } from '@vxin/utils'

export type ButtonType = 'default' | 'text' | 'link' | 'outline'
export type ButtonStatus = 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info'

export const buttonProps = {
  label: String,
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  status: String as PropType<ButtonStatus>,
  color: String,
  size: {
    type: String as PropType<ComponentSize>,
    default: 'medium',
  },
  icon: [String, Object] as PropType<string | Component>,
  iconPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  loading: Boolean,
  loadingIcon: [String, Object] as PropType<string | Component>,
  disabled: Boolean,
  circle: Boolean,
  round: Boolean,
  block: Boolean,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
