// @flow
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { omit } from 'lodash-es'

import { ROUTES } from '../../../core/constants'

type Props = {
  authenticated: ?boolean,
  component: Function
}

export default class PrivateRoute extends React.Component<Props> {
  static defaultProps = {
    authenticated: false
  }

  render() {
    return (
      <Route
        {...omit(this.props, 'authenticated', 'component')}
        render={this.renderRoute}
      />
    )
  }

  renderRoute = (props: Object) => {
    if (this.props.authenticated) {
      const Component = this.props.component
      return <Component {...props} />
    }
    return <Redirect to={ROUTES.HOME} />
  }
}
