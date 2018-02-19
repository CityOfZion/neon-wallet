// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import Routes from '../Routes'

type Props = {
  store: Object,
}

export default class Root extends React.Component<Props> {
  render () {
    const { store } = this.props

    return (
      <Provider store={store}>
        <HashRouter>
          <Routes />
        </HashRouter>
      </Provider>
    )
  }
}
