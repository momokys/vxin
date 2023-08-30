import { spawn } from 'child_process'
import { resolve } from 'path'
import * as process from 'process'
import consola from 'consola'
import chalk from 'chalk'

export const projRoot = resolve(__dirname, '../../../')
export const pkgRoot = resolve(process.cwd())
export const distRoot = resolve(pkgRoot, './dist')

export const run = async (command: string, cwd = projRoot) =>
  new Promise<void>((resolve, reject) => {
    if (process.platform === 'win32') {
      command = command.replace(/\//g, '\\')
    }
    const [cmd, ...args] = command.split(' ')
    consola.info(`run: ${chalk.green(`${command}`)}`)

    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    })

    const onProcessExit = () => app.kill('SIGHUP')

    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit)
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`))
      }
    })
    process.on('exit', onProcessExit)
  })
