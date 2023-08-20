import { App, AppContext, DefineComponent, ComponentInternalInstance, h, render, VNode } from 'vue'
import { uniqueId } from '@vxin/utils'
import _Message from './message'
import { MessageType } from './message'

export type MessageOptions = {
  id?: string
  type?: MessageType
  color?: string
  icon?: string | DefineComponent
  msg?: string
}
export type MessageFn = (opt: MessageOptions) => void
export type Message = {
  _context: AppContext | null
  info: (msg: string) => void
  success: (msg: string) => void
  warning: (msg: string) => void
  error: (msg: string) => void
}
export type MessageInstance = {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  close: () => void
}

const instances: MessageInstance[] = []

const createMessage = (options: MessageOptions): MessageInstance => {
  const id = uniqueId('z-message-')
  const container = document.createElement('div')
  const props = {
    ...options,
    id,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose: () => {},
    onDestroy: () => {
      render(null, container)
      const idx = instances.findIndex((item) => item.id === id)
      instances.splice(idx, 1)
    },
  }
  const vnode = h(_Message, props)
  vnode.appContext = (_message as unknown as App)._context
  render(vnode, container)
  document.body.appendChild(container.firstChild!)
  return {
    id,
    vnode,
    vm: vnode.component!,
    close: () => {
      vnode.component!.exposeProxy!.visible = false
    },
  }
}

const _message: MessageFn = (options: MessageOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  if (!options.msg) return { close: () => {} }
  const instance = createMessage(options)
  instances.push(instance)
  return { close: instance.close }
}

;(_message as unknown as Message).info = (msg: string) => {}
;(_message as unknown as Message).success = (msg: string) => {}
;(_message as unknown as Message).warning = (msg: string) => {}
;(_message as unknown as Message).error = (msg: string) => {}

export default _message as MessageFn & Message
