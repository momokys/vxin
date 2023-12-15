import { AppContext, DefineComponent, h, render, VNode } from 'vue'
import { uniqueId, invoke, isNil } from '@vxin/utils'
import Message from './message'
import { MessageType } from './message'

export type MessageOptions = {
  id?: string
  type?: MessageType
  color?: string
  icon?: string | DefineComponent
  msg?: string
}
export type MessageFn = (opt: MessageOptions) => void
export type MessageX = {
  _context: AppContext | null
  info: (msg: string) => void
  success: (msg: string) => void
  warning: (msg: string) => void
  error: (msg: string) => void
}
export type MessageUtils = MessageFn & MessageX

export type MessageInstance = {
  id: string
  el: HTMLDivElement
  vnode: VNode
  close: () => void
}
const instances: MessageInstance[] = []

const createMessage = (options: MessageOptions): MessageInstance => {
  if (isNil(message._context)) {
    throw new Error('message 未安装')
  }
  const id = uniqueId('v-message')
  const container = document.createElement('div')
  const props = {
    ...options,
    id,
    offset: instances.length > 0 ? instances[instances.length - 1].el.offsetTop + 60 : 20,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose: () => {},
    onDestroy: () => {
      render(null, container)
      const idx = instances.findIndex((item) => item.id === id)
      instances.splice(idx, 1)
    },
  }
  const vnode = h(Message, props)
  vnode.appContext = message._context
  render(vnode, container)
  const el = container.firstChild! as HTMLDivElement
  document.body.appendChild(el)
  return {
    id,
    el,
    vnode,
    close: () => {
      vnode.component!.exposeProxy!.visible = false
    },
  }
}

export const message = invoke(() => {
  const msgFn: MessageFn = (options: MessageOptions) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    if (!options.msg) return { close: () => {} }
    const instance = createMessage(options)
    instances.push(instance)
    return { close: instance.close }
  }
  const msgUtils = msgFn as unknown as MessageX
  return msgUtils as MessageUtils
})
