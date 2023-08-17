import { isReactive, watchEffect } from 'vue'
import { generate } from '@vxin/colors'
import DEFAULT_THEME from '@/config/theme'
// import { THEME_KEY } from '@/_tokens'

const STATUS_COLORS = ['primary', 'success', 'warning', 'danger', 'error', 'info'] as const

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

  // provide(THEME_KEY, theme)
}

const genCssVars = (theme: ThemeConfig) => {
  const cssVars: string[] = STATUS_COLORS.reduce((res, key) => {
    const baseColor = theme.colors[key]
    if (baseColor) {
      res.push(`--v-color-${key}: ${baseColor}`)
      generate(baseColor).forEach((value, index) => {
        res.push(`--v-color-${key}-${index}: ${value}`)
      })
    }
    return res
  }, [] as string[])
  const styleContent = cssVars.join(';')
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.setAttribute('vxin', '')
    document.head.insertBefore(styleEl, document.head.children[0])
  }
  styleEl.innerText = `:root {${styleContent}}`
}
