import { defineComponent, provide } from 'vue'
import { useNamespace } from '@/hooks'
import { FormContext } from './types'
import { FORM_CTX_INJECTION_KEY } from './constants'
import { formProps } from './props'
import { useFormCommon } from '@/components'

export default defineComponent({
  name: 'VForm',
  props: formProps,
  setup(props, { slots }) {
    const ns = useNamespace('form')
    const { size, labelAlign, labelWidth, readonly, disabled } = useFormCommon()
    const ctx: FormContext = {
      get size() {
        return size.value
      },
      get labelAlign() {
        return labelAlign.value
      },
      get labelWidth() {
        return labelWidth.value
      },
      get disabled() {
        return disabled.value
      },
      get readonly() {
        return readonly.value
      },
    }
    provide(FORM_CTX_INJECTION_KEY, ctx)
    return () => <form class={[ns.b('form')]}>{slots.default?.()}</form>
  },
})
