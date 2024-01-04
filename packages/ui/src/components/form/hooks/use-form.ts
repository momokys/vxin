import { inject } from 'vue'
import { FORM_CTX_INJECTION_KEY, FORM_ITEM_CTX_INJECTION_KEY } from '../constants'

export function useForm() {
  const form = inject(FORM_CTX_INJECTION_KEY, null)
  const formItem = inject(FORM_ITEM_CTX_INJECTION_KEY, null)
  return [form, formItem]
}
