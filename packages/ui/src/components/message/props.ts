import { Component, ExtractPropTypes, PropType } from 'vue'

export const messageProps = {
  id: String,
  msg: String,
  type: String as PropType<MessageType>,
  icon: [String, Object, Function] as PropType<string | Component>,
  duration: {
    type: Number,
    default: 3000,
  },
  offset: Number,
  onDestroy: Function as PropType<() => void>,
}

export type MessageType = 'success' | 'error' | 'warning' | 'info'
export type MessageProps = Partial<ExtractPropTypes<typeof messageProps>>
