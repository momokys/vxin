import { defineComponent, h } from 'vue'
import { useNamespace } from '@/hooks'

export default defineComponent({
  name: 'VRipple',
  emits: ['click'],
  setup() {
    const ns = useNamespace('ripple')
    return () => {
      <span class={ns.b('wrap')}>
        <span class={ns.b()} />
      </span>
    }
  }
})
