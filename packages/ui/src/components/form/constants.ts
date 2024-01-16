import { InjectionKey } from 'vue'
import { FieldContext, FieldSchema, FormContext } from './types'

export const FORM_CTX_INJECTION_KEY: InjectionKey<FormContext> = Symbol('FORM_CTX_INJECTION_KEY')
export const FIELD_CTX_INJECTION_KEY: InjectionKey<FieldContext> = Symbol('FIELD_CTX_INJECTION_KEY')
export const SCHEMA_INJECTION_KEY: InjectionKey<FieldSchema> = Symbol('SCHEMA_INJECTION_KEY')
