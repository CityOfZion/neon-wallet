// @flow
import { api } from 'neon-js'
import { extend } from 'lodash'

import createRequestActions from '../util/api/createRequestActions'
import { toBigNumber } from '../core/math'
import { ASSETS } from '../core/constants'
import { COIN_DECIMAL_LENGTH } from '../core/formatters'

type Props = {
  net: string,
  address: string,
  tokens: Array<TokenItemType>
}

export const ID = 'BALANCES'

async function getBalances ({ net, address, tokens }: Props) {
  const endpoint = await api.neonDB.getRPCEndpoint(net)

  // token balances
  const promises = tokens.map(async (token) => {
    const { scriptHash } = token
    const response = await api.nep5.getToken(endpoint, scriptHash, address)
    const balance = toBigNumber(response.balance || 0).round(response.decimals).toString()

    return {
      [scriptHash]: { ...response, balance }
    }
  })

  // asset balances
  promises.push((async () => {
    const assetBalances = await api.neonDB.getBalance(net, address)

    return {
      [ASSETS.NEO]: toBigNumber(assetBalances.NEO.balance).toString(),
      [ASSETS.GAS]: toBigNumber(assetBalances.GAS.balance).round(COIN_DECIMAL_LENGTH).toString()
    }
  })())

  return extend({}, ...await Promise.all(promises))
}

export default createRequestActions(ID, ({ net, address, tokens }: Props = {}) => async (state: Object) => {
  return getBalances({ net, address, tokens })
})
