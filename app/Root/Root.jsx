// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import Routes from '../Routes'

type Props = {
  store: Object,
}

const Root = ({ store }: Props) =>
  <Provider store={store}>
    <HashRouter>
      <Routes />
    </HashRouter>
  </Provider>

export default Root
