// @flow
import { api } from '@cityofzion/neon-js-legacy'
import N3Neon, { rpc as n3Rpc } from '@cityofzion/neon-js'

import axios from 'axios'
import { imageMap } from '../assets/nep5/png'
import { getDefaultTokens } from '../core/nep5'
import { ASSETS, NEO_ID, GAS_ID } from '../core/constants'
import { getNode, getRPCEndpoint } from '../actions/nodeStorageActions'
import { getSettings } from '../actions/settingsActions'

export const getImageBySymbol = (symbol: string) => imageMap[symbol]

export const findAndReturnTokenInfo = async (
  scriptHash: string,
  net: string,
  symbol?: string,
): Promise<any> => {
  const { chain } = await getSettings()

  if (chain === 'neo3') {
    const NEO = {
      symbol: ASSETS.NEO,
      image: getImageBySymbol(ASSETS.NEO),
    }
    const GAS = {
      symbol: ASSETS.GAS,
      image: getImageBySymbol(ASSETS.GAS),
    }

    if (
      symbol === ASSETS.NEO ||
      scriptHash.includes(N3Neon.CONST.NATIVE_CONTRACT_HASH.NeoToken)
    )
      return NEO
    if (
      symbol === ASSETS.GAS ||
      scriptHash.includes(N3Neon.CONST.NATIVE_CONTRACT_HASH.GasToken)
    )
      return GAS

    let endpoint = await getNode(net)
    if (!endpoint) {
      endpoint = await getRPCEndpoint(net)
    }

    const tokenNameResponse = await new n3Rpc.RPCClient(endpoint)
      .invokeFunction(scriptHash, 'symbol')
      .catch(e => {
        console.error({ e })
      })
    const foundSymbol = atob(tokenNameResponse.stack[0].value)

    return {
      symbol: foundSymbol,
    }
  }
  const NEO = {
    symbol: ASSETS.NEO,
    image: getImageBySymbol(ASSETS.NEO),
  }
  const GAS = {
    symbol: ASSETS.GAS,
    image: getImageBySymbol(ASSETS.GAS),
  }

  if (symbol === ASSETS.NEO || scriptHash.includes(NEO_ID)) return NEO
  if (symbol === ASSETS.GAS || scriptHash.includes(GAS_ID)) return GAS

  const tokens = await getDefaultTokens()
  // if token is found in our list return it
  const token = tokens.find(token => token.scriptHash.includes(scriptHash))
  if (token) return token

  // if token is unknown to application query neoscan
  const endpoint = await getRPCEndpoint(net)
  const tokenInfo = await api.nep5.getToken(endpoint, scriptHash).catch(e => {
    console.warn(e)
  })
  if (tokenInfo) return { symbol: tokenInfo.symbol }

  // if token is unknown to neoscan query dora
  const network = net === 'MainNet' ? 'mainnet' : 'testnet'
  const url = `https://dora.coz.io/api/v1/neo2/${network}/asset/${scriptHash}`
  const results = await axios.get(url).catch(e => {
    console.error(e)
    return {}
  })
  return { symbol: results.data.symbol }
}
