// @flow
import React from 'react'
import { Provider } from 'react-redux'
import Routes from './Routes'
import { BrowserRouter } from 'react-router-dom'

type Props = {
  store: Object,
}

const Root = ({ store }: Props) =>
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>

export default Root
