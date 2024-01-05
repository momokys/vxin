import { inject } from 'vue'
import { FORM_CTX_INJECTION_KEY, FIELD_CTX_INJECTION_KEY } from '../constants'

export function useForm() {
  const form = inject(FORM_CTX_INJECTION_KEY, null)
  const formItem = inject(FIELD_CTX_INJECTION_KEY, null)
  return [form, formItem] as const
}
