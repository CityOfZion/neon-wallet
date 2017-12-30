// @flow
/* eslint-disable camelcase */
import { ASSETS, ASSET_HASHES } from './constants'

export const parseTransactions = (neoscanTxs) => {
  return neoscanTxs
    .map(({ txid, asset_moved, amount_moved, balance, block_height }) => {
      let NEO = 0
      let GAS = 0
      let gas_sent = false
      let neo_sent = false
      let other_sent = false

      if (ASSET_HASHES[asset_moved] === ASSETS.NEO) {
        neo_sent = true
      } else if (ASSET_HASHES[asset_moved] === ASSETS.GAS) {
        gas_sent = true
      } else {
        // TODO handle additional assets for both APIs in the future
      }

      balance.forEach(({ asset, amount }) => {
        if (asset === ASSETS.NEO) NEO = amount
        if (asset === ASSETS.GAS) GAS = amount
      })

      return {
        txid,
        block_index: block_height,
        GAS,
        NEO,
        gas_sent,
        neo_sent
      }
    })
}
