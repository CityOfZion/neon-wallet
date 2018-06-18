// @flow
import { openExternal } from './electron'
import explorerConfig from './explorerConfig'
import { isMainNetwork } from './networks'

export const buildExplorerLink = (
  networkId: string,
  explorer: ExplorerType,
  structure: string,
  suffix: string
) => {
  if (explorerConfig.hasOwnProperty(explorer)) {
    const explorerInfo = explorerConfig[explorer]

    return getExplorerBaseURL(networkId, explorer) + explorerInfo[structure] + suffix
  }

  throw new Error(`${explorer} is not a valid explorer type. Valid explorer types are: ${Object.keys(explorerConfig).join(', ')}`)
}

export const getExplorerBaseURL = (networkId: string, explorer: ExplorerType) => {
  if (explorerConfig.hasOwnProperty(explorer)) {
    const selectedExplorer = explorerConfig[explorer]

    return isMainNetwork(networkId)
      ? selectedExplorer.mainNetwork
      : selectedExplorer.testNetwork
  }
}

export const getExplorerTxLink = (networkId: string, explorer: ExplorerType, txId: string) => buildExplorerLink(networkId, explorer, 'trxLinkStructure', txId)

export const getExplorerAddressLink = (networkId: string, explorer: ExplorerType, address: string) => buildExplorerLink(networkId, explorer, 'addressStructure', address)

export const getExplorerAssetLink = (networkId: string, explorer: ExplorerType, assetId: string) => buildExplorerLink(networkId, explorer, 'assetLinkStructure', assetId)

export const openExplorerTx = (networkId: string, explorer: ExplorerType, txId: string) => openExternal(getExplorerTxLink(networkId, explorer, txId))

export const openExplorerAddress = (networkId: string, explorer: ExplorerType, address: string) => openExternal(getExplorerAddressLink(networkId, explorer, address))

export const openExplorerAsset = (networkId: string, explorer: ExplorerType, assetId: string) => openExternal(getExplorerAssetLink(networkId, explorer, assetId))
