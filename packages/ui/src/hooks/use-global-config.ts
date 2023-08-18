import { globalConfig, GlobalConfig } from '@/utils'
import { computed, ComputedRef } from 'vue'
import { isNil } from '@vxin/utils'

export const useGlobalConfig = <T extends keyof GlobalConfig>(key: T, fallback?: ComputedRef<GlobalConfig[T]>) => {
  return computed(() => (isNil(globalConfig[key]) ? fallback?.value : globalConfig[key])) as ComputedRef<
    GlobalConfig[T]
  >
}
