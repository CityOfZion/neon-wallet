// @flow
import { api } from '@cityofzion/neon-js'
import { rpc as n3Rpc, u as n3U } from '@cityofzion/neon-js-next'
import { createActions } from 'spunky'

import { getNode, getRPCEndpoint } from './nodeStorageActions'

type Props = {
  net: string,
  address: string,
  chain: string,
}

export const ID = 'claims'

export default createActions(
  ID,
  ({ net, address, chain }: Props = {}) => async (): Promise<*> => {
    if (chain === 'neo2') {
      const total = await api.getMaxClaimAmountFrom(
        { net, address },
        api.neoscan,
      )
      return { total: total.toString() }
    }

    let endpoint = await getNode(net)
    if (!endpoint) {
      endpoint = await getRPCEndpoint(net)
    }
    const rpcClient = new n3Rpc.RPCClient(endpoint)
    try {
      const query = {
        method: 'getunclaimedgas',
        params: [address],
      }

      const response = await rpcClient.execute(new n3Rpc.Query(query))

      const { unclaimed } = response

      return {
        total: n3U.BigInteger.fromNumber(unclaimed).toDecimal(8),
      }
    } catch (e) {
      console.error(e)
      return { total: '0' }
    }
  },
)
