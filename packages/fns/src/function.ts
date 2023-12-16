import { Fn, Nil, RefFn } from './types'

export const NOOP_FN: Fn = () => {}
export const useRefFn = <T extends Fn | Nil = undefined>(fn?: T): RefFn<T> => {
  const res: any = (...args: any) => res.value(...args)
  res.value = fn ?? NOOP_FN
  return res
}
