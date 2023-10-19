import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import enCommon from '../locales/en/common.json'
import enComponents from '../locales/en/components.json'
import enPages from '../locales/en/pages.json'

export const setupI18n = () => {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources: {
        en: { common: enCommon, pages: enPages, components: enComponents },
      },
      ns: ['common'],
      defaultNS: 'common',
      fallbackLng: 'en',
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false,
      },
    })
  }
}
