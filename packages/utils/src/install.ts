import type { App, AppContext, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T extends Record<string, any>, E extends Record<string, any>>(main: T, extra?: E) => {
  ;(main as SFCWithInstall<T>).install = (app: App) => {
    app.component(main.name, main)
  }
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}

export type FnInstallWithContext<T> = T &
  Plugin & {
    _context: AppContext | null
  }

export const withInstallFn = <T>(fn: T, name: string) => {
  ;(fn as SFCWithInstall<T>).install = (app) => {
    ;(fn as unknown as App)._context = app._context
    app.config.globalProperties[name] = fn
  }
  return fn as FnInstallWithContext<T>
}
