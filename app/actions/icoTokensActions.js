// @flow
import { api } from 'neon-js'
import { isEmpty } from 'lodash-es'
import { createActions } from 'spunky'

import { getNode, getRPCEndpoint } from './nodeStorageActions'

import ICOTokenList from '../../ICOTokens.json'

type Props = {
  net: string,
  tokens: Array<TokenItemType>
}

export const ID = 'icoTokens'

async function getICOTokens({ net, tokens }: Props) {
  if (!tokens) return []
  const userGeneratedTokens = tokens.filter(token => token.isUserGenerated)

  let endpoint = await getNode(net)
  if (!endpoint) {
    endpoint = await getRPCEndpoint(net)
  }

  if (userGeneratedTokens.length === 0 && ICOTokenList.ICOTokens.length === 0)
    return []

  const combinedTokenList = [
    ...userGeneratedTokens,
    ...ICOTokenList.ICOTokens
  ].map(async token => {
    try {
      const tokenInfo = await api.nep5.getToken(endpoint, token.scriptHash)

      return {
        token: tokenInfo.symbol,
        name: tokenInfo.name,
        supply: tokenInfo.totalSupply,
        id: `${tokenInfo.symbol}-${tokenInfo.totalSupply}`,
        scriptHash: token.scriptHash
      }
    } catch (err) {
      return null
    }
  })

  const resolvedPromises = await Promise.all(combinedTokenList)

  return resolvedPromises.filter(item => !!item)
}

export default createActions(ID, ({ net, tokens }: Props = {}) => async () =>
  getICOTokens({ net, tokens })
)
