import { computed, defineComponent, ref, CSSProperties } from 'vue'
import { useEventListener, useResizeObserver } from '@vxin/hooks'
import { Dnd } from '@vxin/utils'
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
    const totalScrollTop = computed(() => ch.value - vh.value)
    const totalScrollLeft = computed(() => cw.value - vw.value)

    const scrollTop = ref(0)
    const scrollLeft = ref(0)
    const vDnd = new Dnd().on('drag', (ev) => {
      const diff = (ev.diff.y / vh.value) * ch.value
      const newScrollTop = scrollTop.value + diff
      if (newScrollTop >= totalScrollTop.value) {
        scrollTop.value = totalScrollTop.value
      } else if (newScrollTop <= 0) {
        scrollTop.value = 0
      } else {
        scrollTop.value += diff
      }
      viewRef.value!.scrollTop = scrollTop.value
    })
    const hDnd = new Dnd().on('drag', (ev) => {
      const diff = (ev.diff.x / vw.value) * cw.value
      const newScrollLeft = scrollLeft.value + diff
      if (newScrollLeft >= totalScrollLeft.value) {
        scrollLeft.value = totalScrollTop.value
      } else if (newScrollLeft <= 0) {
        scrollLeft.value = 0
      } else {
        scrollLeft.value += diff
      }
      viewRef.value!.scrollLeft = scrollLeft.value
    })
    useEventListener(viewRef, 'scroll', (ev) => {
      const el = ev.target as HTMLDivElement
      scrollTop.value = el.scrollTop
      scrollLeft.value = el.scrollLeft
    })

    const showVThumb = computed(() => ch.value > vh.value)
    const vThumbLen = computed(() => {
      const res = (vh.value / ch.value) * vh.value
      return res >= 32 ? res : 32
    })
    const vThumbScrollTop = computed(() => {
      const vThumbTotalScrollTop = vh.value - vThumbLen.value
      return vThumbTotalScrollTop * (scrollTop.value / totalScrollTop.value)
    })
    const vThumbStyle = computed<CSSProperties>(() => ({
      top: vThumbScrollTop.value + 'px',
      height: vThumbLen.value + 'px',
    }))

    const showHThumb = computed(() => {
      console.log(cw.value, vw.value, cw.value > vw.value)
      return cw.value > vw.value
    })
    const hThumbLen = computed(() => {
      const res = (vw.value / cw.value) * vw.value
      return res >= 32 ? res : 32
    })
    const hThumbScrollLeft = computed(() => {
      const hThumbTotalScrollLeft = vw.value - hThumbLen.value
      return hThumbTotalScrollLeft * (scrollLeft.value / totalScrollLeft.value)
    })
    const hThumbStyle = computed<CSSProperties>(() => ({
      left: hThumbScrollLeft.value + 'px',
      width: hThumbLen.value + 'px',
    }))

    return () => (
      <div
        class={[ns.b(), ns.is('embed', props.embed)]}
        style={{
          paddingRight: props.embed && showVThumb.value ? `${ns.cssVar('scrollbar-track-size', '12px')}` : undefined,
          paddingBottom: props.embed && showHThumb.value ? `${ns.cssVar('scrollbar-track-size', '12px')}` : undefined,
        }}
      >
        <div ref={viewRef} class={ns.e('view')}>
          {slots.default?.()}
        </div>
        <div v-show={showVThumb.value} class={[ns.e('track'), ns.is('vertical', true)]}>
          <div class={ns.e('thumb')} style={vThumbStyle.value} draggable={'true'} onDragstart={vDnd.handler} />
        </div>
        <div v-show={showHThumb.value} class={[ns.e('track'), ns.is('horizontal', true)]}>
          <div class={ns.e('thumb')} style={hThumbStyle.value} draggable={'true'} onDragstart={hDnd.handler} />
        </div>
      </div>
    )
  },
})
