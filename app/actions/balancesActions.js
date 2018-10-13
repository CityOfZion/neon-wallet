// @flow
import { api } from 'neon-js'
import { extend, isEmpty } from 'lodash-es'
import { createActions } from 'spunky'

import { getNode } from './nodeStorageActions'
import { ASSETS } from '../core/constants'
import { COIN_DECIMAL_LENGTH } from '../core/formatters'

type Props = {
  net: string,
  address: string,
  tokens: Array<TokenItemType>
}

export const ID = 'balances'

async function getBalances({ net, address, tokens }: Props) {
  let endpoint = await getNode()
  if (isEmpty(endpoint)) {
    endpoint = await api.getRPCEndpointFrom({ net }, api.neoscan)
  }

  // token balances
  const tokenBalances = await api.nep5.getTokenBalances(
    endpoint,
    tokens
      .filter(token => !token.isUserGenerated)
      .map(token => token.scriptHash),
    address
  )

  const parsedTokenBalances = Object.keys(tokenBalances)
    .map(tokenKey => {
      const foundToken = tokens.find(token => token.symbol === tokenKey)
      if (foundToken && tokenBalances[tokenKey]) {
        return {
          [foundToken.scriptHash]: {
            ...foundToken,
            balance: tokenBalances[tokenKey]
          }
        }
      }
      return {}
    })
    .filter(tokenBalance => !isEmpty(tokenBalance))

  // Handle manually added script hashses here
  const userGeneratedTokenInfo = []
  // eslint-disable-next-line
  for (const token of tokens.filter(token => token.isUserGenerated)) {
    // eslint-disable-next-line
    const info = await api.nep5
      .getToken(endpoint, token.scriptHash, address)
      .catch(error => {
        // eslint-disable-next-line
        console.error(
          'An error occurrred attempting to fetch custom script hash balance info.',
          { error }
        )
        return Promise.resolve()
      })
    if (info) {
      userGeneratedTokenInfo.push({
        scriptHash: token.scriptHash,
        ...info
      })
    }
  }
  userGeneratedTokenInfo.forEach(token => {
    parsedTokenBalances.push({
      [token.scriptHash]: {
        ...token
      }
    })
  })

  // asset balances
  const assetBalances = await api.getBalanceFrom({ net, address }, api.neoscan)

  const { assets } = assetBalances.balance
  // The API doesn't always return NEO or GAS keys if, for example, the address only has one asset
  const neoBalance = assets.NEO ? assets.NEO.balance.toString() : '0'
  const gasBalance = assets.GAS
    ? assets.GAS.balance.round(COIN_DECIMAL_LENGTH).toString()
    : '0'
  const parsedAssets = [
    { [ASSETS.NEO]: neoBalance },
    { [ASSETS.GAS]: gasBalance }
  ]
  // $FlowFixMe
  return extend({}, ...parsedTokenBalances, ...parsedAssets)
}

export default createActions(
  ID,
  ({ net, address, tokens }: Props = {}) => async () =>
    getBalances({ net, address, tokens })
)
