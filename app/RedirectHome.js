// @flow
import React from 'react'
import { Redirect, withRouter, type Location } from 'react-router-dom'

import { ROUTES } from './core/constants'

type Props = {
  location: Location
}

const isInitialBoot = (location) => {
  // hot reload starts at `/dist` path
  return location.pathname === '/dist'
}

const RedirectHome = (props: Props) => {
  if (isInitialBoot(props.location)) {
    return <Redirect to={ROUTES.HOME} />
  } else {
    return null
  }
}

export default withRouter(RedirectHome)
