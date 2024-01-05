import { computed, getCurrentInstance, Ref, ref, watch } from 'vue'

export function useVModel<T extends object, K extends keyof T>(props: T, key: K, possessive = false): Ref<T[K]> {
  const ins = getCurrentInstance()!
  const eNam = `update:${key as string}`
  if (possessive) {
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
        ins.emit(eNam, state.value)
      },
    )
    return state
  } else {
    return computed({
      get() {
        return props[key]
      },
      set(value) {
        ins.emit(eNam, value)
      },
    })
  }
}
