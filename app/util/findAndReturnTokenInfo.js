// @flow
import { api } from '@cityofzion/neon-js'

import { imageMap } from '../assets/nep5/png'
import { getDefaultTokens } from '../core/nep5'
import { ASSETS, NEO_ID, GAS_ID } from '../core/constants'
import { getRPCEndpoint } from '../actions/nodeStorageActions'

export const findAndReturnTokenInfo = async (
  scriptHash: string,
  net: string,
): Promise<any> => {
  const tokens = await getDefaultTokens()
  const token = tokens.find(token => token.scriptHash.includes(scriptHash))
  const getImage = symbol => imageMap[symbol]
  if (token) return token
  if (scriptHash.includes(NEO_ID)) {
    return {
      symbol: ASSETS.NEO,
      image: getImage(ASSETS.NEO),
    }
  }
  if (scriptHash.includes(GAS_ID)) {
    return {
      symbol: ASSETS.GAS,
      image: getImage(ASSETS.GAS),
    }
  }
  const endpoint = await getRPCEndpoint(net)
  const tokenInfo = await api.nep5.getToken(endpoint, scriptHash).catch(e => {
    console.error(e)
    return {}
  })
  return {
    symbol: tokenInfo.symbol,
  }
}
