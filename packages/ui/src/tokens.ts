import { InjectionKey } from 'vue'
import { ThemeConfig } from '@/hooks'

export const THEME_KEY: InjectionKey<ThemeConfig> = Symbol()
