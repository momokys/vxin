import { PropType, ExtractPropTypes, Component } from 'vue'
import { ComponentSize } from '@/utils'

export type BtnType = 'text' | 'link' | 'outline' | 'default' | ''
export type BtnStatus = 'primary' | 'success' | 'warning' | 'danger' | 'default' | ''
export type BtnShape = 'circle' | 'round' | 'default' | ''
export const btnProps = {
  label: String,
  tag: {
    type: String,
    default: 'button',
  },
  type: String as PropType<BtnType>,
  shape: {
    type: String as PropType<BtnShape>,
    default: '',
  },
  size: String as PropType<ComponentSize>,
  status: {
    type: String as PropType<BtnStatus>,
    default: '',
  },
  color: String,
  icon: [String, Object] as PropType<string | Component>,
  loading: Boolean,
  loadingIcon: [String, Object] as PropType<string | Component>,
  disabled: Boolean,
  block: Boolean,
  href: {
    type: String,
    default: '#',
  },
}

export type BtnProps = Partial<ExtractPropTypes<typeof btnProps>>
