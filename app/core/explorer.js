// @flow
import { openExternal } from './electron'
import { EXPLORERS } from './constants'
import { isMainNetwork } from './networks'

export const getExplorerBaseURL = (
  networkId: string,
  explorer: ExplorerType
) => {
  let baseURL
  if (explorer === EXPLORERS.NEO_TRACKER) {
    if (isMainNetwork(networkId)) {
      baseURL = 'https://neotracker.io'
    } else {
      baseURL = 'https://testnet.neotracker.io'
    }
  } else if (explorer === EXPLORERS.NEO_SCAN) {
    if (isMainNetwork(networkId)) {
      baseURL = 'https://neoscan.io'
    } else {
      baseURL = 'https://neoscan-testnet.io'
    }
  } else if (isMainNetwork(networkId)) {
    baseURL = 'http://antcha.in'
  } else {
    baseURL = 'http://testnet.antcha.in'
  }
  return baseURL
}

export const getExplorerTxLink = (
  networkId: string,
  explorer: ExplorerType,
  txId: string
) => {
  const baseURL = getExplorerBaseURL(networkId, explorer)

  if (explorer === EXPLORERS.NEO_TRACKER) {
    return `${baseURL}/tx/${txId}`
  }
  if (explorer === EXPLORERS.NEO_SCAN) {
    return `${baseURL}/transaction/${txId}`
  }
  return `${baseURL}/tx/hash/${txId}`
}

export const getExplorerAddressLink = (
  networkId: string,
  explorer: ExplorerType,
  address: string
) => {
  const baseURL = getExplorerBaseURL(networkId, explorer)

  if (explorer === EXPLORERS.NEO_TRACKER) {
    return `${baseURL}/address/${address}`
  }
  if (explorer === EXPLORERS.NEO_SCAN) {
    return `${baseURL}/address/${address}/1`
  }
  // $FlowFixMe
  if (explorer === EXPLORERS.NEO_VERSE) {
    return `${baseURL}/addresses/${address}`
  }
  return `${baseURL}/address/info/${address}`
}

export const getExplorerAssetLink = (
  networkId: string,
  explorer: ExplorerType,
  assetId: string
) => {
  const baseURL = getExplorerBaseURL(networkId, explorer)

  if (explorer === EXPLORERS.NEO_TRACKER) {
    return `${baseURL}/asset/${assetId}`
  }
  if (explorer === EXPLORERS.NEO_SCAN) {
    return `${baseURL}/asset/${assetId}`
  }
  // $FlowFixMe
  if (explorer === EXPLORERS.NEO_VERSE) {
    return `${baseURL}/assets/${assetId}`
  }
  return `${baseURL}/asset/hash/${assetId}`
}

export const openExplorerTx = (
  networkId: string,
  explorer: ExplorerType,
  txId: string
) => openExternal(getExplorerTxLink(networkId, explorer, txId))

export const openExplorerAddress = (
  networkId: string,
  explorer: ExplorerType,
  address: string
) => openExternal(getExplorerAddressLink(networkId, explorer, address))

export const openExplorerAsset = (
  networkId: string,
  explorer: ExplorerType,
  assetId: string
) => openExternal(getExplorerAssetLink(networkId, explorer, assetId))
