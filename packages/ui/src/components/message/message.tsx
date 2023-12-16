import { App, defineComponent, Transition, ref, onMounted, h, DefineComponent, VNode, render } from 'vue'
import { isNull, isEmpty, isString, uniqueId, useRefFn, invoke } from '@vxin/fns'
import { useNamespace } from '@/hooks'
import { VIcon } from '@/components'
import { messageProps, MessageProps, MessageType } from './props'
// @ts-ignore
import { InfoFilled, SuccessFilled, WarningFilled, CircleCloseFilled } from '@vxin/icons'

const iconMap: Record<string, DefineComponent> = {
  info: InfoFilled,
  success: SuccessFilled,
  warning: WarningFilled,
  error: CircleCloseFilled,
}
const Component = defineComponent({
  name: 'VMessage',
  props: messageProps,
  setup(props, { expose }) {
    const ns = useNamespace('message')
    const visible = ref(false)
    const offset = ref(props.offset!)
    let startTime = 0
    const play = () => {
      const s = offset.value - 60
      if (s > 0) {
        offset.value = s
        if (s - 60 <= 0) {
          onTransitionend.value = () => {
            setTimeout(play, props.duration! - (new Date().getTime() - startTime))
          }
        }
      } else {
        visible.value = false
      }
    }
    const onTransitionend = useRefFn()
    onMounted(() => {
      visible.value = true
      if (offset.value - 60 <= 0) {
        setTimeout(play, props.duration)
      }
    })
    expose({
      play,
      get offset() {
        return offset.value
      },
    })
    return () => (
      <Transition
        name={ns.b('fade')}
        onAfterLeave={props.onDestroy}
        onAfterEnter={() => {
          startTime = new Date().getTime()
        }}
      >
        <div
          v-show={visible.value}
          id={props.id}
          class={[ns.b(), ns.m(props.type)]}
          style={{ top: offset.value + 'px' }}
          onTransitionend={onTransitionend}
        >
          <VIcon icon={props.icon ?? iconMap[props.type!]} />
          <p>{props.msg}</p>
        </div>
      </Transition>
    )
  },
})

export interface Message {
  open(opts: MessageOptions | string): MessageInstance | undefined
  info(msg: Omit<MessageOptions, 'type'> | string): MessageInstance | undefined
  success(msg: Omit<MessageOptions, 'type'> | string): MessageInstance | undefined
  warning(msg: Omit<MessageOptions, 'type'> | string): MessageInstance | undefined
  error(msg: Omit<MessageOptions, 'type'> | string): MessageInstance | undefined
}
export interface MessageOptions {
  id?: string
  type?: MessageType
  color?: string
  icon?: string | DefineComponent
  msg?: string
}
export interface MessageInstance {
  id: string
  el: HTMLDivElement
  vnode: VNode
  close: () => void
}
const instances: MessageInstance[] = []
const normalize = (target: any) => {
  const opts: MessageOptions = isString(target) ? { msg: target } : target
  return opts
}
const createMessage = (options: MessageOptions): MessageInstance | undefined => {
  if (isEmpty(options.msg)) return
  if (isNull((message as unknown as App)._context)) {
    throw new Error('message uninstall')
  }
  const container = document.createElement('div')
  const props: MessageProps = {
    ...options,
    id: options.id ?? uniqueId('v-message-id'),
    offset: invoke(() => {
      let res = 20
      if (!isEmpty(instances)) {
        const lastItem = instances[instances.length - 1]
        res = (lastItem.vnode.el as any).offsetHeight + lastItem.vnode.component!.exposeProxy!.offset + 20
      }
      return res
    }),
    onDestroy: () => {
      const index = instances.findIndex((item) => item.id === props.id)
      instances.splice(index, 1)
      instances.forEach((item) => {
        item.vnode.component!.exposeProxy!.play()
      })
      render(null, container)
    },
  }
  const vnode = h(Component, props)
  vnode.appContext = (message as unknown as App)._context
  render(vnode, container)
  const el = container.firstChild! as HTMLDivElement
  document.body.appendChild(el)
  const ins: MessageInstance = {
    el,
    vnode,
    id: props.id!,
    close: () => {
      vnode.component!.exposeProxy!.visible = false
    },
  }
  instances.push(ins)
  return ins
}
const message: Message = {
  open(opts) {
    return createMessage(normalize(opts))
  },
  error(msg) {
    return createMessage({ ...normalize(msg), type: 'error' })
  },
  info(msg) {
    return createMessage({ ...normalize(msg), type: 'info' })
  },
  success(msg) {
    return createMessage({ ...normalize(msg), type: 'success' })
  },
  warning(msg: string) {
    return createMessage({ ...normalize(msg), type: 'warning' })
  },
}

export default message
