import {Component, defineComponent, PropType, Transition, ref, onMounted} from 'vue'
import { ZIcon } from '@vxin/ui'
import { useNamespace } from '@vxin/hooks'
import '@vxin/theme/message.scss'

export type MessageType = 'success' | 'error' | 'warning' | 'info'

export default defineComponent({
  name: 'ZMessage',
  props: {
    id: String,
    msg: String,
    type: String as PropType<MessageType>,
    icon: [String, Object, Function] as PropType<string | Component>,
    duration: {
      type: Number,
      default: 3000
    },
    offset: Number,
    onDestroy: {
      type: Function as PropType<() => void>,
      default: () => {}
    }
  },
  setup(props) {
    const ns = useNamespace('message')
    const visible = ref(false)
    onMounted(() => {
      visible.value = true
      setTimeout(() => {
        visible.value = false
      }, props.duration)
    })
    return () => (
      <Transition name={ns.b()} onAfterLeave={props.onDestroy}>
        <div v-show={visible.value} id={props.id} class={[ns.b(), ns.m(props.type)]}>
          <ZIcon icon={props.icon} />
          <p>{props.msg}</p>
        </div>
      </Transition>
    )
  },
})
