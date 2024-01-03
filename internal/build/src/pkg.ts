import { readJSON } from 'fs-extra'
import { pkgRoot } from './process'
import { isObject } from '@vxin/fns'

export const getPackageJson = async () => {
  return await readJSON(pkgRoot, './package.json')
}

export const getExternal = (packageJson: Record<string, any>) => {
  const external: string[] = []
  if (isObject(packageJson.dependencies)) {
    external.push(...Object.keys(packageJson.dependencies))
  }
  if (isObject(packageJson.devDependencies)) {
    external.push(...Object.keys(packageJson.devDependencies))
  }
  return external
}
