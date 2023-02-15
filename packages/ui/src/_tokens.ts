import { InjectionKey } from 'vue'
import { ThemeConfig } from '@/_hooks'

export const THEME_KEY: InjectionKey<ThemeConfig> = Symbol()
