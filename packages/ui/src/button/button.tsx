import {computed, defineComponent, ref} from 'vue'
import { useNamespace } from '@/_hooks'
import { VIcon } from '..'
import { buttonProps } from './props'

const defaultLoadingIcon = (
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="currentColor"
      d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
    />
  </svg>
)

export default defineComponent({
  name: 'VButton',
  props: buttonProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('button')
    const disabled = computed(() => props.disabled || props.loading)
    const icon = computed(() => props.loading ? (props.loadingIcon ?? defaultLoadingIcon) : props.icon)
    const renderLabel = () => <span class={ ns.e('label') }>{ slots.default?.() ?? props.label }</span>
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
          ns.m(props.status),
          ns.m(props.size),
          ns.m(icon.value ? `icon-${props.iconPlacement}` : ''),
          ns.is('block', props.block),
          ns.is('round', props.round),
          ns.is('circle', props.circle),
          ns.is('loading', props.loading),
          ns.is('disabled', disabled.value),
        ]}
        disabled={disabled.value}
        onClick={handleClick}
      >
        { renderIcon() }
        { renderLabel() }
      </button>
    )
  },
})
