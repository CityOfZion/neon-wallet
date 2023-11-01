// @flow
import { api } from '@cityofzion/neon-js-legacy-latest'
import { rpc as n3Rpc, u as n3U } from '@cityofzion/neon-js'
import { createActions } from 'spunky'

import { getNode, getRPCEndpoint } from './nodeStorageActions'
import { getSettings } from './settingsActions'

type Props = {
  net: string,
  address: string,
}

export const ID = 'claims'

export default createActions(
  ID,
  ({ net, address }: Props = {}) => async (): Promise<*> => {
    const { chain } = await getSettings()
    let endpoint = await getNode(net)
    if (!endpoint) {
      endpoint = await getRPCEndpoint(net)
    }

    if (chain === 'neo2') {
      const unclaimed = await api.neoCli.getMaxClaimAmount(endpoint, address)
      return { total: unclaimed.toRawNumber().toString() }
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
