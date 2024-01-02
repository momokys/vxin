import { isRef, onBeforeUnmount, onMounted, Ref, ref } from 'vue'
import { isUndefined } from '@vxin/utils'

export function useResizeObserver(
  target?: Ref<HTMLElement | undefined> | HTMLElement,
  type: 'self' | 'content' = 'self',
) {
  const w = ref<number>(0)
  const h = ref<number>(0)
  let observer: ResizeObserver
  let el: HTMLElement
  onMounted(() => {
    el = (isRef(target) ? target?.value : target) as HTMLElement
    if (isUndefined(el)) return
    observer = new ResizeObserver(() => {
      if (type === 'self') {
        w.value = el.offsetWidth
        h.value = el.offsetHeight
      }
      if (type === 'content') {
        w.value = el.scrollWidth
        h.value = el.scrollHeight
      }
    })
    observer.observe(el)
  })
  onBeforeUnmount(() => {
    if (isUndefined(observer)) return
    observer.unobserve(el)
  })
  return [w, h]
}
