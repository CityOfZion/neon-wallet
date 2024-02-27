import { initReactI18next } from 'react-i18next'
import { enResources } from '@renderer/locales/en'
import i18n from 'i18next'

export const setupI18next = () => {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources: {
        en: enResources,
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

export const getI18next = () => {
  setupI18next()
  return i18n
}
