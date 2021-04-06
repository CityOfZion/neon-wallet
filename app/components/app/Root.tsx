import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Switch, Route, HashRouter } from 'react-router-dom'

import App from '../app'
import { store } from '../../store/configureStore'

const Home = () => <h1> hello neon 3.0</h1>

export default class Root extends React.Component {
  render(): ReactNode {
    return (
      <Provider store={store}>
        <HashRouter>
          <App>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </App>
        </HashRouter>
      </Provider>
    )
  }
}
