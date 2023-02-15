import { ComponentSize } from './types'

export type InstallOptions = {
  size?: ComponentSize
  zIndex?: number
}

let config = {} as InstallOptions

export const setConfig = (option: InstallOptions) => {
  config = option
}

export const getConfig = (key: keyof InstallOptions): unknown => {
  return config[key]
}
