// @flow
import { api } from '@cityofzion/neon-js'
import { rpc as n3Rpc, u as n3U } from '@cityofzion/neon-js-next'
import { createActions } from 'spunky'

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
    // TODO: this must be dynamic
    const NODE_URL = 'https://testnet2.neo.coz.io:443'
    const rpcClient = new n3Rpc.RPCClient(NODE_URL)
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
