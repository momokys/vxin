import { Position } from './types'
import { isNil } from '@vxin/fns'

type DndHook = (ev: DndEvent) => void

export class Dnd {
  private _target?: HTMLElement
  public get target() {
    return this._target
  }
  private static _dragging = false
  public static get dragging() {
    return Dnd._dragging
  }
  private _lastVec: Position = {
    x: 0,
    y: 0,
  }
  public get lastVec() {
    return this._lastVec
  }
  private readonly hooks: Record<DndEventTypes, DndHook[]> = {} as unknown as any
  private readonly _handler: (ev: MouseEvent) => void
  public get handler() {
    return this._handler
  }

  public constructor(target?: HTMLElement) {
    this._handler = (ev: MouseEvent) => {
      ev.preventDefault()
      Dnd._dragging = false
      this._target = ev.currentTarget as HTMLElement
      this._lastVec = {
        x: ev.clientX,
        y: ev.clientY,
      }
      const onMousemove = (ev: MouseEvent) => {
        if (!Dnd._dragging) {
          Dnd._dragging = true
          this.trigger('dragstart', ev)
        } else {
          this.trigger('drag', ev)
        }
      }
      const onMouseup = (ev: MouseEvent) => {
        document.removeEventListener('mouseup', onMouseup, true)
        document.removeEventListener('mousemove', onMousemove, true)
        Dnd._dragging = false
        this.trigger('dragend', ev)
      }
      document.addEventListener('mouseup', onMouseup, true)
      document.addEventListener('mousemove', onMousemove, true)
    }
    if (!isNil(target)) {
      this._target = target
      target.addEventListener('mousedown', this._handler)
    }
  }

  public on(type: DndEventTypes, hook: DndHook) {
    this.hooks[type] = this.hooks[type] ?? []
    this.hooks[type].push(hook)
    return this
  }

  public trigger(type: DndEventTypes, rawEv: MouseEvent) {
    const ev = new DndEvent(type, this, rawEv)
    this._lastVec = {
      x: ev.mouse.x,
      y: ev.mouse.y,
    }
    this.hooks[type]?.forEach?.((hook) => hook(ev))
  }

  public destroy() {
    if (!isNil(this._target)) {
      this._target.removeEventListener('mousedown', this._handler)
    }
  }
}

type DndEventTypes = 'dragstart' | 'drag' | 'dragend' | 'dragenter' | 'dragleave' | 'dragover' | 'drop'
export class DndEvent {
  public readonly type: DndEventTypes
  public readonly ins: Dnd
  public readonly diff: Position
  public readonly mouse: Position
  public readonly target: HTMLElement
  constructor(type: DndEventTypes, ins: Dnd, rawEv: MouseEvent) {
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
