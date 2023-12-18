import { computed, defineComponent,h } from 'vue'

export default defineComponent({
  name: 'VBoard',
  props: {
    status: String,
    level: Number,
  },
  setup(props) {
    const style = computed(() => {
      return {
        color: 'var(v-color-' + props.status + '-' + props.level + ')',
      }
    })
    return () => <div style={style.value} />
  },
})
