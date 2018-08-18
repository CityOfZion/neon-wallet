// @flow
import { openExternal } from './electron'
import explorerConfig from './explorerConfig'
import { MAIN_NETWORK_ID, TEST_NETWORK_ID, COZ_TEST_NETWORK_ID, EXPLORERS } from './constants'
const { NEO_SCAN } = EXPLORERS

export const buildExplorerLink = (
  networkId: string,
  explorer: ExplorerType,
  structure: string,
  suffix: string
) => {
  if (explorerConfig.hasOwnProperty(explorer)) {
    const explorerInfo = explorerConfig[explorer]
    // hack because only neoscan supports coznet
    if (networkId === COZ_TEST_NETWORK_ID) return getExplorerBaseURL(networkId, explorer) + 'transaction/' + suffix
    return getExplorerBaseURL(networkId, explorer) + explorerInfo[structure] + suffix
  }

  throw new Error(`${explorer} is not a valid explorer type. Valid explorer types are: ${Object.keys(explorerConfig).join(', ')}`)
}

export const getExplorerBaseURL = (networkId: string, explorer: ExplorerType) => {
  if (explorerConfig.hasOwnProperty(explorer)) {
    const selectedExplorer = explorerConfig[explorer]
    switch (networkId) {
      case MAIN_NETWORK_ID:
        return selectedExplorer.mainNetwork
      case TEST_NETWORK_ID:
        return selectedExplorer.testNetwork
      case COZ_TEST_NETWORK_ID:
        return selectedExplorer.cozNetwork
      default:
        return selectedExplorer.mainNetwork
    }
  }
  return explorerConfig[NEO_SCAN]
}

export const getExplorerTxLink = (networkId: string, explorer: ExplorerType, txId: string) => buildExplorerLink(networkId, explorer, 'trxLinkStructure', txId)

export const getExplorerAddressLink = (networkId: string, explorer: ExplorerType, address: string) => buildExplorerLink(networkId, explorer, 'addressLinkStructure', address)

export const getExplorerAssetLink = (networkId: string, explorer: ExplorerType, assetId: string) => buildExplorerLink(networkId, explorer, 'assetLinkStructure', assetId)

export const openExplorerTx = (networkId: string, explorer: ExplorerType, txId: string) => openExternal(getExplorerTxLink(networkId, explorer, txId))

export const openExplorerAddress = (networkId: string, explorer: ExplorerType, address: string) => openExternal(getExplorerAddressLink(networkId, explorer, address))

export const openExplorerAsset = (networkId: string, explorer: ExplorerType, assetId: string) => openExternal(getExplorerAssetLink(networkId, explorer, assetId))
