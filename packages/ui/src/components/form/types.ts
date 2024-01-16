import { ComponentSize } from '@/utils'
import { Dict, NilAble } from '@vxin/utils'

export type FormLabelAlign = 'left' | 'right' | 'top'
export interface FormMeta {
  readonly size: ComponentSize
  readonly labelAlign: FormLabelAlign
  readonly labelWidth?: string | number
  readonly readonly?: boolean
  readonly disabled?: boolean
}
export interface FormContext<T extends object = Dict> extends FormMeta {
  readonly data?: T
  readonly schema: FormSchema
  readonly isVModel?: boolean
}

export interface FieldContext extends FormMeta {
  readonly id: string
  readonly data: Record<string, any>
  readonly name?: string
  readonly parent?: NilAble<FieldContext>
  readonly isVModel?: boolean
}

export type FormSchema = ObjectSchema
export type FieldSchema = StringSchema | NumberSchema | BooleanSchema | ObjectSchema | ArraySchema | VoidSchema
export type FieldType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'void'
export interface VoidSchema {
  type: 'void'
  required?: boolean | ((data: any) => boolean)
  disabled?: boolean | ((data: any) => boolean)
  readonly?: boolean | ((data: any) => boolean)
}
export interface BaseSchema {
  type: FieldType
  required?: boolean | ((data: any) => boolean)
  disabled?: boolean | ((data: any) => boolean)
  readonly?: boolean | ((data: any) => boolean)
  value?: any
  rules?: Rule | Rule[]
}
export interface StringSchema extends BaseSchema {
  type: 'string'
}
export interface NumberSchema extends BaseSchema {
  type: 'number'
}
export interface BooleanSchema extends BaseSchema {
  type: 'boolean'
}
export interface ObjectSchema extends BaseSchema {
  type: 'object'
  fields?: Record<string, FieldSchema>
}
export interface ArraySchema extends BaseSchema {
  type: 'array'
  item?: FieldSchema
}
export interface Rule {
  min?: number
  max?: number
  enum?: any[]
  regExp?: RegExp
  msg?: string
  trigger?: string
}
