import { computed, defineComponent, provide } from 'vue'
import { useNamespace } from '@/hooks'
import { addunit, isEmpty, isNil, uniqueId } from '@vxin/utils'
import { useForm, useFormCommon } from '@/components'
import { FieldContext } from './types'
import { FIELD_CTX_INJECTION_KEY } from './constants'
import { fieldProps } from './props'

export default defineComponent({
  name: 'VField',
  props: fieldProps,
  setup(props, { slots }) {
    const ns = useNamespace('form-item')
    const id = uniqueId('v-form-item')
    const [form, parent] = useForm()
    const data = computed(() => {
      if (isNil(parent)) {
        return form?.data
      } else if (isEmpty(parent.name) || isEmpty(props.name)) {
        return parent.data
      } else {
        return parent.data[parent.name!] ?? form?.data
      }
    })
    const { size, labelAlign, labelWidth, readonly, disabled } = useFormCommon()
    const ctx: FieldContext = {
      get id() {
        return id
      },
      get name() {
        return props.name
      },
      get data() {
        return data.value
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
      get parent() {
        return parent
      },
      get isVModel() {
        return form?.isVModel
      },
    }
    provide(FIELD_CTX_INJECTION_KEY, ctx)
    return () => (
      <div
        class={[ns.b(), ns.m(size.value), ns.m(labelAlign.value)]}
        style={{
          [ns.cssVarName('label-width')]: addunit(labelWidth.value ?? 'auto', 'px'),
        }}
      >
        {!isEmpty(props.label) ? (
          <label for={id} class={ns.e('label')}>
            {props.label}
          </label>
        ) : (
          ''
        )}
        <div class={ns.e('content')}>{slots.default?.()}</div>
      </div>
    )
  },
})
