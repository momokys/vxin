import { defineComponent, PropType } from 'vue'
import { useNamespace } from '@/hooks'
import { ComponentSize } from '@/utils'
import { addunit, isEmpty } from '@vxin/utils'

export default defineComponent({
  name: 'VFormItem',
  props: {
    field: String,
    label: String,
    labelWidth: [String, Number],
    labelPosition: String,
    size: String as PropType<ComponentSize>,
  },
  setup(props, { slots }) {
    const ns = useNamespace('form-item')
    return () => (
      <div
        class={[ns.b(), ns.m(props.size ?? 'medium'), ns.m(props.labelPosition)]}
        style={{
          [ns.cssVarName('label-width')]: addunit(props.labelWidth ?? 'auto', 'px'),
        }}
      >
        {!isEmpty(props.label) ? <label class={ns.e('label')}>{props.label}</label> : ''}
        <div class={ns.e('content')}>{slots.default?.()}</div>
      </div>
    )
  },
})
