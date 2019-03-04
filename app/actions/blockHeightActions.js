// @flow
import { api } from '@cityofzion/neon-js'
import { createActions } from 'spunky'

import { getNetworkById } from '../core/deprecated'

type Props = {
  networkId: string,
}

export const ID = 'blockHeight'

export default createActions(ID, ({ networkId }: Props = {}) => async () => {
  const network = getNetworkById(networkId)
  return api.getWalletDBHeightFrom({ net: network }, api.neoscan)
})
