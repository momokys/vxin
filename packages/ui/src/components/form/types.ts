import { ComponentSize } from '@/utils'

export type FormLabelAlign = 'left' | 'right' | 'top'
export interface FormMeta {
  readonly size: ComponentSize
  readonly labelAlign: FormLabelAlign
  readonly labelWidth?: string | number
  readonly disabled?: boolean
  readonly readonly?: boolean
}
export interface FormContext extends FormMeta {}

export interface FormItemContext extends FormMeta {
  field?: string
}
