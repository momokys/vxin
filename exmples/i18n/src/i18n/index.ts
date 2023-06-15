import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh: {
      hello: '你好',
    },
  },
})
