import { defineSetupVue3 } from '@histoire/plugin-vue'
import * as Icons from '@vxin/icons'
import '@vxin/ui/src/_style/index.scss'

export const setupVue3 = defineSetupVue3(({ app }) => {
  Object.entries(Icons).forEach(([name, icon]) => {
    app.component(name, icon)
  })
})
