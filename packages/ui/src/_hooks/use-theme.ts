import {isReactive, provide, watchEffect} from 'vue'
import { generate } from '@vxin/colors'
import DEFAULT_THEME from '@/_config/theme'
import { THEME_KEY } from '@/_tokens'

const STATUS_COLORS = ['primary', 'success', 'warning', 'danger', 'error'] as const

type ColorKey = typeof STATUS_COLORS[number]

export interface ThemeConfig {
  colors: Partial<Record<ColorKey, string>>
}

let styleEl: HTMLStyleElement

export function useTheme(theme: ThemeConfig = DEFAULT_THEME) {
  if (isReactive(theme)) {
    watchEffect(() => genCssVars(theme))
  } else {
    genCssVars(theme)
  }

  provide(THEME_KEY, theme)
}

const genCssVars = (theme: ThemeConfig) => {
  let cssVars: string[] = []
  STATUS_COLORS.forEach((key) => {
    const baseColor = theme.colors[key]
    if (baseColor) {
      cssVars.push(`--v-color-${key}: ${baseColor}`)
      generate(baseColor).forEach((value, index) => {
        cssVars.push(`--v-color-${key}-${index}: ${value}`)
      })
    }
  })
  const styleContent = cssVars.join(';')
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.setAttribute('vxin', '')
    document.head.insertBefore(styleEl, document.head.children[0])
  }
  styleEl.innerText = `:root {${styleContent}}`
}
