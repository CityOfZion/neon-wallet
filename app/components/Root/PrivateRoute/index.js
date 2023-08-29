// @flow
import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import { useAuthStore } from '../../../actions-migrated/auth'

function withAuthenticatedBoolean(WrappedComponent: React$ComponentType<any>) {
  return function EnhancedComponent(props: any) {
    const { account } = useAuthStore()
    console.log({ account })
    return <WrappedComponent {...props} authenticated={!!account.address} />
  }
}

export default compose(
  withRouter,
  withAuthenticatedBoolean,
)(PrivateRoute)
