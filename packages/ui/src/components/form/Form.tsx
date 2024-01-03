import { defineComponent, PropType } from 'vue'
import { useNamespace } from '@/hooks'
import { ComponentSize } from '@/utils'

export default defineComponent({
  name: 'VForm',
  props: {
    size: {
      type: String as PropType<ComponentSize>,
      default: 'medium',
    },
  },
  setup(props, { slots }) {
    const ns = useNamespace('form')
    return () => <form class={[ns.b('form')]}>{slots.default?.()}</form>
  },
})
