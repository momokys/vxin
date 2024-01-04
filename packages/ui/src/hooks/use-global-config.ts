import { globalConfig, GlobalConfig } from '@/utils'
import { computed, ComputedRef } from 'vue'

export const useGlobalConfig = <T extends keyof GlobalConfig>(key: T, fallback?: ComputedRef<GlobalConfig[T]>) => {
  return computed(() => globalConfig[key] ?? fallback?.value) as ComputedRef<GlobalConfig[T]>
}
