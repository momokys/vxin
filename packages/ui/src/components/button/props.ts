import { PropType, ExtractPropTypes, Component } from 'vue'
import { ComponentSize } from '@vxin/utils'

export type ButtonType = 'text' | 'link' | 'outline' | 'default' | ''
export type ButtonStatus = 'primary' | 'success' | 'warning' | 'danger' | 'default' | ''
export type ButtonShape = 'circle' | 'round' | 'default' | ''
export const buttonProps = {
  label: String,
  tag: {
    type: String,
    default: 'button',
  },
  type: {
    type: String as PropType<ButtonType>,
    default: '',
  },
  shape: {
    type: String as PropType<ButtonShape>,
    default: '',
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'medium',
  },
  status: {
    type: String as PropType<ButtonStatus>,
    default: 'primary',
  },
  color: String,
  icon: [String, Object] as PropType<string | Component>,
  loading: Boolean,
  loadingIcon: [String, Object] as PropType<string | Component>,
  disabled: Boolean,
  block: Boolean,
}

export type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>
