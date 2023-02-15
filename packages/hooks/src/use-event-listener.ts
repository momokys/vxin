import { isRef, onBeforeUnmount, onMounted, Ref, unref } from 'vue'
import { isUndefined } from 'lodash'

export type EventSource = (Window & typeof globalThis) | Document | Ref<HTMLElement | undefined> | HTMLElement
export type EventMap<S extends EventSource> = S extends Window
  ? WindowEventMap
  : S extends Document
  ? DocumentEventMap
  : S extends Ref<HTMLElement | undefined> | HTMLElement
  ? HTMLElementEventMap
  : Record<string, Event>

export function useEventListener<
  S extends EventSource,
  T extends keyof EventMap<S>,
  L extends (ev: EventMap<S>[T]) => any,
>(source: S, type: T, listener: L, options: boolean | AddEventListenerOptions = true) {
  let _src: HTMLElement | Document | (Window & typeof globalThis) | undefined
  onMounted(() => {
    if (isRef(source)) {
      _src = unref<HTMLElement | Document | (Window & typeof globalThis) | undefined>(source)
    } else {
      _src = source
    }
    if (isUndefined(_src)) return
    _src.addEventListener(type as string, listener as unknown as EventListenerOrEventListenerObject, options)
  })

  onBeforeUnmount(() => {
    if (isUndefined(_src)) return
    _src.removeEventListener(type as string, listener as unknown as EventListenerOrEventListenerObject)
  })
}
