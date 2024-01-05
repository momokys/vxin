export type Null = null
export type NullAble<T> = T | Null
export type Undefined = undefined
export type UndefinedAble<T> = T | Undefined
export type Nil = undefined | null
export type NilAble<T> = T | Nil
export type Dict<T = any> = Record<string, T>
export type Fn<T extends ((...args: any) => any) | Nil = undefined> = T extends Nil ? (...args: any) => any : T
export type RefFn<T extends Fn | Nil = undefined> = Fn<T> & { value: Fn<T> }
