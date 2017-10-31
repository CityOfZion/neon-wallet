// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../Routes'

type Props = {
  store: Object,
}

export default class Root extends Component<Props> {
  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    )
  }
}
