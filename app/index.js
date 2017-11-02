import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import store from './store/configureStore'
import Root from './containers/Root'
import './styles/main.scss'

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default
    render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
