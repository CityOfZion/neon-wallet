// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import IntlWrapper from './IntlWrapper'
import Routes from './Routes'

type Props = {
  store: Object,
}

export default class Root extends React.Component<Props> {
  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <IntlWrapper lang="english">
          <HashRouter>
            <Routes store={store} />
          </HashRouter>
        </IntlWrapper>
      </Provider>
    )
  }
}
