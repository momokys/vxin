import { Directive, UnwrapRef } from 'vue'
import { ripple, RippleOptions } from '@/utils'
import { withInstallDirective } from '@vxin/utils'

export interface RippleElement extends HTMLElement {}
export interface RippleDirectiveOptions extends RippleOptions {
  disabled?: boolean
}

export type RippleDirectiveBinding = RippleDirectiveOptions | UnwrapRef<RippleDirectiveOptions>

const Ripple: Directive<RippleElement, RippleDirectiveBinding> = {
  mounted(el, binding) {
    el.addEventListener('pointerup', (ev) => {
      console.log(binding.value)
      if (!binding.value.disabled) {
        ripple(
          ev.target as HTMLElement,
          {
            x: ev.clientX,
            y: ev.clientY,
          },
          binding.value,
        )
      }
    })
  },
}
export const vRipple = withInstallDirective(Ripple, 'ripple')
