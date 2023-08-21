import { defineComponent, h, InjectionKey, provide, renderSlot } from 'vue'
import { BtnGroupProps, btnGroupProps } from './props'
import { useGlobalConfig, useNamespace } from '@/hooks'
import { ComponentSize } from '@/utils'

export interface BtnGroupContext {
  readonly size: ComponentSize
  readonly disabled?: boolean
}
export const BTN_GROUP_CTX_INJECT_KEY: InjectionKey<BtnGroupContext> = Symbol('BTN_GROUP_CTX_INJECT_KEY')
export const provideBtnGroupCtx = (props: BtnGroupProps) => {
  const size = useGlobalConfig('size')
  const ctx: BtnGroupContext = {
    get size() {
      return props.size ?? size.value
    },
    get disabled() {
      return props.disabled
    },
  }
  provide(BTN_GROUP_CTX_INJECT_KEY, ctx)
}
export default defineComponent({
  name: 'VBtnGroup',
  props: btnGroupProps,
  setup(props, { slots }) {
    const ns = useNamespace('btn-group')
    provideBtnGroupCtx(props)
    return () => <div class={ns.b()}>{renderSlot(slots, 'default')}</div>
  },
})
