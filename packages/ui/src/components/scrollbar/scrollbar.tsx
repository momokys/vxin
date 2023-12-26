import { computed, defineComponent, ref } from 'vue'
import { useEventListener, useResizeObserver } from '@vxin/hooks'
import { Dnd, invoke } from '@vxin/utils'
import { useNamespace } from '@/hooks'
import { scrollbarProps } from './props'

export default defineComponent({
  name: 'VScrollbar',
  props: scrollbarProps,
  emits: ['scroll'],
  setup(props, { slots }) {
    const ns = useNamespace('scrollbar')

    const viewRef = ref<HTMLDivElement>()
    const [vw, vh] = useResizeObserver(viewRef, 'self')
    const [cw, ch] = useResizeObserver(viewRef, 'content')

    const scrollTop = ref(0)
    const scrollLeft = ref(0)
    useEventListener(viewRef, 'scroll', (ev) => {
      const el = ev.target as HTMLDivElement
      scrollTop.value = el.scrollTop
      scrollLeft.value = el.scrollLeft
    })

    const vThumbStyle = computed(() => {
      return {
        top: invoke(() => {
          const res = vh.value * (scrollTop.value / ch.value)
          return res + 'px'
        }),
        height: invoke(() => {
          const res = vh.value / ch.value
          return (res >= 32 ? res : 32) + 'px'
        }),
      }
    })
    const hThumbStyle = computed(() => {
      return {
        left: invoke(() => {
          const res = vw.value * (scrollLeft.value / cw.value)
          return res + 'px'
        }),
        width: invoke(() => {
          const res = vw.value / cw.value
          return (res >= 32 ? res : 32) + 'px'
        }),
      }
    })

    const vDnd = new Dnd().on('drag', (ev) => {
      const diff = (ev.diff.y / vh.value) * ch.value
      const totalScrollTop = ch.value - vh.value
      const newScrollTop = scrollTop.value + diff
      if (newScrollTop >= totalScrollTop) {
        scrollTop.value = totalScrollTop
      } else if (newScrollTop <= 0) {
        scrollTop.value = 0
      } else {
        scrollTop.value += diff
      }
      viewRef.value!.scrollTop = scrollTop.value
    })

    return () => (
      <div class={[ns.b()]}>
        <div ref={viewRef} class={ns.e('view')}>
          {slots.default?.()}
        </div>
        <div class={[ns.e('track'), ns.is('vertical', true)]}>
          <div class={ns.e('thumb')} style={vThumbStyle.value} draggable={'true'} onDragstart={vDnd.handler} />
        </div>
        <div class={[ns.e('track'), ns.is('horizontal', true)]}>
          <div class={ns.e('thumb')} style={hThumbStyle.value} />
        </div>
      </div>
    )
  },
})
