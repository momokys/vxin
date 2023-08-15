import { isString } from '@vxin/fns'

export function addunit(value: number | string, unit: string) {
  return !isString(value) ? `${value}${unit}` : value
}
