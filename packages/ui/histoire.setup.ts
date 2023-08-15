import { defineSetupVue3 } from '@histoire/plugin-vue'
import { useTheme } from '@/hooks'
import Icons from '@vxin/icons'
import './src/style/index.scss'

export const setupVue3 = defineSetupVue3(({ app }) => {
  useTheme()
  app.use(Icons)
})
