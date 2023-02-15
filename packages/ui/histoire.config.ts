import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  storyMatch: ['**/stories/*.story.vue'],
  setupFile: './histoire.setup.ts',
  plugins: [HstVue()],
})
