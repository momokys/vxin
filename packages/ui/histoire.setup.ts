import { defineSetupVue3 } from '@histoire/plugin-vue'
import * as Icons from '@vxin/icons'
import './src/style/index.scss'

export const setupVue3 = defineSetupVue3(({ app }) => {
  Object.entries(Icons).forEach(([name, icon]) => {
    app.component(name, icon)
  })
})
