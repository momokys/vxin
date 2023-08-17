import { computed, defineComponent, h } from 'vue'
import { Loading } from '@vxin/icons'
import { useNamespace } from '@/hooks'
import { VIcon } from '@/components'
import { buttonProps } from './props'
import { isEmpty } from '@vxin/utils'

const defaultLoadingIcon = Loading

export default defineComponent({
  name: 'VButton',
  props: buttonProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('button')
    const disabled = computed(() => props.disabled || props.loading)
    const icon = computed(() => (props.loading ? props.loadingIcon ?? defaultLoadingIcon : props.icon))
    const renderLabel = () => {
      const vnode = slots.default?.() ?? props.label
      return !isEmpty(vnode) ? <span class={ns.e('label')}>{vnode}</span> : ''
    }
    const renderIcon = () => {
      return icon.value ? <VIcon class={ns.e('icon')} icon={icon.value} /> : []
    }
    const handleClick = (ev: MouseEvent) => {
      if (disabled.value) return
      emit('click', ev)
    }

    return () => (
      <button
        class={[
          ns.b(),
          ns.m(props.type),
          ns.m(props.shape),
          ns.m(props.size),
          ns.m(props.status),
          ns.is('block', props.block),
          ns.is('loading', props.loading),
          ns.is('disabled', props.disabled || props.loading),
        ]}
        disabled={disabled.value}
        onClick={handleClick}
      >
        {renderIcon()}
        {renderLabel()}
      </button>
    )
  },
})
