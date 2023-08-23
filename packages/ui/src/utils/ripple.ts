import { Point } from '@vxin/utils'

export interface RippleOptions {
  opacity?: string | number
  color?: string
  bezier?: string
  duration?: number
}

const defaultOpts: RippleOptions = {
  opacity: '0.2',
  color: '#bdd3ff',
  bezier: 'cubic-bezier(0, 0, 0.2, 1)',
  duration: 300,
}

export const ripple = (target: HTMLElement, c: Point, opts?: RippleOptions) => {
  const _opts = { ...defaultOpts, ...opts } as Required<RippleOptions>
  const wrapEl = createRippleWrapEl()
  const rippleEl = createRippleEl(target, c, _opts as any)
  wrapEl.append(rippleEl)
  target.append(wrapEl)
  setTimeout(() => {
    const release = () => {
      rippleEl.removeEventListener('transitionend', release)
      wrapEl.remove()
    }
    rippleEl.addEventListener('transitionend', release)

    rippleEl.style.transform = 'translate(-50%, -50%) scale(1)'
    rippleEl.style.opacity = `${_opts.opacity}`
  }, 100)
}
const createRippleEl = (target: HTMLElement, c: Point, opts: Required<RippleOptions>) => {
  const d = maxR(target, c) * 2

  const rect = target.getBoundingClientRect()

  const rippleEl = document.createElement('div')
  Object.assign(rippleEl.style, {
    position: 'absolute',
    top: `${c.y - rect.y}px`,
    left: `${c.x - rect.x}px`,
    width: d + 'px',
    height: d + 'px',
    borderRadius: '50%',
    backgroundColor: opts.color,
    opacity: '0',
    transform: 'translate(-50%, -50%) scale(0)',
    transition: `transform ${opts.duration / 1000}s ${opts.bezier}, opacity ${opts.duration / 1000}s ${opts.bezier}`,
  })
  return rippleEl
}
const createRippleWrapEl = () => {
  const wrapEl = document.createElement('div')
  Object.assign(wrapEl.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    inset: '0',
    borderRadius: 'inherit',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    pointerEvents: 'none',
  })
  return wrapEl
}
const maxR = (target: HTMLElement, c: Point) => {
  let r = 0
  const rect = target.getBoundingClientRect()
  const ponitList = [
    {
      x: rect.x,
      y: rect.y,
    },
    {
      x: rect.x + rect.width,
      y: rect.y,
    },
    {
      x: rect.x,
      y: rect.y + rect.height,
    },
    {
      x: rect.x + rect.width,
      y: rect.y + rect.height,
    },
  ]
  for (let i = 0, len = ponitList.length; i < len; i++) {
    const p = ponitList[i]
    const d = Math.sqrt(Math.pow(c.x - p.x, 2) + Math.pow(c.y - p.y, 2))
    r = Math.max(r, d)
  }
  return r
}
