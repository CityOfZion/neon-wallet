// @flow
import { api, rpc } from 'neon-js'
// import { extend } from 'lodash'
import { createActions } from 'spunky'

// import { toBigNumber } from '../core/math'
import { ASSETS } from '../core/constants'
import { COIN_DECIMAL_LENGTH } from '../core/formatters'

type Props = {
  net: string,
  address: string,
  tokens: Array<TokenItemType>
}

export const ID = 'DASHBOARD'

async function getBalances (endpoint: string, { net, address, tokens }: Props) {
  const tokenBalances = await api.nep5.getTokenBalances(endpoint, tokens.map(token => token.scriptHash), address)
  const parsedTokenBalances = Object.keys(tokenBalances).map(tokenKey => {
    const foundToken = tokens.find(token => token.symbol === tokenKey)
    console.log('foundToken', {foundToken})
    if (foundToken) {
      return {
        [foundToken.scriptHash]: {...foundToken, balance: tokenBalances[tokenKey]}
      }
    } else return {}
  })
  console.log(tokenBalances)
  console.log({parsedTokenBalances})

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

  const parsedAssets = [ {[ASSETS.NEO]: neoBalance}, {[ASSETS.GAS]: gasBalance} ]

  return [...parsedAssets, ...parsedTokenBalances]
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
