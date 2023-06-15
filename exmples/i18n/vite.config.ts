import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { parse } from '@vue/compiler-sfc'

// https://vitejs.dev/config/
export default defineConfig(() => {
  console.log('xxx')
  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      {
        name: 'vite-i18n-plugin',
        enforce: 'pre',
        transform(code, id) {
          if (id.startsWith('D:/Document/web/vxin/exmples/i18n/src') && id.endsWith('vue')) {
            console.log(id)

            const sfc = parse(code, {
              filename: id,
              sourceMap: true,
            })
            console.log(sfc)
          }
          return code
        },
      },
    ],
  }
})
