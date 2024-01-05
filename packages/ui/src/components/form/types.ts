import { ComponentSize } from '@/utils'
import { Dict, NilAble } from '@vxin/utils'

export type FormLabelAlign = 'left' | 'right' | 'top'
export interface FormMeta {
  readonly size: ComponentSize
  readonly labelAlign: FormLabelAlign
  readonly labelWidth?: string | number
  readonly disabled?: boolean
  readonly readonly?: boolean
}
export interface FormContext<T extends object = Dict> extends FormMeta {
  model?: T
  isVModel?: boolean
}

export interface FieldContext extends FormMeta {
  readonly id: string
  readonly model: Record<string, any>
  readonly name?: string
  readonly parent?: NilAble<FieldContext>
  readonly isVModel?: boolean
}
