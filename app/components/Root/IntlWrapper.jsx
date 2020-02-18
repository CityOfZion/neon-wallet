// @flow
import React from 'react'
import { compose } from 'recompose'
import { IntlProvider } from 'react-intl'

import translations from '../../translations'
import withLanguageData from '../../hocs/withLanguageData'
import { LANGUAGES } from '../../core/constants'

const { english, korean } = translations

type IntlWrapperProps = {
  children: any,
  language: string,
}

const tranlationsMappings = {
  [LANGUAGES.ENGLISH.value]: english,
  [LANGUAGES.KOREAN.value]: korean,
}

class IntlWrapper extends React.Component<IntlWrapperProps> {
  render() {
    const { children, language } = this.props
    console.log({ language })
    return (
      <IntlProvider locale="en" messages={tranlationsMappings[language]}>
        {children}
      </IntlProvider>
    )
  }
}

export default compose(withLanguageData())(IntlWrapper)
