import { build } from 'vite'

const buildBundle = async () => {
  await build({
    build: {
      minify: true,
      lib: {
        entry: ['src/index.ts'],
      },
      rollupOptions: {
        external: ['vite'],
        output: [
          {
            format: 'es',
            entryFileNames: (chunk) => {
              const reg = /^([^.]+?)(?=(\.\w+)|$)/g
              return reg.exec(chunk.name) ? `${RegExp.$1}.js` : `${chunk.name}.js`
            },
            preserveModules: true,
            dir: './dist/es',
          },
          {
            format: 'cjs',
            entryFileNames: (chunk) => {
              const reg = /^([^.]+?)(?=(\.\w+)|$)/g
              return reg.exec(chunk.name) ? `${RegExp.$1}.js` : `${chunk.name}.js`
            },
            preserveModules: true,
            dir: './dist/lib',
          },
          {
            format: 'umd',
            name: 'index',
            entryFileNames: '[name].umd.min.js',
            dir: './dist',
            exports: 'named',
            globals: {
              vue: 'Vue',
            },
          },
          {
            format: 'iife',
            name: 'index',
            entryFileNames: '[name].iife.min.js',
            dir: './dist',
            exports: 'named',
            globals: {
              vue: 'Vue',
            },
          },
        ],
      },
    },
  })
}
buildBundle()
