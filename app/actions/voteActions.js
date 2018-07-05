// @flow
import { api, rpc } from 'neon-js'
import { createActions } from 'spunky'

import { getNetworkById } from '../core/deprecated'

type Props = {
  networkId: string,
  address: string
}

export const ID = 'VOTE'

export default createActions(
  ID,
  ({ networkId, address }: Props = {}) => async (state: Object) => {
    const net = getNetworkById(networkId)
    const endpoint = await api.getRPCEndpointFrom({ net }, api.neoscan)
    const client = new rpc.RPCClient(endpoint)

    let validators = null
    let votes = null

    try {
      validators = await client.getValidators()
      const accountState = await client.getAccountState(address)
      if (accountState) {
        votes = accountState.votes
      }
    } catch (err) {
      console.log(err)
    }

    return {
      validators,
      votes
    }
  }
)
