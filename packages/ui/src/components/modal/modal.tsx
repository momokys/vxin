import { defineComponent, Transition, Teleport, ref, h, computed, CSSProperties, onBeforeUnmount, reactive } from 'vue'
import { Close, FullScreen, Minus } from '@vxin/icons'
import { VBtn } from '@/components'
import { useNamespace } from '@/hooks'
import { modalProps } from './props'
import { useModelState } from '@vxin/hooks'
import { addunit, Dnd, isFunction, Position } from '@vxin/utils'

export default defineComponent({
  name: 'VModal',
  props: modalProps,
  emits: ['update:visible', 'update:fullscreen', 'opened', 'closed'],
  setup(props, { slots, emit, expose }) {
    const ns = useNamespace('modal')
    const elRef = ref<HTMLElement>()
    const visible = useModelState(props, emit, 'visible')
    const dragging = ref(false)
    const isFullscreen = useModelState(props, emit, 'fullscreen')

    const pos = reactive<Position>({ x: 0, y: 0 })
    const width = ref<string>(addunit(props.width ?? '', 'px'))
    const height = ref<string>(addunit(props.height ?? '', 'px'))
    // 原点坐标
    let ox = 0
    let oy = 0

    const style = computed<CSSProperties>(() => ({
      [ns.cssVarName('x')]: isFullscreen.value ? '0' : `${pos.x}px`,
      [ns.cssVarName('y')]: isFullscreen.value ? '0' : `${pos.y}px`,
      [ns.cssVarName('width')]: isFullscreen.value ? '100vw' : width.value,
      [ns.cssVarName('height')]: isFullscreen.value ? '100vh' : height.value,
    }))

    const dnd = new Dnd()
      .on('dragstart', () => (dragging.value = true))
      .on('dragend', () => (dragging.value = false))
      .on('drag', (ev) => {
        if (!props.draggable) return

        pos.x += ev.diff.x
        pos.y += ev.diff.y

        const rect = elRef.value!.getBoundingClientRect()
        // 模态窗宽高
        const w = rect.width
        const h = rect.height
        // 模态窗绝对坐标
        const ax = pos.x + ox
        const ay = pos.y + oy
        // 模态窗最大绝对坐标
        const maxX = document.documentElement.offsetWidth - w
        const maxY = document.documentElement.offsetHeight - h

        if (ax <= 0) {
          pos.x = -ox
        } else if (ax >= maxX) {
          pos.x = maxX - ox
        }
        if (ay <= 0) {
          pos.y = -oy
        } else if (ay >= maxY) {
          pos.y = maxY - oy
        }
      })

    const ins = {
      fullscreen() {
        isFullscreen.value = !isFullscreen.value
      },
      close() {
        visible.value = false
      },
    }
    expose(ins)

    const opened = () => {
      const cs = getComputedStyle(elRef.value!)
      height.value = height.value || cs.height
      width.value = width.value || cs.width

      const rect = elRef.value!.getBoundingClientRect()
      ox = rect.x
      oy = rect.y

      emit('opened')
    }
    const closed = () => {
      pos.x = 0
      pos.y = 0
      isFullscreen.value = false
      emit('closed')
    }

    if (isFunction(props.destroy)) {
      onBeforeUnmount(() => {
        props.destroy?.()
      })
    }

    return () => (
      <Teleport to={'body'} disabled={!props.appendToBody}>
        <Transition name={ns.b('wrap')} duration={300} onAfterEnter={opened} onAfterLeave={closed}>
          <div v-show={visible.value} class={ns.b('wrap')} style={{ zIndex: props.zIndex }}>
            <div v-show={props.shade} class={ns.b('mask')} onClick={ins.close} />
            <div
              ref={elRef}
              style={style.value}
              class={[
                ns.b(),
                ns.is('fullscreen', isFullscreen.value),
                ns.is('draggable', props.draggable),
                ns.is('dragging', dragging.value),
              ]}
            >
              <header class={ns.e('header')} onMousedown={dnd.handler}>
                <div class={ns.e('title')}>{props.title ?? '标题'}</div>
                <div class={ns.e('toolbar')}>
                  {props.fullscreenEnabled ? (
                    <VBtn
                      type={'text'}
                      size={'small'}
                      icon={isFullscreen.value ? Minus : FullScreen}
                      onClick={ins.fullscreen}
                    />
                  ) : (
                    ''
                  )}
                  <VBtn type={'text'} icon={Close} size={'small'} onClick={ins.close} />
                </div>
              </header>
              <div class={ns.e('body')}>{slots.default?.()}</div>
              <footer class={ns.e('footer')}>
                <VBtn label={'取消'} status={'default'} />
                <VBtn label={'确定'} status={'primary'} />
              </footer>
            </div>
          </div>
        </Transition>
      </Teleport>
    )
  },
})
