import { getCurrentInstance, Ref, ref, watch } from 'vue'

export function useModelState<T extends object, K extends keyof T>(props: T, key: K): Ref<T[K]> {
  const ins = getCurrentInstance()!
  console.log(ins)
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
      ins.emit(`update:${key as string}`, state.value)
    },
  )
  return state
}
