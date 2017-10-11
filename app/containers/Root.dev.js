import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
// import DevTools from './DevTools';
import { Router } from 'react-router'
import routes from '../routes'

export default class Root extends Component {
  render () {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: object.isRequired,
  history: object.isRequired
}
