import { computed, defineComponent, h, inject } from 'vue'
import { Loading } from '@vxin/icons'
import { useGlobalConfig, useNamespace } from '@/hooks'
import { VIcon, BTN_GROUP_CTX_INJECT_KEY } from '@/components'
import { btnProps } from './props'
import { isEmpty } from '@vxin/utils'

const defaultLoadingIcon = Loading

export default defineComponent({
  name: 'VBtn',
  props: btnProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('btn')
    const btnGroupCtx = inject(BTN_GROUP_CTX_INJECT_KEY)
    const globalConfigSize = useGlobalConfig('size')
    const disabled = computed(() => props.disabled || props.loading || btnGroupCtx?.disabled)
    console.log(disabled.value)
    const size = computed(() => props.size ?? btnGroupCtx?.size ?? globalConfigSize.value)
    const icon = computed(() => (props.loading ? props.loadingIcon ?? defaultLoadingIcon : props.icon))
    const renderLabel = () => {
      const vnode = slots.default?.() ?? props.label
      return !isEmpty(vnode) ? <span class={ns.e('label')}>{vnode}</span> : ''
    }
    const renderIcon = () => {
      return icon.value ? <VIcon class={ns.e('icon')} icon={icon.value} /> : ''
    }
    const handleClick = (ev: MouseEvent) => {
      if (disabled.value) return
      emit('click', ev)
    }
    return () => {
      const _tag = (props.type !== 'link' ? props.tag : 'a') || 'button'
      const _props: any = {
        class: [
          ns.b(),
          ns.m(props.type),
          ns.m(props.shape),
          ns.m(size.value),
          ns.m(props.status),
          ns.is('only-icon', !isEmpty(props.icon) && isEmpty(slots.default ?? props.label)),
          ns.is('block', props.block),
          ns.is('disabled', disabled.value),
          ns.is('loading', props.loading),
        ],
        disabled: disabled.value,
        onClick: handleClick,
      }
      if (_tag === 'a') {
        _props.href = props.href || '#'
      }
      const _slots = {
        default: () => [renderIcon(), renderLabel()],
      }
      return h(_tag, _props, _slots)
    }
  },
})
