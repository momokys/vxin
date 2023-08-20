import type { App, AppContext, Plugin } from 'vue'

export type SFCInstall<T> = T & Plugin

export const withInstall = <T extends Record<string, any>>(sfc: T, installFn?: (app: App) => void) => {
  ;(sfc as SFCInstall<T>).install = (app: App) => {
    app.component(sfc.name, sfc)
    installFn?.(app)
  }
  return sfc as SFCInstall<T>
}

export type FnInstallWithContext<T> = T &
  Plugin & {
    _context: AppContext | null
  }

export const withInstallFn = <T>(fn: T, name: string) => {
  ;(fn as SFCInstall<T>).install = (app) => {
    ;(fn as unknown as App)._context = app._context
    app.config.globalProperties[name] = fn
  }
  return fn as FnInstallWithContext<T>
}
