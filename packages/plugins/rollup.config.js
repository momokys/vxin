import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript2 from 'rollup-plugin-typescript2'

const bndler = (format) => {
  return {
    input: './src/index.ts',
    output: {
      name: '@vxin/plugins',
      file: `./dist/index.${format}.js`,
      format,
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      resolve,
      typescript2({ check: false }),
      commonjs,
    ],
    external: ['vite'],
  }
}

export default [
  bndler('cjs'),
  bndler('es'),
]
