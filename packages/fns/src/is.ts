export const isString = (target: any): target is string => {
  return typeof target === 'string'
}

export const isNumber = (target: any): target is number => {
  return typeof target === 'number'
}

export const isFunction = (target: any): target is (...args: any) => any => {
  return typeof target === 'function'
}
export const isUndefined = (target: any): target is undefined => {
  return target === undefined
}
export const isNull = (target: any): target is null => {
  return target === null
}
export const isNil = (target: any): target is null | undefined => {
  return target === null || target === undefined
}
export const isEmpty = (target: any) => {
  if (typeof target === null || typeof target === 'undefined') return true
  else if (Array.isArray(target) || typeof target === 'string') return target.length === 0
  else if (typeof target === 'object') return Object.keys(target).length === 0
  else return false
}
export const isObject = (target: any): target is object => {
  return typeof target === 'object'
}
export const isArray = (target: any): target is any[] => {
  return Array.isArray(target)
}
