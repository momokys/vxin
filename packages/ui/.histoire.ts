import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  storyMatch: ['src/**/*.story.vue'],
  setupFile: 'src/histoire.ts',
  plugins: [HstVue()],
  vite: {
    root: path.resolve(__dirname),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [vue(), vueJsx()],
  },
})
