// @flow
import { openExternal } from './electron'
import { NETWORK, EXPLORER } from '../core/constants'

// TODO: make this a user setting
export const getExplorerLink = (net: NetworkType, explorer: ExplorerType, txid: string) => {
  let base
  if (explorer === EXPLORER.NEO_TRACKER) {
    if (net === NETWORK.MAIN) {
      base = 'https://neotracker.io/tx/'
    } else {
      base = 'https://testnet.neotracker.io/tx/'
    }
  } else {
    if (net === NETWORK.MAIN) {
      base = 'http://antcha.in/tx/hash/'
    } else {
      base = 'http://testnet.antcha.in/tx/hash/'
    }
  }
  return `${base}${txid}`
}

export const openExplorer = (net: NetworkType, explorer: ExplorerType, txid: string) =>
  openExternal(getExplorerLink(net, explorer, txid))
