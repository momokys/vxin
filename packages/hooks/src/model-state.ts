import { Fn } from '@vxin/utils'
import { Ref, ref, watch } from 'vue'

export function useModelState<T extends object, K extends keyof T>(props: T, emit: Fn, key: K): Ref<T[K]> {
  const state: any = ref(props[key])
  watch(
    () => props[key],
    () => {
      state.value = props[key]
    },
  )
  watch(
    () => state.value,
    () => {
      emit(`update:${key as string}`, state.value)
    },
  )
  return state
}
