// @flow
import { api, rpc } from '@cityofzion/neon-js-legacy'
import { createActions } from 'spunky'

import { getNetworkById } from '../core/deprecated'
import { getNode, getRPCEndpoint } from './nodeStorageActions'

type Props = {
  networkId: string,
  address: string,
}

export const ID = 'VOTE'

export default createActions(
  ID,
  ({ networkId, address }: Props = {}) => async () => {
    const net = getNetworkById(networkId)
    let endpoint = await getNode(net)
    if (!endpoint) {
      endpoint = await getRPCEndpoint(net)
    }
    const client = new rpc.RPCClient(endpoint)

    const validators = await client.getValidators()
    const accountState = await client.getAccountState(address)

    return {
      validators,
      votes: accountState.votes,
    }
  },
)
