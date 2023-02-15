import { defineComponent, ref } from 'vue'
import { useNamespace } from '@/_hooks'
import { VIcon, VWave } from '..'
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
    const btnRef = ref<HTMLButtonElement>()
    const waveRef = ref<InstanceType<typeof VWave>>()
    const handleClick = (ev: MouseEvent) => {
      if (props.disabled || props.loading) return
      waveRef.value?.play(getComputedStyle(btnRef.value!).borderColor)
      emit('click', ev)
    }
    const renderIcon = () => {
      const _icon_normal = slots.icon?.() ?? props.icon
      const _icon: any = !props.loading ? _icon_normal : props.loadingIcon ?? defaultLoadingIcon
      return _icon ? <VIcon class={ns.e('icon')} icon={_icon} /> : []
    }
    const renderLabel = () => {
      const _label_normal = slots.default?.() ?? props.label
      const _label = !props.loading ? _label_normal : props.loadingLabel ?? _label_normal
      return _label && !props.circle ? <span class={ns.e('label')}>{_label}</span> : []
    }
    return () => (
      <button
        ref={btnRef}
        class={[
          ns.b(),
          ns.m(props.type),
          ns.m(props.size),
          ns.m(props.icon || props.loading ? `icon-${props.iconPlacement}` : ''),
          ns.is('text', props.text),
          ns.is('disabled', props.disabled || props.loading),
          ns.is('round', props.round),
          ns.is('circle', props.circle),
          ns.is('loading', props.loading),
        ]}
        disabled={props.disabled || props.loading}
        onClick={handleClick}
      >
        {renderIcon()}
        {renderLabel()}
        <VWave ref={waveRef} />
      </button>
    )
  },
})
