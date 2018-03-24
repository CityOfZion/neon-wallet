// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Routes from '../Routes'

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
