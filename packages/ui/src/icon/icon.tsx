import { computed, CSSProperties, defineComponent, h, resolveDynamicComponent } from 'vue'
import { isNumber, isString, isUndefined } from 'lodash'
import { useNamespace } from '@/_hooks'
import { iconProps } from './props'

export default defineComponent({
  name: 'VIcon',
  props: iconProps,
  emits: ['click'],
  setup(props, { slots, emit }) {
    const ns = useNamespace('icon')
    const style = computed<CSSProperties>(() => {
      return {
        fontSize: isNumber(props.size) ? props.size + 'px' : props.size,
        color: props.color,
      }
    })
    return () => {
      const component: any =
        slots.default?.() ??
        (!isUndefined(props.icon)
          ? isString(props.icon)
            ? h(resolveDynamicComponent(props.icon) as any)
            : h(props.icon)
          : [])
      return (
        <i
          class={[ns.b()]}
          style={style.value}
          onClick={(ev) => {
            emit('click', ev)
          }}
        >
          {component}
        </i>
      )
    }
  },
})
