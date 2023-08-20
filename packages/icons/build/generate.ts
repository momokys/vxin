import glob from 'fast-glob'
import { emptyDir, ensureDir } from 'fs-extra'
import { findWorkspaceDir } from '@pnpm/find-workspace-dir'
import { findWorkspacePackages } from '@pnpm/find-workspace-packages'
import { readFile, writeFile } from 'fs/promises'
import { upperFirst, camelCase } from '@vxin/fns'
import { COMPONENTS_DIR, COMPONENTS_ENTRY } from './config'

type SvgMeta = { file: string; name: string; componentName: string }

export async function getSvgFiles() {
  const pkgs = await findWorkspacePackages((await findWorkspaceDir(process.cwd()))!)
  const pkg = pkgs.find((pkg) => pkg.manifest.name === '@vxin/icons')!
  return glob('./svg/*.svg', { cwd: pkg.dir, absolute: true })
}

export async function getSvgMeta(files: string[]) {
  return files.map((file) => {
    const name = file.replace(/^.*\/([\w-]+)\.svg$/g, '$1')
    const componentName = upperFirst(camelCase(name))
    return {
      file,
      name,
      componentName,
    } as SvgMeta
  })
}

export async function svgToVueComponent(svgMate: SvgMeta) {
  const content = await readFile(svgMate.file, 'utf8')
  const reg = /<path[\s\S]*?\sd=".*?"/g
  const paths = reg
    .exec(content)
    ?.map((item) => {
      const d = item.replace(/<path[\s\S]*?\sd="(.*?)"/g, '$1')
      return `<path d="${d}" />`
    })
    .join('')
  return `
<template>
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">${paths}</svg>
</template>

<script lang="ts">
import { DefineComponent } from 'vue'
export default {
  name: '${svgMate.componentName}',
} as DefineComponent
</script>
`.trim()
}

export async function generateVueComponent(svgMates: SvgMeta[]) {
  for (const item of svgMates) {
    const code = await svgToVueComponent(item)
    await writeFile(`${COMPONENTS_DIR}/${item.name}.vue`, code, 'utf8')
  }
}

export async function generateEntry(svgMates: SvgMeta[]) {
  const entryCode = svgMates
    .map((item) => `export { default as ${item.componentName} } from './${item.name}.vue'`)
    .join('\n')
  await writeFile(COMPONENTS_ENTRY, entryCode, 'utf8')
}

export function generate() {
  ;(async () => {
    await ensureDir(COMPONENTS_DIR)
    await emptyDir(COMPONENTS_DIR)
    const svgFiles = await getSvgFiles()
    const svgMates = await getSvgMeta(svgFiles)
    await generateVueComponent(svgMates)
    await generateEntry(svgMates)
  })()
}

generate()
