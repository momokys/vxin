import { computed, defineComponent, getCurrentInstance, provide } from 'vue'
import { useNamespace } from '@/hooks'
import { FormContext } from './types'
import { FORM_CTX_INJECTION_KEY } from './constants'
import { formProps } from './props'
import { useFormCommon } from '@/components'
import { useVModel } from '@vxin/hooks'
import { isFunction } from '@vxin/utils'

export default defineComponent({
  name: 'VForm',
  props: formProps,
  setup(props, { slots }) {
    const ns = useNamespace('form')
    const ins = getCurrentInstance()
    const model = useVModel(props, 'model')
    const isVModel = computed(() => isFunction(ins?.proxy?.$attrs['onUpdate:model']))
    const { size, labelAlign, labelWidth, readonly, disabled } = useFormCommon()
    const ctx: FormContext = {
      get model() {
        return model.value
      },
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
      get isVModel() {
        return isVModel.value
      },
    }
    provide(FORM_CTX_INJECTION_KEY, ctx)
    return () => <form class={[ns.b('form')]}>{slots.default?.()}</form>
  },
})
