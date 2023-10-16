import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import enCommon from '../locales/en/pages.json'
import enPages from '../locales/en/pages.json'

export const defaultNS = 'common'
export const resources = {
  en: { common: enCommon, pages: enPages },
}

export const setupI18n = () => {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources,
      ns: ['common'],
      defaultNS,
      fallbackLng: 'en',
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false,
      },
    })
  }
}
