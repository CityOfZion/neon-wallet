// @flow
import React from 'react'
import { Provider } from 'react-redux'
import Routes from './Routes'
import { HashRouter } from 'react-router-dom'

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
