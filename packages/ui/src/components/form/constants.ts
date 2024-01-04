import { InjectionKey } from 'vue'
import { FormContext, FormItemContext } from './types'

export const FORM_CTX_INJECTION_KEY: InjectionKey<FormContext> = Symbol('FORM_CTX_INJECTION_KEY')
export const FORM_ITEM_CTX_INJECTION_KEY: InjectionKey<FormItemContext> = Symbol('FORM_ITEM_CTX_INJECTION_KEY')
