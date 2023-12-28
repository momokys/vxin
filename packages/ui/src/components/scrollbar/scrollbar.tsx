import { computed, defineComponent, ref, CSSProperties, Transition } from 'vue'
import { useEventListener, useResizeObserver } from '@vxin/hooks'
import { addunit, Dnd, isNil } from '@vxin/utils'
import { useNamespace } from '@/hooks'
import { scrollbarProps } from './props'

export default defineComponent({
  name: 'VScrollbar',
  props: scrollbarProps,
  emits: ['scroll'],
  setup(props, { slots, emit, expose }) {
    const ns = useNamespace('scrollbar')

    const hover = ref(false)
    const dragging = ref(false)

    const viewRef = ref<HTMLDivElement>()
    const [vw, vh] = useResizeObserver(viewRef, 'self')
    const [cw, ch] = useResizeObserver(viewRef, 'content')
    const maxScrollTop = computed(() => ch.value - vh.value)
    const maxScrollLeft = computed(() => cw.value - vw.value)

    const scrollTop = ref(0)
    const scrollLeft = ref(0)
    const vDnd = new Dnd()
      .on('dragstart', () => (dragging.value = true))
      .on('dragend', () => (dragging.value = false))
      .on('drag', (ev) => {
        const vThumbMaxScrollTop = vh.value - vThumbLen.value
        ins.scrollToTop(scrollTop.value + (ev.diff.y / vThumbMaxScrollTop) * maxScrollTop.value)
      })
    const hDnd = new Dnd()
      .on('dragstart', () => (dragging.value = true))
      .on('dragend', () => (dragging.value = false))
      .on('drag', (ev) => {
        const hThumbMaxScrollLeft = vw.value - hThumbLen.value
        ins.scrollToLeft(scrollLeft.value + (ev.diff.x / hThumbMaxScrollLeft) * maxScrollLeft.value)
      })
    useEventListener(viewRef, 'scroll', (ev) => {
      const el = ev.target as HTMLDivElement
      scrollTop.value = el.scrollTop
      scrollLeft.value = el.scrollLeft
      emit('scroll', ev)
    })

    const showVThumb = computed(() => ch.value > vh.value && (dragging.value || hover.value || props.embed))
    const vThumbLen = computed(() => {
      const res = (vh.value / ch.value) * vh.value
      return res >= 32 ? res : 32
    })
    const vThumbScrollTop = computed(() => {
      const vThumbMaxScrollTop = vh.value - vThumbLen.value
      return vThumbMaxScrollTop * (scrollTop.value / maxScrollTop.value)
    })
    const vThumbStyle = computed<CSSProperties>(() => ({
      top: vThumbScrollTop.value + 'px',
      height: vThumbLen.value + 'px',
    }))

    const showHThumb = computed(() => cw.value > vw.value && (dragging.value || hover.value || props.embed))
    const hThumbLen = computed(() => {
      const res = (vw.value / cw.value) * vw.value
      return res >= 32 ? res : 32
    })
    const hThumbScrollLeft = computed(() => {
      const hThumbMaxScrollLeft = vw.value - hThumbLen.value
      return hThumbMaxScrollLeft * (scrollLeft.value / maxScrollLeft.value)
    })
    const hThumbStyle = computed<CSSProperties>(() => ({
      left: hThumbScrollLeft.value + 'px',
      width: hThumbLen.value + 'px',
    }))

    const ins = {
      scrollTo(top: number, left: number) {
        ins.scrollToTop(top)
        ins.scrollToLeft(left)
      },
      scrollToTop(top: number) {
        if (top >= maxScrollTop.value) {
          scrollTop.value = maxScrollTop.value
        } else if (top <= 0) {
          scrollTop.value = 0
        } else {
          scrollTop.value = top
        }
        viewRef.value!.scrollTop = scrollTop.value
      },
      scrollToLeft(left: number) {
        if (left >= maxScrollLeft.value) {
          scrollLeft.value = maxScrollLeft.value
        } else if (left <= 0) {
          scrollLeft.value = 0
        } else {
          scrollLeft.value = left
        }
        viewRef.value!.scrollLeft = scrollLeft.value
      },
    }
    expose(ins)

    return () => (
      <div
        class={[ns.b(), ns.is('embed', props.embed)]}
        style={{
          paddingRight: props.embed && showVThumb.value ? `${ns.cssVar('track-size', '12px')}` : undefined,
          paddingBottom: props.embed && showHThumb.value ? `${ns.cssVar('track-size', '12px')}` : undefined,
        }}
        onMouseenter={() => (hover.value = true)}
        onMouseleave={() => (hover.value = false)}
      >
        <div
          ref={viewRef}
          class={ns.e('view')}
          style={{
            height: !isNil(props.height) ? addunit(props.height, 'px') : undefined,
            maxHeight: !isNil(props.maxHeight) ? addunit(props.maxHeight, 'px') : undefined,
          }}
        >
          {slots.default?.()}
        </div>
        <Transition name={ns.b('fade')}>
          <div v-show={showVThumb.value} class={[ns.e('track'), ns.is('vertical', true)]}>
            <div class={ns.e('thumb')} style={vThumbStyle.value} draggable={'true'} onDragstart={vDnd.handler} />
          </div>
        </Transition>
        <Transition name={ns.b('fade')}>
          <div v-show={showHThumb.value} class={[ns.e('track'), ns.is('horizontal', true)]}>
            <div class={ns.e('thumb')} style={hThumbStyle.value} draggable={'true'} onDragstart={hDnd.handler} />
          </div>
        </Transition>
      </div>
    )
  },
})
