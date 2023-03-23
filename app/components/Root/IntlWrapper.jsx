// @flow
import React from 'react'
import { compose } from 'recompose'
import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-pluralrules/polyfill-locales'
import { IntlProvider } from 'react-intl'

import translations from '../../translations'
import { LANGUAGES, DEFAULT_LANGUAGE } from '../../core/constants'
import { useSettingsContext } from '../../context/settings/SettingsContext'

const {
  english,
  korean,
  french,
  vietnamese,
  chinese,
  german,
  italian,
  portuguese,
  turkish,
  arabic,
  russian,
  dutch,
} = translations

type IntlWrapperProps = {
  children: any,
}

const tranlationsMappings = {
  [LANGUAGES.ENGLISH.value]: english,
  [LANGUAGES.KOREAN.value]: korean,
  [LANGUAGES.FRENCH.value]: french,
  [LANGUAGES.VIETNAMESE.value]: vietnamese,
  [LANGUAGES.GERMAN.value]: german,
  [LANGUAGES.CHINESE.value]: chinese,
  [LANGUAGES.ITALIAN.value]: italian,
  [LANGUAGES.PORTUGUESE.value]: portuguese,
  [LANGUAGES.TURKISH.value]: turkish,
  [LANGUAGES.ARABIC.value]: arabic,
  [LANGUAGES.RUSSIAN.value]: russian,
  [LANGUAGES.DUTCH.value]: dutch,
}

function IntlWrapper(props: IntlWrapperProps) {
  const { children } = props
  const { settings } = useSettingsContext()

  const language = settings
    ? settings.language || DEFAULT_LANGUAGE
    : DEFAULT_LANGUAGE

  return (
    <IntlProvider
      locale="en"
      messages={tranlationsMappings[language] || english}
    >
      {children}
    </IntlProvider>
  )
}

export default IntlWrapper
