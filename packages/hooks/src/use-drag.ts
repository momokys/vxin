import { isRef, reactive, Ref } from 'vue'
import { isUndefined } from '@vxin/utils'

export interface Position {
  x: number
  y: number
}

export interface DragEvent {
  position: Position
  rawEvent: Event
}

export interface DragOptions {
  // 初始位置
  position?: Position
  // 相对定位
  relative?: boolean
  // 是否限制拖拽边界，默认值为 true
  boundLimit?: boolean
  // 自定义拖拽边界，默认使用父元素作为边界
  bound?: (target: HTMLElement, p: Position) => { minX: number; minY: number; maxX: number; maxY: number }
  // 是否允许拖拽，拖拽前检查
  draggable?: () => boolean
  // 拖拽钩子
  hooks?: {
    // 拖拽开始钩子
    start?: (ev: DragEvent) => void
    // 拖拽移动钩子
    drag?: (ev: DragEvent) => void
    // 拖拽结束钩子
    end?: (ev: DragEvent) => void
  }
}

function createDragEvent(ev: Event, position: Position): DragEvent {
  return {
    position,
    rawEvent: ev,
  }
}

export function useDrag(target: HTMLElement | Ref<HTMLElement | undefined>, options?: DragOptions) {
  const opts: DragOptions = {
    position: {
      x: 0,
      y: 0,
    },
    boundLimit: true,
    bound: (target) => {
      const parent = target.parentElement
      if (parent === null) return { minX: 0, minY: 0, maxX: 0, maxY: 0 }
      return {
        minX: 0,
        minY: 0,
        maxX: parent.offsetWidth - target.offsetWidth,
        maxY: parent.offsetHeight - target.offsetHeight,
      }
    },
    draggable: () => true,
    ...options,
  }

  const p = reactive<Position>(opts.position!)

  const handleDrag = (ev: MouseEvent) => {
    if (!opts.draggable!()) return

    opts?.hooks?.start?.(createDragEvent(ev, p))

    const el = (isRef(target) ? target.value! : target) as HTMLElement

    if (isUndefined(el)) return

    const rect = el.getBoundingClientRect()
    // @ts-ignore
    ev.target.style['-webkit-user-select'] = 'none'

    // 鼠标坐标快照
    let lastX = ev.clientX,
      lastY = ev.clientY

    // 最大偏移坐标
    const bound = opts.bound!(el, p)

    // 处理鼠标移动事件
    const move = (ev: MouseEvent) => {
      const dx = ev.clientX - lastX
      const dy = ev.clientY - lastY

      let newX: number
      let newY: number

      if (opts.relative) {
        newX = p.x + dx
        newY = p.y + dy
      } else {
        newX = rect.x + dx
        newY = rect.y + dy
      }

      p.x = opts.boundLimit ? (newX < bound.minX ? bound.minX : newX > bound.maxX ? bound.maxX : newX) : newX
      p.y = opts.boundLimit ? (newY < bound.minY ? bound.minY : newY > bound.maxY ? bound.maxY : newY) : newY

      lastX = ev.clientX
      lastY = ev.clientY

      opts?.hooks?.drag?.(createDragEvent(ev, p))
    }
    const end = () => {
      // 取消事件监听
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', end)
      opts?.hooks?.end?.(createDragEvent(ev, p))
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', end)
  }

  return [p, handleDrag] as const
}
