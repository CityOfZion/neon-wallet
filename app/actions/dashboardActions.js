// @flow
import { api, rpc } from 'neon-js'
import { extend } from 'lodash'
import { createActions } from 'spunky'

import { toBigNumber } from '../core/math'
import { ASSETS } from '../core/constants'
import { COIN_DECIMAL_LENGTH } from '../core/formatters'

type Props = {
  net: string,
  address: string,
  tokens: Array<TokenItemType>
}

export const ID = 'DASHBOARD'

async function getBalances (endpoint: string, { net, address, tokens }: Props) {
  // token balances
  const promises = tokens.map(async token => {
    const { scriptHash } = token

    try {
      const response = await api.nep5.getToken(endpoint, scriptHash, address)
      const balance = toBigNumber(response.balance || 0)
        .round(response.decimals)
        .toString()

      return {
        [scriptHash]: { ...response, scriptHash, balance }
      }
    } catch (err) {
      // invalid scriptHash
      return {}
    }
  })

  // asset balances
  promises.push(
    (async () => {
      const assetBalances = await api.getBalanceFrom(
        { net, address },
        api.neoscan
      )
      const { assets } = assetBalances.balance

      // The API doesn't always return NEO or GAS keys if, for example, the address only has one asset
      const neoBalance = assets.NEO ? assets.NEO.balance.toString() : '0'
      const gasBalance = assets.GAS
        ? assets.GAS.balance.round(COIN_DECIMAL_LENGTH).toString()
        : '0'

      return { [ASSETS.NEO]: neoBalance, [ASSETS.GAS]: gasBalance }
    })()
  )

  return extend({}, ...(await Promise.all(promises)))
}

export default createActions(
  ID,
  ({ net, address, tokens }: Props = {}) => async (state: Object) => {
    const endpoint = await api.getRPCEndpointFrom({ net }, api.neoscan)
    const client = new rpc.RPCClient(endpoint)
    let balances = null
    let blockHeight = null

    try {
      balances = await getBalances(endpoint, { net, address, tokens })
    } catch (err) {
      console.error(err)
    }

    try {
      blockHeight = await client.getBlockCount()
    } catch (err) {
      console.error(err)
    }

    return {
      balances,
      blockHeight
    }
  }
)
