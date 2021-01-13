// @flow
import React from 'react'
import { compose } from 'recompose'
import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-pluralrules/polyfill-locales'
import { IntlProvider } from 'react-intl'

import translations from '../../translations'
import withLanguageData from '../../hocs/withLanguageData'
import { LANGUAGES } from '../../core/constants'

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
  language: string,
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

class IntlWrapper extends React.Component<IntlWrapperProps> {
  render() {
    const { children, language } = this.props
    return (
      <IntlProvider
        locale="en"
        messages={tranlationsMappings[language] || english}
      >
        {children}
      </IntlProvider>
    )
  }
}

export default compose(withLanguageData())(IntlWrapper)
