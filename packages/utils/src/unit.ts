import { isString } from '../fns'

export function addunit(value: number | string, unit: string) {
  return !isString(value) ? `${value}${unit}` : value
}
