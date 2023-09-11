import { build, InlineConfig } from 'vite'
import { getPackgeJson } from './pkg'
import { resolve } from 'path'
import { distRoot } from './process'

export const buildModules = async (config?: InlineConfig) => {
  const packageJson = await getPackgeJson()
  await build({
    ...config,
    build: {
      lib: {
        name: packageJson.name,
        entry: packageJson.main,
      },
      rollupOptions: {
        external: [],
        output: [
          {
            format: 'es',
            dir: resolve(distRoot, './es'),
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: './src',
            entryFileNames: '[name].mjs',
          },
          {
            format: 'cjs',
            dir: resolve(distRoot, './lib'),
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: './src',
            entryFileNames: '[name].mjs',
            exports: 'named',
          },
        ],
      },
    },
  })
}
