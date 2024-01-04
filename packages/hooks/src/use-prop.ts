import { computed, ComputedRef, getCurrentInstance } from 'vue'

export function useProp<T>(key: string): ComputedRef<T | undefined> {
  const ins = getCurrentInstance()
  return computed(() => (ins?.proxy?.$props as any)?.[key])
}
