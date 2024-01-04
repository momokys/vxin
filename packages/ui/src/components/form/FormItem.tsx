import { defineComponent, provide } from 'vue'
import { useNamespace } from '@/hooks'
import { addunit, isEmpty } from '@vxin/utils'
import { useFormCommon } from '@/components'
import { FormItemContext } from './types'
import { FORM_ITEM_CTX_INJECTION_KEY } from './constants'
import { formItemProps } from './props'

export default defineComponent({
  name: 'VFormItem',
  props: formItemProps,
  setup(props, { slots }) {
    const ns = useNamespace('form-item')
    const { size, labelAlign, labelWidth, readonly, disabled } = useFormCommon()
    const ctx: FormItemContext = {
      get field() {
        return props.field
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
    }
    provide(FORM_ITEM_CTX_INJECTION_KEY, ctx)
    return () => (
      <div
        class={[ns.b(), ns.m(size.value), ns.m(labelAlign.value)]}
        style={{
          [ns.cssVarName('label-width')]: addunit(labelWidth.value ?? 'auto', 'px'),
        }}
      >
        {!isEmpty(props.label) ? <label class={ns.e('label')}>{props.label}</label> : ''}
        <div class={ns.e('content')}>{slots.default?.()}</div>
      </div>
    )
  },
})
