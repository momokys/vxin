import { Vec2D } from './types'

type DndHook = (ev: DndEvent) => void

export class Dnd {
  private _lastVec: Vec2D = {
    x: 0,
    y: 0,
  }
  public get lastVec() {
    return this._lastVec
  }
  private readonly hooks: Record<DndEventTypes, DndHook[]> = {} as unknown as any
  private readonly _handler: (ev: DragEvent) => void
  public get handler() {
    return this._handler
  }

  public constructor() {
    this._handler = (ev: DragEvent) => {
      ev.preventDefault()
      this._lastVec = {
        x: ev.clientX,
        y: ev.clientY,
      }
      const onMousemove = (ev: MouseEvent) => {
        this.trigger('drag', ev)
      }
      const onMouseup = (ev: MouseEvent) => {
        document.removeEventListener('mouseup', onMouseup)
        document.removeEventListener('mousemove', onMousemove)
        this.trigger('dragend', ev)
      }
      document.addEventListener('mouseup', onMouseup)
      document.addEventListener('mousemove', onMousemove)

      this.trigger('dragstart', ev)
    }
  }

  public on(type: DndEventTypes, hook: DndHook) {
    this.hooks[type] = this.hooks[type] ?? []
    this.hooks[type].push(hook)
    return this
  }

  public trigger(type: DndEventTypes, rawEv: DragEvent | MouseEvent) {
    const ev = new DndEvent(type, this, rawEv)
    this._lastVec = {
      x: ev.mouse.x,
      y: ev.mouse.y,
    }
    this.hooks[type]?.forEach?.((hook) => hook(ev))
  }
}

type DndEventTypes = 'dragstart' | 'drag' | 'dragend' | 'dragenter' | 'dragleave' | 'dragover' | 'drop'
export class DndEvent {
  public readonly type: DndEventTypes
  public readonly ins: Dnd
  public readonly diff: Vec2D
  public readonly mouse: Vec2D
  public readonly target: HTMLElement
  public readonly rawEv: DragEvent | MouseEvent
  constructor(type: DndEventTypes, ins: Dnd, rawEv: MouseEvent | DragEvent) {
    this.type = type
    this.ins = ins
    this.target = rawEv.target as HTMLElement
    this.rawEv = rawEv
    this.mouse = {
      x: this.rawEv.clientX,
      y: this.rawEv.clientY,
    }
    this.diff = {
      x: this.rawEv.clientX - this.ins.lastVec.x,
      y: this.rawEv.clientY - this.ins.lastVec.y,
    }
  }
}
