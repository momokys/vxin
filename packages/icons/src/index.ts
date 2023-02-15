import * as icons from './components'
import { Plugin } from 'vue'

export default {
  install: (app) => {
    Object.entries(icons).forEach(([name, icon]) => {
      app.component(name, icon)
    })
  },
} as Plugin

export * from './components'
