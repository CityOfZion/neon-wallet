// @flow
import { api, rpc } from 'neon-js'
import { createActions } from 'spunky'

import { getNetworkById } from '../core/deprecated'

type Props = {
  networkId: string
}

export const ID = 'BLOCK_HEIGHT'

export default createActions(ID, ({ networkId }: Props = {}) => async (state: Object) => {
  const net = getNetworkById(networkId)
  const endpoint = await api.getRPCEndpointFrom({ net }, api.neoscan)
  const client = new rpc.RPCClient(endpoint)
  return client.getBlockCount()
})
