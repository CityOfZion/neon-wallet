// @flow
import { openExternal } from './electron'
import { NETWORK, EXPLORER } from '../core/constants'

export const getExplorerBaseURL = (net: NetworkType, explorer: ExplorerType) => {
  let baseURL
  if (explorer === EXPLORER.NEO_TRACKER) {
    if (net === NETWORK.MAIN) {
      baseURL = 'https://neotracker.io'
    } else {
      baseURL = 'https://testnet.neotracker.io'
    }
  } else if (explorer === EXPLORER.NEO_SCAN) {
    if (net === NETWORK.MAIN) {
      baseURL = 'https://neoscan.io'
    } else {
      baseURL = 'https://neoscan-testnet.io'
    }
  } else {
    if (net === NETWORK.MAIN) {
      baseURL = 'http://antcha.in'
    } else {
      baseURL = 'http://testnet.antcha.in'
    }
  }
  return baseURL
}

export const getExplorerTxLink = (net: NetworkType, explorer: ExplorerType, txId: string) => {
  const baseURL = getExplorerBaseURL(net, explorer)

  if (explorer === EXPLORER.NEO_TRACKER) {
    return `${baseURL}/tx/${txId}`
  } else if (explorer === EXPLORER.NEO_SCAN) {
    return `${baseURL}/transaction/${txId}`
  } else {
    return `${baseURL}/tx/hash/${txId}`
  }
}

export const getExplorerAddressLink = (net: NetworkType, explorer: ExplorerType, address: string) => {
  const baseURL = getExplorerBaseURL(net, explorer)

  if (explorer === EXPLORER.NEO_TRACKER) {
    return `${baseURL}/address/${address}`
  } else if (explorer === EXPLORER.NEO_SCAN) {
    return `${baseURL}/address/${address}/1`
  } else {
    return `${baseURL}/address/info/${address}`
  }
}

export const getExplorerAssetLink = (net: NetworkType, explorer: ExplorerType, assetId: string) => {
  const baseURL = getExplorerBaseURL(net, explorer)

  if (explorer === EXPLORER.NEO_TRACKER) {
    return `${baseURL}/asset/${assetId}`
  } else if (explorer === EXPLORER.NEO_SCAN) {
    return `${baseURL}/asset/${assetId}`
  } else {
    return `${baseURL}/asset/hash/${assetId}`
  }
}

export const openExplorerTx = (net: NetworkType, explorer: ExplorerType, txId: string) =>
  openExternal(getExplorerTxLink(net, explorer, txId))

export const openExplorerAddress = (net: NetworkType, explorer: ExplorerType, address: string) =>
  openExternal(getExplorerAddressLink(net, explorer, address))

export const openExplorerAsset = (net: NetworkType, explorer: ExplorerType, assetId: string) =>
  openExternal(getExplorerTxLink(net, explorer, assetId))
