// @flow
import { createActions } from 'spunky'
import axios from 'axios'
import { rpc } from '@cityofzion/neon-js-legacy'
import { rpc as n3Rpc } from '@cityofzion/neon-js'

import { getSettings } from './settingsActions'
import { getNode, getRPCEndpoint } from './nodeStorageActions'

export const ID = 'nft'
type Props = {
  net: string,
  address: string,
  chain?: string,
}

async function getNFTs({ net, address }) {
  let endpoint = await getNode(net)
  if (!endpoint) {
    endpoint = await getRPCEndpoint(net)
  }

  const rpcClient = new rpc.RPCClient(endpoint, '2.3.3')

  const { result } = await rpcClient.execute(
    new rpc.Query({
      method: 'getnep11balances',
      params: [address],
    }),
  )

  const results = []

  if (result && result.balance && result.balance.length) {
    for (const nft of result.balance) {
      const tokenNameResponse = await new n3Rpc.RPCClient(endpoint)
        .invokeFunction(nft.assethash, 'symbol')
        .catch(e => {
          console.error({ e })
        })

      const symbol = atob(tokenNameResponse.stack[0].value)

      const API_URL = `https://dora.coz.io/api/v2/neo3/${
        net === 'TestNet' ? 'testnet' : 'mainnet'
      }/contract/${nft.assethash}`

      const { data } = await axios.get(API_URL)

      const collectedData = {
        name: data.manifest.name || 'N/A',
        symbol,
        count: nft.tokens.length,
      }

      results.push(collectedData)
    }
  }

  return results
}

export default createActions(ID, ({ net, address }: Props = {}) => async () => {
  const { chain } = await getSettings()
  if (chain === 'neo3') return getNFTs({ net, address })
  return []
})
