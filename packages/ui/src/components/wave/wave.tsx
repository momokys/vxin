import { defineComponent, nextTick, ref } from 'vue'
import { useNamespace } from '@/hooks'

export default defineComponent({
  name: 'VWave',
  emits: ['click'],
  setup() {
    const ns = useNamespace('wave')
    const elRef = ref<HTMLElement>()
    const active = ref<boolean>(false)
    let timer: any = null
    const play = (color: string) => {
      elRef.value?.style.setProperty(ns.cssVarName('color'), color)
      if (timer !== null) {
        clearTimeout(timer)
        active.value = false
        timer = null
      }
      nextTick(() => {
        active.value = true
        timer = setTimeout(() => {
          active.value = false
          timer = null
        }, 600)
      })
    }
    return {
      elRef,
      ns,
      active,
      play,
    }
  },
  render() {
    return <div ref="elRef" aria-hidden={true} class={[this.ns.b(), this.ns.is('active', this.active)]} />
  },
})
