import { defineSetupVue3 } from '@histoire/plugin-vue'
import Icons from '@vxin/icons'
import './style/index.scss'

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(Icons)
})
