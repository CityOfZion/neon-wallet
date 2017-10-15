import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import './styles/main.scss'

const store = configureStore()

render(
  <AppContainer>
    <Root store={store} history={hashHistory} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default
    render(
      <AppContainer>
        <NewRoot store={store} history={hashHistory} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}

export default store.dispatch
