export type Nil = undefined | null

export type Fn<T extends ((...args: any) => any) | Nil = undefined> = T extends Nil ? (...args: any) => any : T

export type RefFn<T extends Fn | Nil = undefined> = Fn<T> & { value: Fn<T> }
