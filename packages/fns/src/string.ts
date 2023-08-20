import { isString } from './is'

export const upperFirst = (target?: string) => {
  if (!isString(target)) return ''
  if (target.length <= 1) return target.toUpperCase()
  else return target.charAt(0).toUpperCase() + target.substring(1, target.length)
}
export const lowerFirst = (target?: string) => {
  if (!isString(target)) return ''
  if (target.length <= 1) return target.toLowerCase()
  else return target.charAt(0).toLowerCase() + target.substring(1, target.length - 1)
}

export const camelCase = (target?: string) => {
  if (!isString(target)) return ''
  else return target.replaceAll(/[^a-zA-Z0-9]\w/g, (item) => item.charAt(1).toUpperCase())
}
