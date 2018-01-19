// @flow
import { api } from 'neon-js'

import createRequestActions from '../util/api/createRequestActions'
import { getNetworkById } from '../core/deprecated'

type Props = {
  networkId: string
}

export const ID = 'BLOCK_HEIGHT'

export default createRequestActions(ID, ({ networkId }: Props = {}) => async (state: Object) => {
  const network = getNetworkById(networkId)
  return api.neonDB.getWalletDBHeight(network)
})
