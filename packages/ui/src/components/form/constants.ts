import { InjectionKey } from 'vue'
import { FieldContext, FormContext } from './types'

export const FORM_CTX_INJECTION_KEY: InjectionKey<FormContext> = Symbol('FORM_CTX_INJECTION_KEY')
export const FIELD_CTX_INJECTION_KEY: InjectionKey<FieldContext> = Symbol('FIELD_CTX_INJECTION_KEY')
