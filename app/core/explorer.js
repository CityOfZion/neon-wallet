// @flow
import { openExternal } from './electron'
import { NETWORK, EXPLORERS } from '../core/constants'

export const getExplorerBaseURL = (net: NetworkType, explorer: ExplorerType) => {
  let baseURL
  if (explorer === EXPLORERS.NEO_TRACKER) {
    if (net === NETWORK.MAIN) {
      baseURL = 'https://neotracker.io'
    } else {
      baseURL = 'https://testnet.neotracker.io'
    }
  } else if (explorer === EXPLORERS.NEO_SCAN) {
    if (net === NETWORK.MAIN) {
      baseURL = 'https://neoscan.io'
    } else {
      baseURL = 'https://neoscan-testnet.io'
    }
  } else if (explorer === EXPLORERS.NEO_VERSE) {
    if (net === NETWORK.MAIN) {
      baseURL = 'http://explorer.neoverse.io'
    } else {
      baseURL = 'http://testnet.neoverse.io'
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

  if (explorer === EXPLORERS.NEO_TRACKER) {
    return `${baseURL}/tx/${txId}`
  } else if (explorer === EXPLORERS.NEO_SCAN) {
    return `${baseURL}/transaction/${txId}`
  } else if (explorer === EXPLORERS.NEO_VERSE) {
    return `${baseURL}/transactions/${txId}`
  } else {
    return `${baseURL}/tx/hash/${txId}`
  }
}

export const getExplorerAddressLink = (net: NetworkType, explorer: ExplorerType, address: string) => {
  const baseURL = getExplorerBaseURL(net, explorer)

  if (explorer === EXPLORERS.NEO_TRACKER) {
    return `${baseURL}/address/${address}`
  } else if (explorer === EXPLORERS.NEO_SCAN) {
    return `${baseURL}/address/${address}/1`
  } else if (explorer === EXPLORERS.NEO_VERSE) {
    return `${baseURL}/addresses/${address}`
  } else {
    return `${baseURL}/address/info/${address}`
  }
}

export const getExplorerAssetLink = (net: NetworkType, explorer: ExplorerType, assetId: string) => {
  const baseURL = getExplorerBaseURL(net, explorer)

  if (explorer === EXPLORERS.NEO_TRACKER) {
    return `${baseURL}/asset/${assetId}`
  } else if (explorer === EXPLORERS.NEO_SCAN) {
    return `${baseURL}/asset/${assetId}`
  } else if (explorer === EXPLORERS.NEO_VERSE) {
    return `${baseURL}/assets/${assetId}`
  } else {
    return `${baseURL}/asset/hash/${assetId}`
  }
}

export const openExplorerTx = (net: NetworkType, explorer: ExplorerType, txId: string) =>
  openExternal(getExplorerTxLink(net, explorer, txId))

export const openExplorerAddress = (net: NetworkType, explorer: ExplorerType, address: string) =>
  openExternal(getExplorerAddressLink(net, explorer, address))

export const openExplorerAsset = (net: NetworkType, explorer: ExplorerType, assetId: string) =>
  openExternal(getExplorerAssetLink(net, explorer, assetId))
