import { reactive } from 'vue'
import { ComponentSize } from './types'

export interface GlobalConfig {
  size: ComponentSize
  zIndex: number
}

export const globalConfig = reactive<GlobalConfig>({
  size: 'medium',
  zIndex: 1000,
})
