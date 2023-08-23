import { defineComponent, h, PropType, renderSlot, VNode } from 'vue'
import { isArray, isNumber } from '@vxin/utils'

export default defineComponent({
  name: 'VSeq',
  props: {
    range: {
      type: [Array, Number] as PropType<number | [number, number]>,
      default: 0,
    },
  },
  setup(props, { slots }) {
    return () => {
      if (!(isNumber(props.range) || isArray(props.range))) return ''
      const start = isNumber(props.range) ? 0 : props.range[0]
      const end = isNumber(props.range) ? props.range : props.range[1]
      const res: VNode[] = []
      for (let i = start; i < end; i++) {
        res.push(<div key={i}>{renderSlot(slots, 'default', { index: i })}</div>)
      }
      return res
    }
  },
})
