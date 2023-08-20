export const defaultNamespace = 'v'

const _bem = (namespace: string, block: string, blockSuffix: string, element: string, modifier: string) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export function useNamespace(block: string) {
  const namespace = defaultNamespace
  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '', '')
  const e = (element?: string) => (element ? _bem(namespace, block, '', element, '') : '')
  const m = (modifier?: string) => (modifier ? _bem(namespace, block, '', '', modifier) : '')
  const em = (element: string, modifier: string) =>
    element && modifier ? _bem(namespace, block, '', element, modifier) : ''
  const is = (name: string, state?: boolean) => (state ? `is-${name}` : '')
  const cssVarName = (name: string) => `--${namespace}-${block}-${name}`
  const cssVar = (name: string, defaultVar: string) => `var(${cssVarName(name)}, ${defaultVar})`
  return {
    b,
    e,
    m,
    em,
    is,
    cssVar,
    cssVarName,
  }
}
