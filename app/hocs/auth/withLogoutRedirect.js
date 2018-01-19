// @flow
import { wallet } from 'neon-js'

import withRedirect from './withRedirect'
import { ROUTES } from '../../core/constants'

export default withRedirect(ROUTES.HOME, (oldAddress, newAddress) => {
  return wallet.isAddress(oldAddress) && !newAddress
})
