import { Vec2D } from './types'
import { isNil } from '@vxin/fns'

type DndHook = (ev: DndEvent) => void

export class Dnd {
  private _target?: HTMLElement
  public get target() {
    return this._target
  }
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

  public constructor(target?: HTMLElement) {
    this._handler = (ev: DragEvent) => {
      ev.preventDefault()
      this._target = ev.currentTarget as HTMLElement
      this._lastVec = {
        x: ev.clientX,
        y: ev.clientY,
      }
      const onMousemove = (ev: MouseEvent) => {
        this.trigger('drag', ev)
      }
      const onMouseup = (ev: MouseEvent) => {
        document.removeEventListener('mouseup', onMouseup, true)
        document.removeEventListener('mousemove', onMousemove, true)
        this.trigger('dragend', ev)
      }
      document.addEventListener('mouseup', onMouseup, true)
      document.addEventListener('mousemove', onMousemove, true)

      this.trigger('dragstart', ev)
    }
    if (!isNil(target)) {
      this._target = target
      target.draggable = true
      target.addEventListener('dragstart', this._handler)
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

  public destroy() {
    if (!isNil(this._target)) {
      this._target.removeEventListener('dragstart', this._handler)
    }
  }
}

type DndEventTypes = 'dragstart' | 'drag' | 'dragend' | 'dragenter' | 'dragleave' | 'dragover' | 'drop'
export class DndEvent {
  public readonly type: DndEventTypes
  public readonly ins: Dnd
  public readonly diff: Vec2D
  public readonly mouse: Vec2D
  public readonly target: HTMLElement
  constructor(type: DndEventTypes, ins: Dnd, rawEv: MouseEvent | DragEvent) {
    this.type = type
    this.ins = ins
    this.target = ins.target!
    this.mouse = {
      x: rawEv.clientX,
      y: rawEv.clientY,
    }
    this.diff = {
      x: rawEv.clientX - ins.lastVec.x,
      y: rawEv.clientY - ins.lastVec.y,
    }
  }
}
