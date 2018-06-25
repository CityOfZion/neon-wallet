// @flow
import { api } from 'neon-js'
import { createActions } from 'spunky'

import { getNetworkById } from '../core/deprecated'

type Props = {
  networkId: string
}

export const ID = 'blockHeight'

export default createActions(
  ID,
  ({ networkId }: Props = {}) => async (state: Object) => {
    const network = getNetworkById(networkId)
    return api.getWalletDBHeightFrom({ net: network }, api.neoscan)
  }
)
