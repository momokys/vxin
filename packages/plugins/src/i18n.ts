import {ModuleGraph, Plugin} from 'vite'

export type I18nOptions = {
  prefix: string
}

export const i18n = (opts: I18nOptions): Plugin => {
  let moduleGraph = undefined as unknown as ModuleGraph
  const prefix = opts.prefix.replace('\\', '/')
  return {
    name: 'vite-i18n-plugin',
    configureServer(server) {
      moduleGraph = server.moduleGraph
    },
    load(id: string) {
      if (id.startsWith(prefix)) {
        console.log(id)
      }
      return null
    }
  }
}
