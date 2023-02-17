import {
  defineComponent,
  Transition,
  Teleport,
  ref,
  nextTick,
  watchEffect,
  computed,
  CSSProperties, watch
} from 'vue'
import { isUndefined } from 'lodash'
import { addunit } from '@vxin/utils'
import { Position, useDrag, useEventListener } from '@vxin/hooks'
import { Close, FullScreen, Minus } from '@vxin/icons'
import { VButton } from '@/components'
import { useNamespace } from '@/hooks'
import { modalProps } from './props'

export default defineComponent({
  name: 'VModal',
  props: modalProps,
  setup(props, { slots, emit, expose }) {
    const ns = useNamespace('modal')
    const elRef = ref<HTMLElement>()
    const visible = ref<boolean>(false)
    const fullscreen = ref<boolean>(props.fullscreen)
    const dragging = ref<boolean>(false)
    const cw = ref<number>(document.documentElement.clientWidth)
    const ch = ref<number>(document.documentElement.clientHeight)
    // 起点
    const o: Position = { x: 0, y: 0 }
    const min: Position = { x: 0, y: 0 }
    const max: Position = { x: 0, y: 0 }
    const [p, handleDrag] = useDrag(elRef, {
      relative: true,
      bound: () => {
        const [min, max] = computeInterval()
        return {
          minX: min.x,
          minY: min.y,
          maxX: max.x,
          maxY: max.y,
        }
      },
      draggable: () => !fullscreen.value && visible.value,
      hooks: {
        start: () => {
          dragging.value = true
        },
        end: () => {
          dragging.value = false
        }
      }
    })
    const style = computed<CSSProperties>(() => ({
      left: (fullscreen.value ? 0: p.x) + 'px',
      top: (fullscreen.value ? 0 : p.y) + 'px',
      width: fullscreen.value ? '100%' : !isUndefined(props.width) ? addunit(props.width, 'px') : '50%',
      height: fullscreen.value ? '100%' : !isUndefined(props.height) ? addunit(props.height, 'px') : '',
    }))
    const computeInterval = () => {
      const rect = elRef.value!.getBoundingClientRect()
      min.x = -o.x
      min.y = -o.y
      max.x = cw.value - rect.width - o.x
      max.y = ch.value - rect.height - o.y
      return [min, max] as const
    }
    const computeOrigin = () => {
      const rect = elRef.value!.getBoundingClientRect()
      o.x = rect.x
      o.y = rect.y
    }
    const open = async () => {
      if (props.isFunction) {
        visible.value = true
        await nextTick()
        p.x = 0
        p.y = 0
        fullscreen.value = props.fullscreen
      } else {

      }
    }
    const close = async () => {
      if (props.isFunction) {
        visible.value = false
        await nextTick()
        props.destroy?.()
      } else {
        emit('update:visible', false)
      }
    }
    const toggleFullscreen = () => {
      fullscreen.value = !fullscreen.value
    }
    const cancelFullscreenEffect = () => {
      fullscreen.value = false
    }

    useEventListener(window, 'resize', () => {
      const lastCh = ch.value

      cw.value = document.documentElement.clientWidth
      ch.value = document.documentElement.clientHeight

      const rect = elRef.value!.getBoundingClientRect()

      o.x = cw.value / 2 - rect.width / 2
      o.y = (o.y / lastCh) * ch.value

      computeInterval()

      p.x = p.x < min.x ? min.x : p.x
      p.y = p.y < min.y ? min.y : p.y
    })

    if (!props.isFunction) {
      watchEffect(async () => {
        visible.value = props.visible
        if (props.visible) {
          await nextTick()
          p.x = 0
          p.y = 0
          fullscreen.value = props.fullscreen
        }
      })
    }

    watch(
      () => p,
      () => {
        p.x = p.x < min.x ? min.x : p.x
        p.y = p.y < min.y ? min.y : p.y
        // p.x = p.x < min.x ? min.x : p.x > max.x ? max.x : p.x
        // p.y = p.y < min.y ? min.y : p.y > max.y ? max.y : p.y
      },
      { deep: true }
    )

    expose({
      open,
      close,
      computeInterval,
    })

    return () => (
      <Teleport to={'body'} disabled={!props.appendToBody}>
        <Transition
          name={ns.b('wrap')}
          duration={300}
          onAfterEnter={computeOrigin}
          onAfterLeave={cancelFullscreenEffect}
        >
          <div
            v-show={visible.value}
            class={ns.b('wrap')}
            style={{ zIndex: props.zIndex }}
          >
            <div v-show={props.shade} class={ns.b('mask')} onClick={close} />
            <div
              ref={elRef}
              class={[
                ns.b(),
                ns.is('fullscreen', fullscreen.value),
                ns.is('dragging', dragging.value),
              ]}
              style={style.value}
            >
              <div class={ns.e('header')} onMousedown={handleDrag}>
                <div class={ns.e('title')}>{props.title ?? '标题'}</div>
                <div class={ns.e('toolbar')}>
                  <VButton icon={fullscreen.value ? Minus : FullScreen} size={'small'} text={true} onClick={toggleFullscreen} />
                  <VButton icon={Close} size={'small'} text={true} onClick={close} />
                </div>
              </div>
              <div class={ns.e('body')}>{slots.default?.()}</div>
              <div class={ns.e('footer')}>
                <VButton label={'取消'} type={'default'} />
                <VButton label={'确定'} type={'primary'} />
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    )
  },
})
