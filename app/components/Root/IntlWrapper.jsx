// @flow
import React from 'react'
import { IntlProvider } from 'react-intl'

import translations from '../../translations'

const { english } = translations

type IntlWrapperProps = {
  children: any,
  lang: string,
}

class IntlWrapper extends React.Component<IntlWrapperProps> {
  render() {
    const { children, lang } = this.props
    return (
      <IntlProvider locale="en" messages={english}>
        {children}
      </IntlProvider>
    )
  }
}

export default IntlWrapper
