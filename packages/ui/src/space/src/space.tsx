import { defineComponent, renderSlot } from 'vue'
import { isArray, isNumber } from 'lodash'
import { ComponentSize } from '@vxin/utils'
import { useNamespace } from '@vxin/hooks'
import { spaceProps } from './props'
import '@vxin/theme/space.scss'

const getGap = (size: Exclude<ComponentSize, 'mini'> | number | [number, number]): string => {
  if (isArray(size)) return `${size[0]}px ${size[1]}px`
  if (isNumber(size)) return `${size}px ${size}px`
  switch (size) {
    case 'large':
      return '10px 14px'
    case 'medium':
      return '8px 12px'
    case 'small':
      return '6px 10px'
  }
}

export default defineComponent({
  name: 'ZSpace',
  props: spaceProps,
  setup(props, { slots }) {
    const ns = useNamespace('space')
    const renderChildren = () => {
      const children = renderSlot(slots, 'default', { key: 0 }, () => []).children
      if ((children ?? []).length === 0) return null
      if (isArray(children)) {
        return children.map((item) => <div class={ns.e('item')}>{item}</div>)
      }
    }
    return () => (
      <div
        class={[
          ns.b(),
          ns.m(props.direction),
          ns.m(`justify-${props.justify}`),
          ns.m(`items-${props.align}`),
          ns.is('inline', props.inline),
          ns.is('wrap', props.wrap),
          ns.is('reverse', props.reverse),
        ]}
        style={{
          [ns.cssVarName('gap')]: getGap(props.size),
        }}
      >
        {renderChildren()}
      </div>
    )
  },
})
