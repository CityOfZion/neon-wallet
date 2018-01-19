// @flow
import { wallet } from 'neon-js'

import withRedirect from './withRedirect'
import { ROUTES } from '../../core/constants'

export default withRedirect(ROUTES.DASHBOARD, (oldAddress, newAddress) => {
  return !oldAddress && wallet.isAddress(newAddress)
})
