import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  storyMatch: ['src/**/*.story.vue'],
  setupFile: './histoire.setup.ts',
  plugins: [HstVue()],
})
