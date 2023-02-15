import { computed, defineComponent, ref, Transition } from 'vue'
import { useDrag, useEventListener, useNamespace, useResizeObserver } from '@vxin/hooks'
import { scrollbarProps } from './props'
import { addunit } from '@vxin/utils'
import { isUndefined } from 'lodash'

const miniLen = 20
const thumbWidth = 6
const gap = 2

export default defineComponent({
  name: 'ZScrollbar',
  props: scrollbarProps,
  emits: ['scroll'],
  setup(props, { emit, slots, expose }) {
    const ns = useNamespace('scrollbar')

    const viewRef = ref<HTMLElement>()
    const contentRef = ref<HTMLElement>()
    const verticalThumbRef = ref<HTMLElement>()
    const horizontalThumbRef = ref<HTMLElement>()

    const height = computed(() => {
      if (isUndefined(props.height) && isUndefined(props.maxHeight)) return '100%'
      else if (isUndefined(props.height)) return undefined
      else return addunit(props.height, 'px')
    })
    const maxHeight = computed(() => {
      if (isUndefined(props.maxHeight)) return undefined
      else return addunit(props.maxHeight, 'px')
    })

    // 元素 size
    const [vw, vh] = useResizeObserver(viewRef, 'self')
    const [cw, ch] = useResizeObserver(contentRef, 'content')

    // 滚动按钮长度
    const vtl = computed(() => {
      const len = vh.value * (vh.value / ch.value)
      return len >= miniLen ? len : miniLen > vh.value ? vh.value : miniLen
    })
    const htl = computed(() => {
      const len = vw.value * (vw.value / cw.value)
      return len >= miniLen ? len : miniLen > vw.value ? vw.value : miniLen
    })

    // 计算因子
    const vFactor = computed(
      () => (vh.value - vtl.value - 2 * gap - thumbWidth - (props.gap ? gap : 0)) / (ch.value - vh.value),
    )
    const hFactor = computed(
      () => (vw.value - htl.value - 2 * gap - thumbWidth - (props.gap ? gap : 0)) / (cw.value - vw.value),
    )

    // 滚动按钮拖拽
    const [vp, verticalDragHandle] = useDrag(verticalThumbRef, {
      hooks: {
        start: () => {
          dragging.value = true
        },
        drag: () => {
          viewRef.value!.scrollTop = vp.y / vFactor.value
        },
        end: () => {
          dragging.value = false
        },
      },
    })
    const [hp, horizontalDragHandle] = useDrag(horizontalThumbRef, {
      hooks: {
        start: () => {
          dragging.value = true
        },
        drag: () => {
          viewRef.value!.scrollLeft = hp.x / hFactor.value
        },
        end: () => {
          dragging.value = false
        },
      },
    })

    useEventListener(viewRef, 'scroll', (ev) => {
      const viewEl = ev.target as HTMLElement
      vp.y = viewEl.scrollTop * vFactor.value
      hp.x = viewEl.scrollLeft * hFactor.value
      emit('scroll', ev)
    })

    const cursorHover = ref<boolean>(false)
    const dragging = ref<boolean>(false)
    const visible = computed<boolean>(() => {
      if (dragging.value) return true
      else return cursorHover.value
    })

    const exposed = {
      scrollTo: (scrollTop: number, scrollLeft: number) => {
        exposed.setScrollTop(scrollTop)
        exposed.setScrollLeft(scrollLeft)
      },
      setScrollTop: (scrollTop: number) => {
        if (scrollTop < 0 || scrollTop > ch.value - vh.value) return
        viewRef.value!.scrollTop = scrollTop
        vp.y = scrollTop * vFactor.value
      },
      setScrollLeft: (scrollLeft: number) => {
        if (scrollLeft < 0 || scrollLeft > cw.value - vw.value) return
        viewRef.value!.scrollLeft = scrollLeft
        hp.x = scrollLeft * hFactor.value
      },
    }
    expose(exposed)

    return () => (
      <div
        class={[ns.b()]}
        style={{
          [ns.cssVarName('thumb-width')]: `${thumbWidth}px`,
          [ns.cssVarName('gap')]: `${gap}px`,
          height: height.value,
        }}
        onMouseenter={() => {
          cursorHover.value = true
        }}
        onMouseleave={() => {
          cursorHover.value = false
        }}
      >
        <div
          ref={viewRef}
          class={ns.e('view')}
          style={{
            height: height.value,
            maxHeight: maxHeight.value,
          }}
        >
          <div
            ref={contentRef}
            class={ns.e('content')}
            style={
              props.gap
                ? {
                    paddingRight: `calc(2 * var(${ns.cssVarName('gap')}) + var(${ns.cssVarName('thumb-width')}))`,
                    paddingBottom: `calc(2 * var(${ns.cssVarName('gap')}) + var(${ns.cssVarName('thumb-width')}))`,
                  }
                : {}
            }
          >
            {slots.default?.()}
          </div>
        </div>
        <Transition name={ns.b('fade')}>
          <div
            v-show={props.always || (vh.value < ch.value && visible.value)}
            class={[ns.e('track'), ns.is('vertical', true)]}
          >
            <div
              ref={verticalThumbRef}
              class={ns.e('thumb')}
              style={{
                height: `${vtl.value}px`,
                transform: `translateY(${vp.y}px)`,
              }}
              onMousedown={verticalDragHandle}
            />
          </div>
        </Transition>
        <Transition name={ns.b('fade')}>
          <div
            v-show={props.always || (vw.value < cw.value && visible.value)}
            class={[ns.e('track'), ns.is('horizontal', true)]}
          >
            <div
              ref={horizontalThumbRef}
              class={ns.e('thumb')}
              style={{
                width: `${htl.value}px`,
                transform: `translateX(${hp.x}px)`,
              }}
              onMousedown={horizontalDragHandle}
            />
          </div>
        </Transition>
      </div>
    )
  },
})
