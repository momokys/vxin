import {ModuleGraph, Plugin} from 'vite'

export type I18nOptions = {
  prefix: string
}

export const i18n = (opts: I18nOptions): Plugin => {
  let moduleGraph = undefined as unknown as ModuleGraph
  const prefix = opts.prefix.replaceAll('\\', '/')
  return {
    name: 'vite-i18n-plugin',
    enforce: 'pre',
    transform(code, id) {
      debugger
      const ast = this.parse(code)
      if (id.startsWith(prefix)) {
        console.log(id)
        console.log(ast)
      }
      return code
    }
  }
}
